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
  },
  {
    path: '/task',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'task',
        name: 'Task',
        component: () => import('../pages/task/TaskPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router