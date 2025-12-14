import  { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import PostPage from '@/pages/PostPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import PostPageById from '@/pages/PostPageById.vue'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/posts",
    component: PostPage
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/posts/:id",
    component: PostPageById,
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
