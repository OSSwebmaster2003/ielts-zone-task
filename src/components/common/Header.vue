<template>
  <header class=" bg-white p-8">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold leading-[150%] tracking-[-3%] text-[#141522]">Hi, Dennis Nzioki</h1>
        <p class="text-[#54577A] text-base tracking-[-2%] leading-[150%]">
          Let's finish your task today!
        </p>
      </div>
      <div class="flex items-center gap-4">
        <button class="relative w-13 h-13 flex items-center justify-center border border-[#F5F5F7] rounded-full transition-all cursor-pointer">
          <BellIcon />
        </button>
        <img
          src="@/assets/profile.png"
          alt="Profile"
          class="w-13 h-13 rounded-full object-cover cursor-pointer"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BellIcon from './icons/BellIcon.vue'
</script>
