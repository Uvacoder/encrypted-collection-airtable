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
					<i class="gg-close-o"></i>
				</div>
			</div>
			
					<!-- v-show="!isThatAll" -->
			<b-button
				class="clear-filters" 
				@click="clearFilters"
				title="Reset all filters"
				:disabled="isThatAll"
			>
				<i class="gg-tag"></i>
			</b-button>
		</div>
		
		<app-product-list 
			:products="processedList" 
			:tags="tags" 
			:cats="cats"
		></app-product-list>
    </div>
</template>


<script>
import ProductList from "@/components/ProductList.vue";

export default {
    name: 'Home',
    components: {
        appProductList: ProductList,
    },
    data() {
        return {
            allProducts: [
				{
					name: "Buttercup",
					desc: "A free, secure and open-source password manager.",
					url: "https://buttercup.pw/",
					tags: ["tag1", "tag9", "tag3", "tag1", "tag9", "tag1", "tag9", "tag1", "tag9"],
					categories: ["cat1", "cat2", "cat3"],
					img: "https://avatars3.githubusercontent.com/u/16577796?s=200&v=4",
				},
				{
					name: "Signal",
					desc: "Fast, simple, and secure messaging.",
					url: "https://signal.org",
					tags: ["open-source", "cross-platform", "free"],
					categories: ["Communication"],
					img: "https://avatars1.githubusercontent.com/u/702459?s=200&v=4",
				},
				{
					name: "Briefing",
					desc: "Secure direct group video chat",
					url: "https://brie.fi/ng",
					tags: ["tag7", "tag8", "tag9","tag7", "tag8","tag7", "tag8","tag7", "tag8"],
					categories: ["cat7", "cat8", "cat1"],
					img: "https://brie.fi/apple-touch-icon.png",
				},
			],
			tags: [
				"tag1",
				"tag2",
				"tag3",
				"tag4",
				"tag5",
				"tag1",
				"tag2",
				"tag3",
				"tag4",
				"tag5",
				"tag4",
				"tag6",
				"tag1",
				"tag7",
				"tag8",
				"tag9",
				"tag10",
			],
			cats: [
				"cat1",
				"cat2",
				"cat3",
				"cat4",
				"cat5",
				"cat1",
				"cat2",
				"cat7",
				"cat4",
				"cat6",
				"cat8",
				"cat3",
				"cat9",
				"cat10",
			],
			searchQuery: "",
			searchResults: [],
			placeholderText: ""
        }
    },
    methods: {
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
			let query = {};
			this.$router.replace({ query });
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
                    return this.filterWithCategory(cat.toLowerCase());
                } else if (cat === undefined && tag !== undefined) {
                    return this.filterWithTag(tag.toLowerCase());
                } else {
					return [...this.allProducts];
				}
			} else // if both filters are defined
			{
				return this.filterWithCategory(cat.toLowerCase(), this.filterWithTag(tag.toLowerCase()));
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
@import url('https://css.gg/css?=|search|close-o|tag');

* {
    outline: none;
}

i {
    color: var(--text-color);
	margin-left: 0;
}

.search {
	width: 65%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: .5rem;
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
}

.search-bar input {
	border: none;
    width: 100%;
    padding: .5rem .25rem;
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
}

.clear-filters {
	border: 2px solid;
	border-bottom: 4px solid;
	border-radius: 0.65rem;
	color: var(--text-color);
	background-color: var(--filter-reset-bg-color);
	border-color:  var(--filter-reset-border-color);	
	width: 3rem;
	height: 3rem;
}

.clear-filters i {
	transform: scale(.9) rotate(180deg);
	margin-left: .25rem;
}

/* Override Annoying Buefy Defaults */
.clear-filters:focus, .clear-filters.is-focused,
.clear-filters:active, .clear-filters.is-active {
	border-color: var(--filter-reset-border-color) !important;
}

@media only screen and (max-width: 840px) {
	.search {
		width: 100%;
	}
}
</style>
