import { createMemoryHistory, createWebHistory, createRouter } from "vue-router";

import Status from "@/views/StatusView.vue";
import Pilots from "@/views/PilotsView.vue";
import Events from "@/views/EventsView.vue";
import Config from "@/assets/info/general-config.json";

const DEFAULT_TITLE = Config.defaultTitle;
const routes = [
	{
		path: "/",
		redirect: "/status",
	},
	{
		path: "/status",
		name: "Mission Status",
		component: Status,
		props: true,
		meta: { title: `${DEFAULT_TITLE} MISSION STATUS` },
	},
	{
		path: "/pilots",
		name: "Pilots",
		component: Pilots,
		props: true,
		meta: { title: `${DEFAULT_TITLE} PILOT ROSTER` },
	},
	{
		path: "/events",
		name: "Events",
		component: Events,
		props: true,
		meta: { title: `${DEFAULT_TITLE} EVENTS LOG` },
	},
];

const router = createRouter({
	history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				el: to.hash,
				behavior: "smooth",
			};
		}
	},
});

router.beforeEach((to, from, next) => {
	// Use next tick to handle router history correctly
	// see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
	document.title = `${to.meta.title}`;
	next();
});

export default router;
