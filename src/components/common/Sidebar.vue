<template>
  <aside class="sidebar w-64 bg-white p-8.5 flex flex-col justify-between">
    <!-- Logo -->
    <div class="flex flex-col">
      <img src="@/assets/logo.svg" alt="Logo" class="w-auto h-10" />
      <nav class="space-y-6 mt-15">
        <button v-for="item in navItems" :key="item.label" :class="[
          'w-full flex items-center gap-3 px-5 py-2.5 rounded-[10px] transition-all text-left text-sm cursor-pointer',
          item.active
            ? 'bg-gray-100 text-black font-semibold'
            : 'text-gray-600 hover:bg-gray-50'
        ]">
          <component :is="item.icon" />
          <span class="text-sm leading-[150%] tracking-[-2%]">
            {{ item.label }}
          </span>
        </button>
      </nav>
    </div>

    <HelpCenter />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OverviewIcon from './icons/OverviewIcon.vue'
import TaskIcon from './icons/TaskIcon.vue'
import MentorsIcon from './icons/MentorsIcon.vue'
import MessageIcon from './icons/MessageIcon.vue'
import SettingsIcon from './icons/SettingsIcon.vue'
import HelpCenter from './HelpCenter.vue'

const navItems = ref([
  { icon: OverviewIcon, label: 'Overview', active: true },
  { icon: TaskIcon, label: 'Task', active: false },
  { icon: MentorsIcon, label: 'Mentors', active: false },
  { icon: MessageIcon, label: 'Message', active: false },
  { icon: SettingsIcon, label: 'Settings', active: false },
])
</script>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}
</style>
