<template>
    <div id='home'>
        <div class="search">
            <div>
                <i class="gg-search"></i>
            </div>
			<input 
				type="text" 
				ref="searchInput" 
				@focus="isSearching = true" 
				@blur="isSearching = false" 
				v-model="searchQuery"
				placeholder="Search Products..."
			/>
				<!-- @keyup="searchResults" -->
			<div>
				<p>;</p>
            </div>
		</div>
		<app-product-list :products="processedList" :tags="tags" :cats="cats"></app-product-list>
    </div>
</template>


<script>
// import { replace } from "lodash";
import ProductList from "@/components/ProductList.vue";

export default {
    name: 'Home',
    components: {
        appProductList: ProductList,
    },
    data() {
        return {
            // allProducts: [],
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
			isSearching: false,
			searchQuery: "",
			searchResults: []
			// processedList: []
        }
    },
    methods: {
		// returns start & end indices of all occurences of a query from a string
		stringSearch: function(str, query, caseInsensitive = true) {
			if (str.length === 0 || query.length === 0) {
				return [];
			}
			
			let indexes = [], i = 0, findIndex = -1,
				localStr = caseInsensitive ? str.toLowerCase() : str,
				localQuery = caseInsensitive ? query.toLowerCase() : query;

			while (str.toLowerCase().indexOf(query.toLowerCase(), i) !== -1) {
				findIndex = localStr.toLowerCase().indexOf(localQuery, i);
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
        filterWithTag: function(tag, list = this.allProducts) {
            return (tag.length > 0) ? 
				list
				.filter(product => product.tags.includes(tag))
				: [...list];
        },
        filterWithCategory: function(cat, list = this.allProducts) {
            return (cat.length > 0) ? 
				list
				.filter(product => product.categories.includes(cat))
				: [...list];
        },
        filterResults: function() {
			let cat = this.$route.query.c, 
                tag = this.$route.query.t;

			// if either filters are undefined
			if (tag === undefined || cat === undefined) 
			{
                if (tag === undefined && cat !== undefined) {
                    return this.filterWithCategory(cat);
                } else if (cat === undefined && tag !== undefined) {
                    return this.filterWithTag(tag);
                } else {
					return [...this.allProducts];
				}
			} else // if both filters are defined
			{
				return this.filterWithCategory(cat, this.filterWithTag(tag));
            }
		},
    },
    computed: {
		processedList: function() {
			if (this.searchQuery.trim().length > 0) { // if searching
				return this.searchResults.filter(product => product !== null);
			} else { // if just filtering
				return [...this.filterResults()];
			}
		}
    },
	watch: {
		searchQuery: function() {
			this.searchResults = this.filterResults().map(product => {
				let newProduct = {},
					name = product.name,
					desc = product.desc,
					query = this.searchQuery,
					nameMatch = this.stringSearch(name, query).length > 0, 
					descMatch = this.stringSearch(desc, query).length > 0;
					console.log(query);
				
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
		}
	},
	mounted: function() {
		let vm = this;
		window.addEventListener('keyup', (e) => {
			if (vm.$refs.searchInput) {
				if (e.keyCode === 59) // when semicolon (';')
				{ 
					vm.$refs.searchInput.focus();
				} else if (e.keyCode === 27) // when 'Esc' key is pressed
				{ 
					vm.$refs.searchInput.blur();
				}
			}
		});
    }
}
</script>


<style scoped>
@import url('https://css.gg/css?=|search');

* {
    outline: none;
}

i {
    color: var(--text-color);
}

.search {
	width: 65%;
    border: 2px solid var(--wrapper-border-color);
	border-bottom: 4px solid var(--wrapper-border-color);
	border-radius: 0.65rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
	margin-bottom: .5rem;
}

.search > * {
    height: 2.5rem;
}

.search > :first-child,
.search > :last-child {
    display: flex;
    justify-content: center;
    align-items: center;
}

.search > :first-child {
    min-width: 2.5rem;
    max-width: 2.5rem;
}

.search > :last-child {
    min-width: 1.5rem;
    max-width: 1.5rem;
    height: 1.5rem;
    margin: .5rem .5rem auto .5rem;
    border: 1px solid var(--wrapper-border-color);
    border-radius: .35rem;
}

.search > :last-child p {
    line-height: 1.5rem;
	font-size: .85rem;
	font-weight: bold;
}

.search input {
	border: none;
    width: 100%;
    padding: .5rem .25rem;
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
}

.highlight {
	color: var(--text-color);
	background-color: var(--primary-yellow-color);
} 

@media only screen and (max-width: 840px) {
	.search {
		width: 100%;
	}
}
</style>
