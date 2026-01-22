<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { X } from "lucide-vue-next";
import OverviewIcon from "./icons/OverviewIcon.vue";
import TaskIcon from "./icons/TaskIcon.vue";
import MentorsIcon from "./icons/MentorsIcon.vue";
import MessageIcon from "./icons/MessageIcon.vue";
import SettingsIcon from "./icons/SettingsIcon.vue";
import HelpCenter from "./HelpCenter.vue";
import { useSidebar } from "@/composables/useSidebar";

const route = useRoute();

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

const navItems = ref<NavItem[]>([
  { icon: OverviewIcon, label: "Overview", path: "/overview" },
  { icon: TaskIcon, label: "Task", path: "/task" },
  { icon: MentorsIcon, label: "Mentors", path: "/mentors" },
  { icon: MessageIcon, label: "Message", path: "/message" },
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
]);

const { isSidebarOpen, closeSidebar } = useSidebar();

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + "/");
};

const handleNavClick = () => {
  if (window.innerWidth <= 767) {
    closeSidebar();
  }
};
</script>

<template>
  <aside :class="[
    'sidebar w-64 bg-white p-6 md:p-8 flex flex-col justify-between',
    isSidebarOpen ? 'sidebar--open' : '',
  ]">
    <button @click="closeSidebar"
      class="sidebar__close-btn md:hidden absolute top-7 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-[#F5F5F7] hover:bg-gray-50 transition-all cursor-pointer z-10">
      <X :size="20" class="text-[#8E92BC]" />
    </button>

    <div class="flex flex-col">
      <img src="@/assets/logo.svg" alt="Logo" class="w-auto h-10" />
      <nav class="space-y-4 mt-15">
        <router-link v-for="item in navItems" :key="item.label" :to="item.path" @click="handleNavClick" :class="[
          'w-full flex items-center gap-3 px-5 py-2.5 rounded-[10px] transition-all text-left text-sm cursor-pointer',
          isActive(item.path)
            ? 'bg-gray-100 text-black font-semibold'
            : 'text-gray-600 hover:bg-gray-50',
        ]">
          <component :is="item.icon" />
          <span class="text-sm leading-[150%] tracking-[-2%]">
            {{ item.label }}
          </span>
        </router-link>
      </nav>
    </div>

    <HelpCenter />
  </aside>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  position: relative;
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

@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    left: -256px;
    top: 0;
    z-index: 100;
    transition: left 0.3s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .sidebar.sidebar--open {
    left: 0;
  }
}
</style>
