<template>
    <div id='home'>
        <div class="search">
			<div class="search-bar">
				<div @click="focusInput">
					<i class="gg-search"></i>
				</div>
				<input 
					type="text" 
					ref="searchInput" 
					v-model="searchQuery"
					:placeholder="placeholderText"
				/>
				<div 
					@click="searchQuery = ''"
					v-show="searchQuery.length > 0"
					title="Clear input"
				>
					<i class="gg-backspace"></i>
				</div>
			</div>
			
			<app-button
				class="clear-filters" 
				:iconButton="true"
				@clicked="clearFilters"
				:label="'Reset Filters & Search Everything'"
				:disabled="isThatAll"
			>
				<i class="gg-asterisk"></i>
			</app-button>
		</div>
		
		<app-product-list 
			:products="processedList" 
			:tags="tags" 
			:categories="categories"
		></app-product-list>
    </div>
</template>


<script>
import Button from "@/components/Button.vue";
import { tags, categories } from "@/scripts/filters";
import ProductList from "@/components/ProductList.vue";

export default {
    name: 'Home',
    components: {
        appButton: Button,
        appProductList: ProductList
    },
    data() {
        return {
            allProducts: [
				{
					categories: [ "All", "Health", "Communication" ],
					desc: "Free and secure video chats for therapists.",
					img: "https://dl.airtable.com/.attachments/092f92d1abe5756195ce1cce6798b517/105592a5/jour.png",
					name: "Jour for Therapists",
					tags: [ "all", "beta", "free"],
					url: "https://therapy.jour.com/"
				},
				{
					categories: [ "All", "Health", "Communication" ],
					desc: "Free and secure video chats for therapists.",
					img: "https://dl.airtable.com/.attachments/092f92d1abe5756195ce1cce6798b517/105592a5/jour.png",
					name: "Jour for Therapists",
					tags: [ "all", "open-source", "opt-in"],
					url: "https://therapy.jour.com/"
				}
			],
			tags: [],
			categories: [],
			searchQuery: "",
			searchResults: [],
			placeholderText: ""
        }
    },
    methods: {
		async fetchData() {
			await this.$http("getMain")
			.then((res) => {
				// console.log(res);
				return res.data;
			})
			.then((data) => {
				console.log(data);
				this.allProducts = [...data];
			})
			.catch((err) => console.log(err));
		},
		// returns start & end indices of all occurences of a query from a string
		stringSearch: function(str, query, caseInsensitive = true) {
			caseInsensitive = typeof caseInsensitive !== 'undefined' ? caseInsensitive : true;

			if (str.length === 0 || query.length === 0) {
				return [];
			}
			
			let indexes = [], i = 0, findIndex = -1,
				localStr = caseInsensitive ? str.toLowerCase() : str,
				localQuery = caseInsensitive ? query.toLowerCase() : query;

			while (localStr.indexOf(localQuery, i) !== -1) {
				findIndex = localStr.indexOf(localQuery, i);
				indexes.push([findIndex, findIndex + query.length]);
				i = findIndex + 1;
			}

			return indexes;
		},
		// highlights all occurences of a query in a string
		// wraps each occurence with <mark class='highlight'></mark>
		highlightQuery: function(str, query) {
			let highlight = ``,
				res = this.stringSearch(str, query);

			let i, j = 0;
			for (i = 0; i < res.length; i++) {
				highlight += str.substring(j,res[i][0]);
				highlight += `<mark class='highlight'>`;
				highlight += str.substring(res[i][0], res[i][1]);
				highlight += `</mark>`;
				j = res[i][1];
			}
			highlight += str.substring(j);
			
			return highlight;  
		},
		// searches through given list and adds highlighting markup (html) to queries
		searchWithHighlight: function(list = this.filterResults) {
			list = typeof list !== 'undefined' ? list : this.filterResults;
			
			return list.map(product => {
				let newProduct = {},
					name = product.name,
					desc = product.desc,
					query = this.searchQuery.trim(),
					nameMatch = this.stringSearch(name, query).length > 0, 
					descMatch = this.stringSearch(desc, query).length > 0;
				
				if (nameMatch || descMatch) {
					if (nameMatch && !descMatch) {
						newProduct = Object.assign({}, product, { 
							name: this.highlightQuery(name, query)
						});
					} else if (!nameMatch && descMatch) {
						newProduct = Object.assign({}, product, { 
							desc: this.highlightQuery(desc, query)
						});
					} else {
						newProduct = Object.assign({}, product, { 
							name: this.highlightQuery(name, query),
							desc: this.highlightQuery(desc, query)
						});
					}
				} else {
					newProduct = null;
				}

				return newProduct;
			});
		},
		// filters given list with a certain tag value
        filterWithTag: function(tag, list = this.allProducts) {
			list = typeof list !== 'undefined' ? list : this.allProducts;

            return (tag.length > 0) ? 
				list
				.filter(product => product.tags.indexOf(tag) !== -1)
				: [...list];
		},
		// filters given list with a certain category value
        filterWithCategory: function(cat, list = this.allProducts) {
			list = typeof list !== 'undefined' ? list : this.allProducts;

            return (cat.length > 0) ? 
				list
				.filter(product => product.categories.indexOf(cat) !== -1)
				: [...list];
		},
		// clears all filters to show all search results
		clearFilters: function() {
			if (this.$has(this.$route.query, 't') || this.$has(this.$route.query, 'c')) {
				let query = {};
				this.$router.replace({ query });
			}
		},
		// focuses search input
		focusInput: function() {
			this.$refs.searchInput.focus();
		}
    },
    computed: {
		// filtered results based on query parameters
        filterResults: function() {
			let cat = this.$route.query.c, 
                tag = this.$route.query.t;

			// if either filters are undefined
			if (tag === undefined || cat === undefined) 
			{
                if (tag === undefined && cat !== undefined) {
                    return this.filterWithCategory(cat);
                } else if (cat === undefined && tag !== undefined) {
                    return this.filterWithTag(tag.toLowerCase());
                } else {
					return [...this.allProducts];
				}
			} else // if both filters are defined
			{
				return this.filterWithCategory(cat, this.filterWithTag(tag.toLowerCase()));
            }
		},
		// list used to render results either filtered or searched
		processedList: function() {
			if (this.searchQuery.trim().length > 0) { // if searching
				return this.searchResults.filter(product => product !== null);
			} else { // if just filtering
				return [...this.filterResults];
			}
		},
		// Are the search results being displayed everything?
		isThatAll: function() {
			if (this.searchQuery.trim().length > 0 ) { // if searching
				let filtered = this.searchWithHighlight().filter(product => product !== null),
					allResults = this.searchWithHighlight(this.allProducts).filter(product => product !== null);
				
				return filtered.length === allResults.length;
			} else {
				return true;
			}
		},
    },
	watch: {
		// make search again when search query changes
		searchQuery: function() {
			this.searchResults = this.searchWithHighlight();
		},
		// make search again when filter values change
		filterResults: function() {
			this.searchResults = this.searchWithHighlight();
		}
	},
	beforeMount() {
		// fetch data
		// this.fetchData();

		this.tags = tags;
		this.categories = categories;
	},
	mounted: function() {
		this.placeholderText = (window.innerWidth > 480) ? 'Press ; key to enter search...' : 'Search products...';
		// attach keyboard shortcuts for input
		let vm = this;
		window.addEventListener('keyup', (e) => {
			if (vm.$refs.searchInput) {
				if (e.keyCode === 59) // when semicolon ( ; )
				{ 
					vm.focusInput();
				} else if (e.keyCode === 27) // when 'Esc' key is pressed
				{ 
					vm.$refs.searchInput.blur();
				}
			}
		});

		window.addEventListener('resize', () => {
			this.placeholderText = (window.innerWidth > 480) ? 'Press ; key to enter search...' : 'Search products...';
		});
    }
}
</script>


