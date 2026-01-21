<template>
  <div class="bg-gray-50 rounded-xl overflow-hidden">
    <img :src="image" :alt="title" class="w-full h-32 object-cover" />
    <div class="p-4">
      <h4 class="font-semibold text-[#141522] text-sm mb-1">{{ title }}</h4>
      <p class="text-gray-600 text-xs mb-4">{{ category }}</p>

      <div class="mb-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-[#141522]">Progress</span>
          <span class="text-xs font-bold text-[#546fff]">{{ progress }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-[#546fff] h-2 rounded-full transition-all"
            :style="{ width: progress }"
          ></div>
        </div>
      </div>

      <div class="flex items-center gap-2 text-xs text-gray-600 mb-3">
        <Clock :size="14" />
        {{ daysLeft }}
      </div>

      <!-- Avatars -->
      <div class="flex -space-x-2">
        <img
          v-for="i in 3"
          :key="i"
          :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`"
          :alt="`User ${i}`"
          class="w-6 h-6 rounded-full border-2 border-white"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock } from 'lucide-vue-next'

interface Props {
  title: string
  category: string
  progress: string
  daysLeft: string
  image: string
}

defineProps<Props>()
</script>
