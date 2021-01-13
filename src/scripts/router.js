import Vue from "vue";
import { store } from "./store";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Unfound from "@/views/404.vue";
import Excluded from "@/views/Excluded.vue";
import Watchlist from "@/views/Watchlist.vue";
import SubmitForm from "@/views/Submit/Form.vue";
import SubmitView from "@/views/Submit/View.vue";
import ReportForm from "@/views/Report/Form.vue";
import ReportView from "@/views/Report/View.vue";
import FormFailure from "@/views/FormStatus/FormFailure.vue";
import FormSuccess from "@/views/FormStatus/FormSuccess.vue";

Vue.use(VueRouter);

const routes = [
	{ path: "/", name: "Home", alias: "/all", component: Home },
	{ path: "/about", name: "About", component: About },
	{
		path: "/submit",
		name: "SubmitView",
		component: SubmitView,
		children: [
			{
				path: "",
				name: "SubmitForm",
				component: SubmitForm,
			},
			{
				path: "success",
				name: "Success",
				component: FormSuccess,
			},
			{
				path: "failure",
				name: "Failure",
				component: FormFailure,
			},
		],
	},
	{
		path: "/report",
		name: "ReportView",
		component: ReportView,
		children: [
			{
				path: "",
				name: "ReportForm",
				component: ReportForm,
			},
			{
				path: "success",
				name: "Success",
				component: FormSuccess,
			},
			{
				path: "failure",
				name: "Failure",
				component: FormFailure,
			},
		],
	},
	{ path: "/excluded", name: "Excluded", component: Excluded },
	{ path: "/watchlist", name: "Watchlist", component: Watchlist },
	{ path: "*", name: "404", component: Unfound },
];

const router = new VueRouter({
	routes: routes,
	mode: "history",
});

// Update header title to match current page/route
router.afterEach((to) => {
	if (to.name === "About") {
		store.commit("updateTitle", "AboutList");
	} else if (to.name === "Excluded") {
		store.commit("updateTitle", "ExcludedList");
	} else if (to.name === "Watchlist") {
		store.commit("updateTitle", "WatchList");
	} else {
		store.commit("updateTitle", "EncryptedList");
	}
});

export default router;
