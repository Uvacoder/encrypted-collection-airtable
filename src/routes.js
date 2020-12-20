import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Submit from "./views/Submit.vue";
import Report from "./views/Report.vue";
import Excluded from "./views/Excluded.vue";
import Watchlist from "./views/Watchlist.vue";
import Unfound from "./views/404.vue";

export const routes = [
	{ path: "/", alias: "/all", component: Home },
	{ path: "/about", component: About },
	{ path: "/submit", component: Submit },
	{ path: "/report", component: Report },
	{ path: "/excluded", component: Excluded },
	{ path: "/watchlist", component: Watchlist },
	{ path: "*", name: "404", component: Unfound },
];
