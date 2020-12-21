import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import "buefy/dist/buefy.css";
import router from "@/router";
import { store } from "@/store";

Vue.use(Buefy);

Vue.config.productionTip = false;

const vm = new Vue({
	el: "#app",
	store,
	router,
	render: (h) => h(App),
});

vm.$mount("#app");
