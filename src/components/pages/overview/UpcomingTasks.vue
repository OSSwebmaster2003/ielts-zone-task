<template>
  <div class="bg-white rounded-2xl p-6 border border-gray-200">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-[#141522]">Upcoming Task</h3>
      <div class="flex gap-2">
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ChevronLeft :size="20" class="text-gray-400" />
        </button>
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-all">
          <ChevronRight :size="20" class="text-gray-400" />
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <TaskCard
        title="Creating Mobile App Design"
        category="UI/UX Design"
        progress="75%"
        daysLeft="3 Days Left"
        image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop"
      />
      <TaskCard
        title="Creating Perfect Website"
        category="Web Developer"
        progress="85%"
        daysLeft="4 Days Left"
        image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import TaskCard from './TaskCard.vue'
</script>
