<template>
	<div class="container">
		<div class="product-list">
			<app-product 
				v-for="(product, index) in products" 
				:key="index" 
				:product="product"
				:filterable="true"
				:class="{ 'last-product' : (index === products.length - 1)}"
			></app-product>
			<div v-show="(products.length === 0)" class="no-results">
				<img src="../assets/no-results.svg" alt="No results.">
				<h3>No results found.</h3>
			</div>
		</div>
		<div class="filter-container">
			<div class="product-filters">
				<div class="headers" @click="toggleViewFilters(0, $event)">
					<h3>Tags</h3>
					<button class="current no-toggle" v-show="currTagExists">
						<span class="no-toggle">{{ currTagValue }}</span>
						<i class="gg-close no-toggle" title="Reset Tags"></i>
					</button>
					<i class="gg-chevron-down-o"></i>
				</div>
				<b-taglist v-show="!tagsHidden">
					<b-button 
						rounded 
						size="is-small" 
						v-for="(tag, index) in firstNTags" 
						:key="index"
						@click="filterWith(0, tag)"
						>
						{{ tag }}
					</b-button>
					<b-button 
						rounded 
						v-show="!isSmallScreen"
						size="is-small" 
						@click="toggleMoreTags">
						...
					</b-button>
				</b-taglist>
			</div>
			<div class="product-filters">
				<div class="headers" @click="toggleViewFilters(1, $event)">
					<h3>Category</h3>
					<button class="current no-toggle" v-show="currCategoryExists">
						<span class="no-toggle">{{ currCategoryValue }}</span>
						<i class="gg-close no-toggle" title="Reset Tags"></i>
					</button>
					<i class="gg-chevron-down-o"></i>
				</div>
				<b-taglist v-show="!catsHidden">
					<b-button 
						size="is-small" 
						v-for="(cat, index) in firstMCategories" 
						:key="index"
						@click="filterWith(1, cat)"	
					>
						{{ cat }}
					</b-button>
					<b-button 
						v-show="!isSmallScreen"
						size="is-small" 
						@click="toggleMoreCategories">
						...
					</b-button>
				</b-taglist>
			</div>
		</div>
	</div>
</template>


<script>
// import has from 'lodash/has';
import Product from "./Product";

export default {
	name: "ProductList",
	props: ["products", "tags", "categories"],
	components: {
		appProduct: Product,
	},
	data() {
		return {
			// currCat: true,
			// currTag: true,
			isSmallScreen: (window.innerWidth <= 580),
			tagsHidden: this.isSmallScreen,
			catsHidden: this.isSmallScreen,
			n: 5,
			m: 5
		};
	},
	methods: {
		// expand/collapse filters + reset filters on click
		toggleViewFilters: function(type, e) {
			if (!e.target.classList.contains("no-toggle")) {
				if (type === 0) { // if tag
					this.tagsHidden = !this.tagsHidden;
				} else if (type === 1) { // if category
					this.catsHidden = !this.catsHidden
				}
			} else {
				if (e.target.classList.contains("gg-close")) {
					this.resetFilter(type);
				}
			}
		},
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
	watch: {
		currTagValue: function(value) {	
			console.log(value);
		},
		currCategoryValue: function(value) {
			console.log(value);
		},
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


<style>
/* // <style scoped> */
@import url('https://css.gg/css?=|close|chevron-down-o');

* {
	outline: none;
}

.container {
	max-width: 100%;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.product-list {
	width: 65%;
	border-radius: 0.65rem;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
}

.product-list .no-results {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3rem;
}

.product-list .no-results img {
	width: 25%;
	margin-bottom: 1rem;
}

.product-filters {
	width: 100%;
	border-radius: 0.65rem;
	padding: .5rem 1rem;
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
	font-weight: bold;
	padding: .25rem 0;
	cursor: pointer;
	color: var(--text-color);
}

.product-filters .headers i {
	transform: scale(1);
}

.product-filters .headers .current {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0;
	/* border-radius: 1rem; */
	border: none;
	margin-left: auto;
	margin-right: .5rem;
	font-size: .75rem;
	padding: 0 .2rem 0 .5rem;
	color: var(--text-color);
	background-color: var(--tags-bg-color);
}

.product-filters .headers .current i {
	margin-left: .25rem;
	margin-right: 0;
	cursor: pointer;
	transform: scale(.75);
}

.product-filters > :not(:first-child) {
	margin: 0.5rem 0;
}

.product-filters:first-of-type button {
	border-radius: 1rem;
}

.product-filters:last-of-type button {
	border-radius: .35rem;
}

.filter-container {
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.filter-container > * {
	width: 100%;
}

.gg-close-o,
.gg-chevron-down-o {
	color: var(--text-color);
}

.gg-close-o {
	margin-left: auto;
	margin-right: 0;
	transform: scale(.65);
}

@media only screen and (max-width: 840px) {
	.container {
		flex-direction: column-reverse;
	}

	.product-list,
	.filter-container {
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

	.gg-close-o {
		/* margin-right: 0.5rem; */
	}
}
</style>
