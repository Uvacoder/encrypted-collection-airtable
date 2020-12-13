import ProductList from "./components/ProductList.vue";
import Header from "./components/Header.vue";

export const routes = [
	// { path: "/", component: Home },
	{ path: "/about", component: Header },
	{ path: "/ProductList", component: ProductList, name: "ProductList" },
	{ path: "/user/:id", component: Header, props: true },
];
