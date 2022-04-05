import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/HomePage.vue";
import Login from "../views/LoginPage.vue";
import Register from "../views/RegisterPage.vue";
import { getAuth } from "@firebase/auth";

const AboutPage = () => import("../views/AboutPage.vue")
const DashboardPage = () => import("../views/DashboardPage.vue")

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/about",
        name: "about",
        // component: About,
        component: AboutPage

    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardPage,
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = getAuth().currentUser;
    // if route requires auth meta key and is not authenticated => go back to login
    if (requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next()
    }
})

export default router;