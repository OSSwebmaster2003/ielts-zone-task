import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
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
        path: '',
        name: 'Task',
        component: () => import('../pages/task/TaskPage.vue')
      }
    ]
  },
  {
    path: '/tasks/:id',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'TaskDetail',
        component: () => import('../pages/task-details/TaskDetailPage.vue')
      }
    ]
  },
  {
    path: '/mentors',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Mentors',
        component: () => import('../pages/mentors/MentorsPage.vue')
      }
    ]
  },
  {
    path: '/message',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Message',
        component: () => import('../pages/task/TaskPage.vue') // Placeholder
      }
    ]
  },
  {
    path: '/settings',
    component: () => import('../layouts/DefaultLayoutWithoutSearchHeader.vue'),
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('../pages/settings/SettingsPage.vue') 
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router