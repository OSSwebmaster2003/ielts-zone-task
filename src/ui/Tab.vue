<template>
  <div class="w-full">
    <!-- Tabs Navigation -->
    <div ref="tabsListRef" :class="[
      'flex border-b border-gray-200 overflow-x-auto scrollbar-hide mx-5',
      variant === 'default' && 'bg-white',
      variant === 'pills' && 'bg-gray-100 p-1 rounded-lg gap-1',
      variant === 'underline' && 'bg-transparent border-b-2 border-gray-200',
      scrollable && 'scroll-smooth snap-x snap-mandatory',
    ]">
      <button v-for="tab in tabs" :key="tab.id" :class="getTabClasses(tab)" :disabled="tab.disabled"
        @click="selectTab(tab)" type="button">
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab" :class="[
      'mt-8',
      variant === 'default' && 'bg-white',
      variant === 'pills' && 'bg-white rounded-lg shadow-sm',
      variant === 'underline' && 'bg-transparent',
    ]">
      <slot :tab="activeTab" :content="activeTab.content">
        <component v-if="typeof activeTab.content !== 'string'" :is="activeTab.content" v-bind="activeTab.props" />
        <div v-else v-html="activeTab.content"></div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type { Component, FunctionalComponent } from "vue";

export interface TabItem {
  id: string | number;
  label: string;
  content?: FunctionalComponent | Component;
  disabled?: boolean;
  props?: any;
}

export interface TabsProps {
  tabs: TabItem[];
  modelValue?: string | number;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  scrollable?: boolean;
}

export interface TabsEmits {
  (e: "update:modelValue", value: string | number): void;
  (e: "tab-change", tab: TabItem): void;
}

// Props with defaults
const props = withDefaults(defineProps<TabsProps>(), {
  variant: "default",
  size: "md",
  scrollable: true,
});

// Emits
const emit = defineEmits<TabsEmits>();

// Refs
const tabsListRef = ref<HTMLElement>();

// Computed
const activeTab = computed(() => {
  return props.tabs.find((tab) => tab.id === props.modelValue) || props.tabs[0];
});

// Methods
const getTabClasses = (tab: TabItem) => {
  const isActive = tab.id === activeTab.value?.id;
  const variant = props.variant;
  const size = props.size;

  // Base classes
  const baseClasses = "flex-shrink-0 px-4 py-2 text-[14px] font-medium transition-all duration-200 cursor-pointer select-none snap-start";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-[12px]",
    md: "px-4 py-2 text-[14px]",
    lg: "px-6 py-3 text-[16px]",
  };

  // Variant classes
  const variantClasses = {
    default: {
      inactive: "text-[#9C9CA4] hover:text-[#141522] hover:bg-gray-50 border-b-2 border-transparent",
      active: "text-[#141522] border-[#546FFF] bg-orange-2 rounded-t-md",
    },
    pills: {
      inactive: "text-[#9C9CA4] hover:text-[#141522] hover:bg-white rounded-md",
      active: "text-[#141522] bg-white rounded-md shadow-sm",
    },
    underline: {
      inactive: "text-[#9C9CA4] hover:text-[#141522] border-b-2 border-transparent",
      active: "text-[#141522] border-b-2 border-[#546FFF]",
    },
  };

  // Disabled classes
  const disabledClasses = "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-[#9C9CA4]";

  return [
    baseClasses,
    sizeClasses[size],
    isActive
      ? variantClasses[variant].active
      : variantClasses[variant].inactive,
    tab.disabled && disabledClasses,
  ];
};

const selectTab = (tab: TabItem) => {
  if (tab.disabled) return;

  emit("update:modelValue", tab.id);
  emit("tab-change", tab);

  // Scroll to active tab on mobile
  if (props.scrollable) {
    nextTick(() => {
      scrollToActiveTab();
    });
  }
};

const scrollToActiveTab = () => {
  if (!tabsListRef.value) return;

  // Find the active tab button by checking if it's the active tab
  const buttons = tabsListRef.value.querySelectorAll('button');
  const activeTabId = activeTab.value?.id;

  buttons.forEach((button) => {
    const tabIndex = Array.from(buttons).indexOf(button);
    const tab = props.tabs[tabIndex];
    if (tab && tab.id === activeTabId) {
      button.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  });
};

// Watch for external model value changes
watch(
  () => props.modelValue,
  () => {
    if (props.scrollable) {
      nextTick(() => {
        scrollToActiveTab();
      });
    }
  }
);
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling for better UX */
@media (max-width: 768px) {
  .scrollbar-hide {
    scroll-behavior: smooth;
  }
}
</style>
