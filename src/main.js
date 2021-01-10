import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import has from "lodash/has";
import router from "@/scripts/router";
import { store } from "@/scripts/store";

Vue.prototype.$has = has;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

const vm = new Vue({
	el: "#app",
	store,
	router,
	render: (h) => h(App),
});

vm.$mount("#app");
