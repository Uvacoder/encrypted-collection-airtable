import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import "buefy/dist/buefy.css";
import { routes } from "./routes";
import VueRouter from "vue-router";

Vue.use(Buefy);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: routes,
	mode: "history", // or none for default "hash"
});

Vue.config.productionTip = false;

new Vue({
	el: "#app",
	router,
	render: (h) => h(App),
}).$mount("#app");
