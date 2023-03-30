import type { RouteRecordRaw  } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/components/Login.vue'),
    name: 'login'
  },
  {
    path: '/',
    component: () => import('@/components/Main.vue'),
    name: 'main',
    beforeEnter(to, from, next) {
      const token = window.localStorage.getItem('token');
      if(token === null) next({ name: 'login', replace: true });
      else next();
    }
  }
];

export default routes;
