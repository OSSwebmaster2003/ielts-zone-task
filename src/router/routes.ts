import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DashboardLayout.vue'),
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('../pages/overview/OverviewPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router