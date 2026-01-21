<template>
  <div class="bg-white rounded-2xl p-6 border border-gray-200">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-[#141522]">Monthly Mentors</h3>
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
      <MentorCard
        name="Curious George"
        role="UI/UX Design"
        tasks="40 Task"
        rating="4.7"
        reviews="750 Reviews"
        image="https://api.dicebear.com/7.x/avataaars/svg?seed=George"
        :followed="false"
      />
      <MentorCard
        name="Abraham Lincoln"
        role="3D Design"
        tasks="32 Task"
        rating="4.9"
        reviews="510 Reviews"
        image="https://api.dicebear.com/7.x/avataaars/svg?seed=Abraham"
        :followed="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import MentorCard from './MentorCard.vue'
</script>
