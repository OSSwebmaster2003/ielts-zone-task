<template>
  <div class="bg-white rounded-2xl p-6 border border-gray-200">
    <div class="mb-6">
      <h3 class="text-lg font-bold text-[#141522] mb-1">Detail Task</h3>
      <p class="text-gray-600 text-sm">UI/UX Designer</p>
    </div>

    <div class="space-y-4 mb-6">
      <div v-for="(task, index) in tasks" :key="index" class="flex gap-3">
        <div
          :class="[
            'w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
            index === 0
              ? 'bg-[#546fff] text-white'
              : 'bg-gray-200 text-[#141522]'
          ]"
        >
          {{ index + 1 }}
        </div>
        <p class="text-gray-700 text-sm pt-0.5">{{ task }}</p>
      </div>
    </div>

    <button class="w-full bg-[#546fff] text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-all">
      Go to Detail
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref([
  'Understanding the tools in Figma',
  'Understand the basics of making designs',
  'Design a mobile application with figma',
])
</script>
