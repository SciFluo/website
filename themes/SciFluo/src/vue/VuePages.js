import App from "./app.vue";
import { createApp } from "vue";
import routes from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";

const initialize = () => {
	const app = createApp(App);

	app.use(
		createRouter({
			history: createWebHistory(),
			routes,
		})
	);

	app.mount("#app");
};

export default () => {
	const mainElement = document.querySelector("main");
	if (
		mainElement &&
		mainElement.id === "app" &&
		mainElement.getAttribute("data-vue") !== null
	) {
		initialize();
	}
};
