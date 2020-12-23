import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import "buefy/dist/buefy.css";
import router from "@/router";
import { store } from "@/store";
import axios from "axios";

Vue.use(Buefy);

Vue.prototype.$http = axios.create({
	method: "get",
	// baseURL: "http://localhost:8888/api/",
	baseURL: "https://encryptedlist.netlify.app/api/",
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
