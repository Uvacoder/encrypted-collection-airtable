<template>
	<div class="container">
		<div class="product-list">
			<app-product v-for="(product, index) in products" :key="index" :product="product"></app-product>
		</div>
		<div class="filter-container">
			<div class="product-filters">
				<div class="headers" @click="tagsHidden = !tagsHidden">
					<h3>Tags</h3>
					<i 
						v-show="isSmallScreen" 
						class="gg-chevron-down-r"
					></i>
				</div>
				<b-taglist v-show="!tagsHidden">
					<b-button 
						rounded 
						size="is-small" 
						v-for="(tag, index) in firstNTags" 
						:key="index">
						{{ tag }}
					</b-button>
					<b-button 
						rounded 
						v-show="!isSmallScreen"
						size="is-small" 
						@click="toggleTags">
						...
					</b-button>
				</b-taglist>
			</div>
			<div class="product-filters">
				<div class="headers" @click="catsHidden = !catsHidden">
					<h3>Categories</h3>
					<i
						v-show="isSmallScreen" 
						class="gg-chevron-down-r"
					></i>
				</div>
				<b-taglist v-show="!catsHidden">
					<b-button 
						size="is-small" 
						v-for="(tag, index) in firstMCategories" 
						:key="index">
						{{ tag }}
					</b-button>
					<b-button 
						v-show="!isSmallScreen"
						size="is-small" 
						@click="toggleCategories">
						...
					</b-button>
				</b-taglist>
			</div>
		</div>
	</div>
</template>


<script>
import Product from "./Product";

export default {
	name: "ProductList",
	props: [""],
	components: {
		// appButton: Button,
		appProduct: Product,
	},
	data() {
		return {
			value: "",
			isSmallScreen: (window.innerWidth <= 580),
			tagsHidden: this.isSmallScreen,
			catsHidden: this.isSmallScreen,
			// filteredProducts: [],
			products: [
				{
					name: "Buttercup",
					desc: "A free, secure and open-source password manager.",
					url: "https://buttercup.pw/",
					tags: ["hello4", "hello5", "hello6"],
					img: "https://avatars3.githubusercontent.com/u/16577796?s=200&v=4",
				},
				{
					name: "Signal",
					desc: "Fast, simple, and secure messaging.",
					url: "https://signal.org",
					tags: ["hello1", "hello2", "hello3"],
					img: "https://avatars1.githubusercontent.com/u/702459?s=200&v=4",
				},
				{
					name: "Briefing",
					desc: "Secure direct group video chat",
					url: "https://brie.fi/ng",
					tags: ["hello7", "hello8", "hello9"],
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
				"tag5",
				"tag1",
				"tag2",
				"tag3",
				"tag4",
				"tag5",
			],
			cats: [
				"cat1",
				"cat2",
				"cat3",
				"cat4",
				"cat5",
				"cat1",
				"cat2",
				"cat3",
				"cat4",
				"cat5",
				"cat2",
				"cat3",
				"cat4",
				"cat5",
			],
			n: 5,
			m: 5
		};
	},
	methods: {
		filterWithQuery: function () {
		// let cat = $route.query.c, tag = $route.query.c;

		},
		toggleTags: function() {
			if (this.n === this.tags.length) {
				this.n = (window.innerWidth <= 580) ? 3 : 5;
			} else {
				this.n = this.tags.length;
			}
		},
		toggleCategories: function() {
			if (this.m === this.cats.length) {
				this.m = (window.innerWidth <= 580) ? 3 : 5;
			} else {
				this.m = this.cats.length;
			}
		},
		minDisplayedFilters: function() {
			if (window.innerWidth <= 580) {
				this.n = this.tags.length;
				this.m = this.cats.length;
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
			return this.cats.slice(0, this.m);
		},
		// tagsHidden: function() {
		// 	return !this.isSmallScreen;
		// },
		// catsHidden: function() {
		// 	return !this.isSmallScreen;
		// }
		// fi()
	// filteredProducts: function() {
		// let tag = this.$route.query.t;
		// if (tag.length > 0 || tag != null) {
		//   return this.products.filter(product => product.tags.includes(tag));
		// } else {
		//   return [...this.products];
		// }

	// }
	
	},
	watch: {
		// isSmallScreen: function() {
		// 	if (this.isSmallScreen) {
		// 		this.tagsHidden = this.isSmallScreen;
		// 		this.catsHidden = this.isSmallScreen;
		// 	}
		// }
	},
	beforeMount() {
		// this.tagsHidden = this.isSmallScreen;
		// this.catsHidden = this.isSmallScreen;
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
:root {
	--primary-red-color: #fa5252;
	--primary-green-color: #40c057;
	--overdue-red-color: #e63946;
	--gray-text-color: #748ca3;
}

html {
	--text-color: #171a1d;
	--background-color: #ffffff;
	--gray-border-color: #ced4da;
	--wrapper-border-color: #171a1d;
	--add-button-background-color: #2c3e50;
	--opt-button-background-color: #ffffff;
	--opt-toggle-background-color: #e9ecef;
}

html[data-theme='dark'] {
	--text-color: #ffffff;
	--background-color: #171a1d;
	--gray-border-color: #3e4a57;
	--wrapper-border-color: #3e4a57;
	--add-button-background-color: #3e4a57;
	--opt-button-background-color: #3e4a57;
	--opt-toggle-background-color: #3e4a57;
}

html,
body  {
	background-color: var(--background-color);
	color: var(--text-color);
}

* {
	outline: none;
	/* border: 0.1px solid red; */
}

.container {
	max-width: 100%;
	/* padding: 0 1rem; */
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: start;
}


/* .product-container > * {
	width: 100%;
} */

/* .product-container input {
	border: 3px solid rgb(219, 219, 219);
} */

.product-list {
	width: 65%;
	/* margin: 0 auto; */
	border-radius: 0.65rem;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2.5px solid var(--wrapper-border-color);
	border-bottom: 5px solid var(--wrapper-border-color);
}

.product-filters {
	width: 100%;
	border-radius: 0.65rem;
	padding: .5rem 1rem;
	/* border: 3px solid rgb(219, 219, 219);
	border-bottom: 5px solid rgb(219, 219, 219); */
	border: 2.5px solid var(--wrapper-border-color);
	border-bottom: 5px solid var(--wrapper-border-color);
	/* border-color: ; */
	margin-bottom: .5rem;
}

.product-filters .headers {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	padding: .25rem 0;
	cursor: pointer;
	color: var(--text-color);
}

.product-filters > :not(:first-child) {
	margin: 0.5rem 0;
}

.product-filters:last-of-type button {
	border-radius: .35rem;
}

.filter-container {
	width: 30%;
	display: flex;
	flex-direction: column;
	/* justify-content: space-between; */
	align-items: center;
}

.filter-container > * {
	width: 100%;
}

.gg-chevron-down-r {
	box-sizing: border-box;
	position: relative;
	display: inline-block;
	width: 22px;
	height: 22px;
	border: 2px solid;
	border-radius: 4px;
}

.gg-chevron-down-r::after {
	content: "";
	display: inline-block;
	box-sizing: border-box;
	position: absolute;
	width: 6px;
	height: 6px;
	border-bottom: 2px solid;
	border-right: 2px solid;
	transform: rotate(45deg);
	left: 6px;
	top: 5px
} 

@media only screen and (max-width: 840px) {
	.container {
		flex-direction: column-reverse;
	}

	.product-list,
	.filter-container {
		width: 100%;
	}

	/* .product-list, */
	.product-filters {
		border-width: 2px;
		border-bottom-width: 4px;
	}

}
</style>
