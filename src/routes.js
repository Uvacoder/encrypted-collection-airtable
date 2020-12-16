import Home from "./views/Home.vue";
import Submit from "./views/Submit.vue";
import Report from "./views/Report.vue";
import NotFound from "./views/NotFound.vue";
// import ProductList from "./components/ProductList.vue";

export const routes = [
	{ path: "/", alias: "/home", component: Home },
	{ path: "*", name: "404", component: NotFound },
	{ path: "/submit", component: Submit },
	{ path: "/report", component: Report },
];
