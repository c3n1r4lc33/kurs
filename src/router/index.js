import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/catalog', component: () => import('../views/Catalog.vue') },
  { path: '/product/:id', component: () => import('../views/Product.vue') },
  { path: '/cart', component: () => import('../views/Cart.vue') },
  { path: '/checkout', component: () => import('../views/Checkout.vue') },
  { path: '/about', component: () => import('../views/About.vue') },
  { path: '/contacts', component: () => import('../views/Contacts.vue') },
  { path: '/delivery', component: () => import('../views/Delivery.vue') },
  { path: '/gallery', component: () => import('../views/Gallery.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;