<style scoped>
* {
    outline: none;
}

.search {
	width: 62.5%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

.search-bar {
	width: calc(100% - 3.5rem);
	height: 3rem;
    border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
	border-radius: 0.65rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.search-bar > * {
    height: 2.5rem;
}

.search-bar > :first-child,
.search-bar > :last-child {
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-bar > :first-child {
    min-width: 2.5rem;
    max-width: 2.5rem;
	cursor: pointer;
}

.search-bar > :last-child {
	min-width: 2.5rem;
    max-width: 2.5rem;
	cursor: pointer;
}

.search-bar > :last-child i {
	margin: 0;
	margin-left: .1rem;
	transform: scale(1);
}

.search-bar input {
	border: none;
	font-size: 1rem;
    width: 100%;
    padding: .5rem .25rem;
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
}

.search .clear-filters {
	width: 3rem;
	height: 3rem;
	border-radius: 0.65rem;
	background-color: var(--filter-reset-bg-color);
	border-color:  var(--filter-reset-border-color);	
}

.search .clear-filters:disabled,
.search .clear-filters[disabled] {
    cursor: not-allowed;
	background-color: var(--background-color);
	border-color:  var(--disabled-filter-reset-border-color);	
}

.search .clear-filters:disabled i,
.search .clear-filters[disabled] i {
	color: var(--disabled-text-color);
}

@media only screen and (max-width: 840px) {
	.search {
		width: 100%;
	}
}
</style>
