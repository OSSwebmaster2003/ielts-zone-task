<template>
  <div class="bg-white rounded-[10px] p-6">
    <div class="flex items-start gap-3 mb-5">
      <img :src="image" :alt="name" class="w-12 h-12 rounded-full shrink-0" />
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-[#141522] text-base mb-1 leading-[150%] tracking-[-2%]">
          {{ name }}
        </h4>
        <p class="text-[#54577A] text-xs leading-[100%] tracking-[-2%]">
          {{ role }}
        </p>
      </div>
      <div class="shrink-0">
        <button
          v-if="!followed"
          class="text-[#546fff] text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer leading-[150%] tracking-[-2%]"
        >
          + Follow
        </button>
        <span
          v-else
          class="text-gray-500 text-sm"
        >
          Followed
        </span>
      </div>
    </div>

    <div class="flex items-center gap-8 text-xs">
      <div class="flex items-center gap-2">
        <DoubledTasksIcon :size="24" class="text-[#54577A]" />
        <span class="text-[#141522] text-sm leading-[150%] tracking-[-2%] font-medium">
          {{ tasks }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <Star :size="14" class="text-[#FFB054] fill-[#FFB054]" />
        <span class="text-[#141522] font-medium text-sm leading-[150%] tracking-[-2%]">{{ rating }}</span>
        <span class="text-[#141522] font-medium text-sm leading-[150%] tracking-[-2%]">({{ reviews }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import DoubledTasksIcon from '@/components/common/icons/DoubledTasksIcon.vue'

interface Props {
  name: string
  role: string
  tasks: string
  rating: string
  reviews: string
  image: string
  followed: boolean
}

defineProps<Props>()
</script>
