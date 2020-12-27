import Vue from "vue";
import App from "./App.vue";
import has from "lodash/has";
import router from "@/scripts/router";
import instance from "@/scripts/axios";
import { store } from "@/scripts/store";

Vue.prototype.$has = has;
Vue.prototype.$http = instance;

Vue.config.productionTip = false;

const vm = new Vue({
	el: "#app",
	store,
	router,
	render: (h) => h(App),
});

vm.$mount("#app");
