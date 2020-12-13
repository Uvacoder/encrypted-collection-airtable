<template>
	<div class="container">
		<div class="product-container">
			<b-field grouped>
				<b-input placeholder="Search..." expanded></b-input>
				<p class="control">
					<button class="button is-primary">Search</button>
				</p>
			</b-field>
			<div class="product-list">
				<app-product v-for="(product, index) in products" :key="index" :product="product"></app-product>
			</div>			
		</div>
		<div class="filter-container">
			<div class="product-filters">
				<h3>Tags</h3>
				<b-taglist>
					<b-button 
						rounded 
						size="is-small" 
						v-for="(tag, index) in firstNTags" 
						:key="index">
						{{ tag }}
					</b-button>
					<b-button 
						rounded 
						size="is-small" 
						@click="toggleTags">
						...
					</b-button>
				</b-taglist>
			</div>
			<div class="product-filters">
				<h3>Categories</h3>
				<b-taglist>
					<b-button 
						size="is-small" 
						v-for="(tag, index) in firstMCategories" 
						:key="index">
						{{ tag }}
					</b-button>
					<b-button 
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
			// filteredProducts: [],
			products: [
				{
					name: "Signal",
					desc: "Fast, simple, and secure messaging.",
					url: "https://signal.org",
					tags: ["hello1", "hello2", "hello3"],
					img: "https://avatars1.githubusercontent.com/u/702459?s=200&v=4",
				},
				{
					name: "Buttercup",
					desc: "A free, secure and open-source password manager.",
					url: "https://buttercup.pw/",
					tags: ["hello4", "hello5", "hello6"],
					img: "https://avatars3.githubusercontent.com/u/16577796?s=200&v=4",
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
				this.n = 5;
			} else {
				this.n = this.tags.length;
			}
		},
		toggleCategories: function() {
			if (this.m === this.cats.length) {
				this.m = 5;
			} else {
				this.m = this.cats.length;
			}
		},
	},
	computed: {
		firstNTags: function() {
			return this.tags.slice(0, this.n);
		},
		firstMCategories: function() {
			return this.cats.slice(0, this.m);
		}
		// fi()
	// filteredProducts: function() {
		// let tag = this.$route.query.t;
		// if (tag.length > 0 || tag != null) {
		//   return this.products.filter(product => product.tags.includes(tag));
		// } else {
		//   return [...this.products];
		// }

	// }
	
	}
};
</script>


<style scoped>
* {
	outline: none;
	/* border: 0.1px solid red; */
}

.container {
	max-width: 100%;
	padding: 0 1rem;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: start;
}

.product-container {
	width: 65%;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: space-between; */
}

.product-container > * {
	width: 100%;
}

.product-container input {
	border: 3px solid rgb(219, 219, 219);
}

.product-list {
	width: 100%;
	/* margin: 0 auto; */
	border-radius: 0.5rem;
	padding: 0 1rem;
	border: 3px solid rgb(219, 219, 219);
	/* box-shadow: 2px 2px 5px rgba(0, 0, 0, .15); */
}

.product-filters {
	width: 100%;
	border-radius: 0.5rem;
	padding: 1rem;
	border: 3px solid rgb(219, 219, 219);
	/* box-shadow: 2px 2px 5px rgba(0, 0, 0, .15); */
	margin-bottom: .5rem;
}

.product-filters h3 {
	display: block;
	font-weight: bold;
	margin-bottom: .5rem;
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

/* @media only screen and (max-width: 512px) {

} */
</style>
