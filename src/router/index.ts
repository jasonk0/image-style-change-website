import { createRouter, createWebHistory, RouteMeta, Router } from "vue-router";
import { About } from "@/views/about/About";
import { Home } from "@/views/home/Home";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/about",
		name: "about",
		component: About,
	},
	{
		path: "/:w+",
		name: "*",
		redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
// 全局导航守卫

export { router };
