import Settings from "./components/settings/settings.vue";
import Search from "./components/search.vue";
import Map from "./components/map/map.vue";

export default [
	{
		path: "/settings",
		component: Settings,
	},
	{
		path: "/map",
		component: Map,
	},
	{
		path: "/search.html",
		component: Search,
	},
];
