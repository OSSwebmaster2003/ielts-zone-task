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
            Hi, Dennis Nzioki
          </h1>
          <p class="text-[#54577A] text-base tracking-[-2%] leading-[150%]">
            Let's finish your task today!
          </p>
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
  </header>
</template>

<script setup lang="ts">
import { MenuIcon } from 'lucide-vue-next';
import BellIcon from './icons/BellIcon.vue'
import { useSidebar } from '@/composables/useSidebar'

const { toggleSidebar } = useSidebar()
</script>
