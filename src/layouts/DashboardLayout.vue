<script setup lang="ts">
import { provide } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Header from '@/components/common/Header.vue'
import CalendarWidget from '@/components/pages/overview/CalendarWidget.vue'
import TaskToday from '@/components/pages/overview/TaskToday.vue'
import { useSidebar } from '@/composables/useSidebar'

const { isSidebarOpen, closeSidebar } = useSidebar()

// Provide sidebar state to child components
provide('sidebar', { isSidebarOpen, closeSidebar })
</script>

<template>
  <div class="dashboard-layout min-h-screen bg-gray-50">
    <!-- Overlay for mobile sidebar -->
    <div v-if="isSidebarOpen" class="dashboard-layout__overlay" @click="closeSidebar"></div>

    <Sidebar />

    <main class="dashboard-layout__main">
      <Header />
      <div class="dashboard-layout__content">
        <div class="dashboard-layout__content-wrapper">
          <div class="dashboard-layout__page-content">
            <router-view />
          </div>
          <aside class="dashboard-layout__sidebar-right-mobile">
            <div class="space-y-6">
              <CalendarWidget />
              <TaskToday />
            </div>
          </aside>
        </div>
      </div>
    </main>

    <aside class="dashboard-layout__sidebar-right">
      <div class="space-y-6">
        <CalendarWidget />
        <TaskToday />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0;
}

.dashboard-layout__sidebar-left {
  width: 280px;
  background: white;
  overflow-y: auto;
  height: 100vh;
}

.dashboard-layout__main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  height: 100vh;
}

.dashboard-layout__content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.dashboard-layout__content-wrapper {
  display: flex;
  gap: 32px;
  width: 100%;
}

.dashboard-layout__page-content {
  flex: 1;
  min-width: 0;
}

.dashboard-layout__sidebar-right-mobile {
  display: none;
  width: 360px;
  flex-shrink: 0;
  background: #F5F5F7;
  padding: 0;
  border-radius: 10px;
  height: fit-content;
}

.dashboard-layout__content::-webkit-scrollbar {
  width: 4px;
}

.dashboard-layout__content::-webkit-scrollbar-track {
  background: transparent;
}

.dashboard-layout__content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.dashboard-layout__content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}

.dashboard-layout__sidebar-right {
  width: 410px;
  background: #F5F5F7;
  overflow-y: auto;
  height: 100vh;
  padding: 32px;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.dashboard-layout__sidebar-right::-webkit-scrollbar {
  width: 4px;
}

.dashboard-layout__sidebar-right::-webkit-scrollbar-track {
  background: transparent;
}

.dashboard-layout__sidebar-right::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.dashboard-layout__sidebar-right::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}

@media (max-width: 1280px) {
  .dashboard-layout__sidebar-right {
    width: 360px;
  }
}

@media (max-width: 1024px) {
  .dashboard-layout__sidebar-right {
    display: none;
  }

  .dashboard-layout__sidebar-right-mobile {
    display: block;
    width: 100%;
  }

  .dashboard-layout__content-wrapper {
    flex-direction: column;
  }

  .dashboard-layout {
    grid-template-columns: auto 1fr;
  }
}

.dashboard-layout__overlay {
  display: none;
}

@media (max-width: 767px) {
  .dashboard-layout__overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    transition: opacity 0.3s ease;
  }

  .dashboard-layout {
    grid-template-columns: 1fr;
  }

  .dashboard-layout__content {
    padding: 24px;
  }
}
</style>
