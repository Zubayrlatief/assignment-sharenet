import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ContactView from '../views/ContactView.vue';
import BookingsView from '../views/BookingsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/contact', component: ContactView },
  { path: '/workshops', component: BookingsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
