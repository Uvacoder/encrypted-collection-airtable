<template>
	<div id="app">
		<app-header></app-header>
		<app-product-list></app-product-list>
	</div>
</template>

<script>
import Header from "./components/Header.vue";
import ProductList from "./components/ProductList.vue";

export default {
	name: "App",
	components: {
		appHeader: Header,
		appProductList: ProductList,
	},
	data() {
		return {
			locale: "es",
			num: 11,
			cat: "",
			tag: ""
		}
	},
	methods: {
		emitChange() {
			this.$emit('change', this.selected);
			console.log(this.tag);
		},
		logIt() {
			console.log('hello');
		}
	}
};
</script>

<style>
* {
	outline: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

#app {
	width: 100%;
	max-width: 1024px;
	margin: 0 auto;
	padding: 0 2rem;
}

.tags button {
	border: none;
	margin: 0 .5rem 0.5rem 0;
	border-radius: 5px;
	background-color: rgb(240, 240, 240);
}

.tags button:hover {
	background-color: rgb(220, 220, 220);
}
</style>
