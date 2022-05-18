import { createRouter, createWebHistory, RouteMeta, Router } from "vue-router";
import { Home } from "@/views/home/Home";

import About from "@/views/about/About";
import Issues from "@/views/issues/issues";
import Cyclegan from "@/views/cyclegan/cyclegan";

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
		path: "/issues",
		name: "issues",
		component: Issues,
	},
	{
		path: "/cyclegan",
		name: "cyclegan",
		component: Cyclegan,
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
