<template>
  <div class="bg-white rounded-2xl p-6 border border-gray-200">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-[#141522]">Task Today</h3>
      <button class="p-2 hover:bg-gray-100 rounded-lg transition-all">
        <MoreVertical :size="20" class="text-gray-400" />
      </button>
    </div>

    <img
      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
      alt="Task"
      class="w-full h-48 object-cover rounded-lg mb-4"
    />

    <h4 class="text-lg font-bold text-[#141522] mb-2">Creating Awesome Mobile Apps</h4>
    <p class="text-gray-600 text-sm mb-4">UI/UX Designer</p>

    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-semibold text-[#141522]">Progress</span>
        <span class="text-sm font-bold text-[#546fff]">90%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-[#546fff] h-2 rounded-full" style="width: 90%"></div>
      </div>
    </div>

    <!-- Time and Avatars -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <Clock :size="16" />
        1 Hour
      </div>
      <div class="flex -space-x-2">
        <img
          v-for="seed in avatarSeeds"
          :key="seed"
          :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`"
          :alt="`User ${seed}`"
          class="w-7 h-7 rounded-full border-2 border-white"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoreVertical, Clock } from 'lucide-vue-next'
import { ref } from 'vue'

const avatarSeeds = ref(['a', 'b', 'c', 'd'])
</script>
