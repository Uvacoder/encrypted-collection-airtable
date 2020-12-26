<template>
	<div id="ProductList">
		<div class="product-list">
			<app-product 
				v-for="(product, index) in products" 
				:key="index" 
				:product="product"
			></app-product>

			<!-- loading div here possibly -->

			<div v-show="(products.length === 0)" class="no-results">
				<app-list-icon></app-list-icon>
				<h3>No results found.</h3>
			</div>
		</div>
		<div class="filter-list">
			<div class="product-filters">
				<div class="headers">
					<h4>Tags</h4>
					<app-button-tag
						class="current"
						:closable="true"
						:value="currTagValue"
						v-show="currTagExists"
						:closingTaskTitle="'Reset Tag'"
						@close-tag="resetFilter(0)"
					></app-button-tag>
					<i 
						class="gg-chevron-down-o"
						@click="tagsHidden = !tagsHidden"
					></i>
				</div>
				<div class="tag-list" v-show="!tagsHidden">
					<app-button-tag
						v-for="(tag, index) in firstNTags"
						:key="index"
						:value="tag"
						@clicked="filterWith(0, tag)"
					></app-button-tag>
					
					<app-button-tag
						:value="'...'"
						@clicked="toggleMoreTags"
					></app-button-tag>
				</div>
			</div>
			<div class="product-filters">
				<div class="headers">
					<h4>Category</h4>
					<app-button-tag
						class="current"
						:closable="true"
						:value="currCategoryValue"
						v-show="currCategoryExists"
						:closingTaskTitle="'Reset Category'"
						@close-tag="resetFilter(1)"
					></app-button-tag>
					<i 
						class="gg-chevron-down-o"
						@click="catsHidden = !catsHidden"
					></i>
				</div>

				<div class="tag-list" v-show="!catsHidden">
					<app-button-tag
						v-for="(cat, index) in firstMCategories"
						:key="index"
						:value="cat"
						@clicked="filterWith(1, cat)"
					></app-button-tag>
					
					<app-button-tag
						:value="'...'"
						@clicked="toggleMoreCategories"
					></app-button-tag>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import Product from "./Product.vue";
import ListIcon from "./ListIcon.vue";
import ButtonTag from "./ButtonTag.vue";

export default {
	name: "ProductList",
	props: ["products", "tags", "categories"],
	components: {
		appProduct: Product,
		appListIcon: ListIcon,
		appButtonTag: ButtonTag,
	},
	data() {
		return {
			isSmallScreen: (window.innerWidth <= 580),
			tagsHidden: this.isSmallScreen,
			catsHidden: this.isSmallScreen,
			n: 5,
			m: 5
		};
	},
	methods: {
		// update queries when filters are clicked
		filterWith: function(type, q) { 
			if (type === 0 && this.$route.query.t !== q) { // if tag
				this.$router.push({ query: Object.assign({}, this.$route.query, { t : q}) });
			} else if (type === 1 && this.$route.query.c !== q) { // if category
				this.$router.push({ query: Object.assign({}, this.$route.query, { c : q}) });
			}
		},
		// remove/reset filter by type: tag or category
		resetFilter: function(type) {
			let query = Object.assign({}, this.$route.query);

			if (type === 0 && this.$has(query, 't')) { // if tag
				delete query.t;
				this.$router.replace({ query }); // needs to be here to avoid redundant navigation error
			} else if (type === 1 && this.$has(query, 'c')) { // if category
				delete query.c;
				this.$router.replace({ query }); // needs to be here to avoid redundant navigation error
			}			
		},
		// show/hide full tag list
		toggleMoreTags: function() {
			if (this.n === this.tags.length) {
				this.n = (window.innerWidth <= 580) ? 3 : 5;
			} else {
				this.n = this.tags.length;
			}
		},
		// show/hide full category list
		toggleMoreCategories: function() {
			if (this.m === this.categories.length) {
				this.m = (window.innerWidth <= 580) ? 3 : 5;
			} else {
				this.m = this.categories.length;
			}
		},
		// set minimum number of filters displayed; rest are hidden
		minDisplayedFilters: function() {
			if (window.innerWidth <= 580) {
				this.n = this.tags.length;
				this.m = this.categories.length;
			} else {
				this.n = 5;
				this.m = 5;
			}
		}
	},
	computed: {
		firstNTags: function() {
			return this.tags.slice(0, this.n);
		},
		firstMCategories: function() {
			return this.categories.slice(0, this.m);
		},
		currTagValue: function() {	
			return this.$route.query.t;
		},
		currCategoryValue: function() {
			return this.$route.query.c;
		}, 
		currTagExists: function() {
			return (typeof this.currTagValue !== "undefined");
		}, 
		currCategoryExists: function() {	
			return (typeof this.currCategoryValue !== "undefined");
		}
	},
	mounted() {
		this.minDisplayedFilters();
		this.tagsHidden = this.isSmallScreen;
		this.catsHidden = this.isSmallScreen;

		window.addEventListener('resize', () => {
			this.minDisplayedFilters();
			this.isSmallScreen = window.innerWidth <= 580;
			this.tagsHidden = this.isSmallScreen;
			this.catsHidden = this.isSmallScreen;
		});
	},
};
</script>


<style scoped>
* {
	outline: none;
}

#ProductList {
	width: 100%;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.product-list {
	width: 62.5%;
	border-radius: 0.65rem;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
}

.product-list > .no-results {
	width: 100%;
	padding: 3rem;
}

.product-list > .no-results img {
	/* width: 25%;
	height: auto;
	display: block;
	margin: 0 auto 1rem auto; */
}

.product-list > .no-results h3 {
	margin: 1rem auto;
	text-align: center;
}

.product-list > :nth-last-child(2) {
	border: none !important;
}

.filter-list {
	width: 35%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.product-filters {
	width: 100%;
	border-radius: 0.65rem;
	padding: .35rem .75rem;
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
	margin-bottom: .5rem;
}

.product-filters .headers {
	width: 100%;
	height: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: .25rem 0;
	color: var(--text-color);
}

.product-filters .headers .current {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0;
	border: none;
	margin-left: auto;
	padding: 0 .2rem 0 .5rem;
	color: var(--text-color);
	background-color: var(--current-tags-bg-color);
}

.product-filters .headers .current:hover {
	background-color: var(--current-tags-bg-hover-color);
}

.product-filters .headers > i {
	display: none;
	margin-left: .5rem;
	cursor: pointer;
}

.product-filters .tag-list {
	margin-top: 0.75rem;
}

.product-filters .tag-list > button {
	margin: 0 .25rem .5rem 0;
}

.product-filters:last-of-type button {
	border-radius: .35rem;
}

@media only screen and (max-width: 840px) {
	#ProductList {
		flex-direction: column-reverse;
	}

	.product-list,
	.filter-list {
		width: 100%;
	}

	.product-filters {
		border-width: 2px;
		border-bottom-width: 4px;
	}
}

@media only screen and (max-width: 580px) {
	.product-list {
		padding: 0 1rem;
	}

	.product-filters .headers i {
		display: inline-block;
	}

	.product-filters .tag-list :last-child {
		display: none;
	}
}
</style>
