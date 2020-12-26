import Vue from "vue";
import App from "./App.vue";
import router from "@/scripts/router";
import { store } from "@/scripts/store";
import axios from "axios";
import has from "lodash/has";

Vue.prototype.$has = has;
Vue.prototype.$http = axios.create({
	method: "get",
	baseURL: "http://localhost:8888/api/",
	// baseURL: "https://encryptedlist.netlify.app/api/",
	headers: {
		"Content-type": "application/json",
	},
});

Vue.config.productionTip = false;

const vm = new Vue({
	el: "#app",
	store,
	router,
	render: (h) => h(App),
});

vm.$mount("#app");
