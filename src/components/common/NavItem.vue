<script setup lang="ts">
import {
  LayoutGrid,
  CheckSquare,
  Users,
  MessageCircle,
  Settings,
} from "lucide-vue-next";

interface Props {
  icon: string;
  label: string;
  active?: boolean;
}

defineProps<Props>();

const getIcon = (name: string) => {
  const icons: Record<string, any> = {
    LayoutGrid,
    CheckSquare,
    Users,
    MessageCircle,
    Settings,
  };
  return icons[name] || LayoutGrid;
};
</script>

<template>
  <button
    :class="[
      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left',
      active
        ? 'bg-gray-100 text-primary font-semibold'
        : 'text-gray-600 hover:bg-gray-50',
    ]"
  >
    <component :is="getIcon(icon)" :size="20" />
    <span>{{ label }}</span>
  </button>
</template>
