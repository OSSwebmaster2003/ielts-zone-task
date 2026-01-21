<template>
  <div class="bg-white rounded-2xl p-6 border border-gray-200">
    <div class="flex items-center justify-between mb-6">
      <span class="text-lg font-semibold text-[#141522]">July 2022</span>
      <div class="flex gap-2">
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ChevronLeft :size="20" class="text-gray-400" />
        </button>
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ChevronRight :size="20" class="text-gray-400" />
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <!-- Day headers -->
      <div class="grid grid-cols-7 gap-2 mb-2">
        <div
          v-for="day in dayHeaders"
          :key="day"
          class="text-center text-xs font-semibold text-gray-600"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="day in 10"
          :key="`empty-${day}`"
          class="text-center text-sm text-gray-400"
        >
          {{ day }}
        </div>
        <div
          v-for="day in 31"
          :key="`day-${day}`"
          :class="[
            'text-center text-sm py-2 rounded-lg cursor-pointer transition-all',
            day === 14
              ? 'bg-[#546fff] text-white font-bold'
              : 'text-[#141522] hover:bg-gray-100'
          ]"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ref } from 'vue'

const dayHeaders = ref(['S', 'M', 'T', 'W', 'T', 'F', 'S'])
</script>
