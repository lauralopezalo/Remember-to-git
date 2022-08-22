import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import { isTemplateNode } from "@vue/compiler-core";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },
      { path: "sign-up", component: SignUp },
    ],
  },
  { path: "/", component: Home },
  {
    path: "/newtask",
    component: NewTask,
  },
  {
    path: "/taskitem",
    component: TaskItem,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
