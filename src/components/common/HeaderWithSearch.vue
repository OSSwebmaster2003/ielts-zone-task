<template>
  <header class="bg-white p-6 md:p-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <!-- Burger Menu (Mobile Only) -->
        <button @click="toggleSidebar"
          class="burger-menu md:hidden flex items-center justify-center  transition-all cursor-pointer w-11 h-11 border border-[#F5F5F7] rounded-full">
          <MenuIcon :size="24" class="text-[#8E92BC] text-lg w-8 h-8" />
        </button>
        <div class="hidden md:flex flex-col gap-2">
          <h1 class="text-2xl font-semibold leading-[150%] tracking-[-3%] text-[#141522]">
            {{ pageHeader || "" }}
          </h1>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button
          class="relative w-13 h-13 flex items-center justify-center border border-[#F5F5F7] rounded-full transition-all cursor-pointer">
          <BellIcon />
        </button>
        <img src="@/assets/profile.png" alt="Profile" class="w-13 h-13 rounded-full object-cover cursor-pointer" />
      </div>
    </div>
    <div v-if="hasSearch" class="mt-6 w-full flex items-center justify-between sm:gap-8 gap-6">

      <div class="flex-1 sm:max-w-[420px]">
        <Input v-model="searchQuery" placeholder="Search Task" :icon-component="Search" icon-position="after"
          variant="filled" width="w-full" height="h-[52px]" borderRadius="rounded-[10px]" />
      </div>

      <div class="hidden sm:flex items-center justify-end gap-4">
        <button
          class="flex items-center gap-[10px] px-4 py-3.5 rounded-[10px] border border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">
          <LayoutGrid :size="24" class="text-[#8E92BC]" />
          <span class="text-xs text-[#141522] font-medium">Category</span>
        </button>

        <button
          class="flex items-center gap-[10px] px-4 py-3.5 rounded-[10px] border border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">
          <FilterIcon />
          <span class="text-xs text-[#141522] font-medium">Sort By : Deadline</span>
        </button>
      </div>

      <button
        class="flex sm:hidden items-center gap-[10px] px-[13px] py-[13px] rounded-[10px] border border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">
        <FilterIcon size="24" />
      </button>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon, LayoutGrid, Search } from 'lucide-vue-next'
import BellIcon from './icons/BellIcon.vue'
import FilterIcon from './icons/FilterIcon.vue'
import Input from '@/ui/Input.vue'
import { useSidebar } from '@/composables/useSidebar'
import { usePageHeader } from '@/composables/usePageHeader'

interface Props {
  hasSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasSearch: true,
})

const { toggleSidebar } = useSidebar()
const { pageHeader } = usePageHeader()
const searchQuery = ref('')
</script>
