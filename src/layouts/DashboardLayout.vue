<script setup lang="ts">
import Sidebar from '@/components/common/Sidebar.vue'
import Header from '@/components/common/Header.vue'
import CalendarWidget from '@/components/pages/overview/CalendarWidget.vue'
import TaskToday from '@/components/pages/overview/TaskToday.vue'
</script>

<template>
  <div class="dashboard-layout min-h-screen bg-gray-50">
    <Sidebar />

    <main class="dashboard-layout__main">
      <Header />
      <div class="dashboard-layout__content">
        <router-view />
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
}

.dashboard-layout__sidebar-right {
  width: 410px;
  background: #F5F5F7;
  overflow-y: auto;
  height: 100vh;
  padding: 32px;
}

@media (max-width: 1024px) {
  .dashboard-layout__sidebar-right {
    display: none;
  }

  .dashboard-layout {
    grid-template-columns: auto 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-layout__sidebar-left {
    position: fixed;
    left: -280px;
    z-index: 100;
    transition: left 0.3s ease;
  }

  .dashboard-layout__sidebar-left.open {
    left: 0;
  }

  .dashboard-layout {
    grid-template-columns: 1fr;
  }
}
</style>
