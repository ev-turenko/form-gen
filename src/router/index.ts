import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import DemoForm1 from '../views/DemoForm1.vue';
import DemoForm2 from '../views/DemoForm2.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/demo1', name: 'DemoForm1', component: DemoForm1 },
  { path: '/demo2', name: 'DemoForm2', component: DemoForm2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;