<template>
  <div class="bg-gray-50 rounded-xl p-4">
    <div class="flex items-center gap-3 mb-4">
      <img :src="image" :alt="name" class="w-12 h-12 rounded-full" />
      <div class="flex-1">
        <h4 class="font-semibold text-[#141522] text-sm">{{ name }}</h4>
        <p class="text-gray-600 text-xs">{{ role }}</p>
      </div>
    </div>

    <button
      :class="[
        'w-full py-2 rounded-lg text-sm font-semibold transition-all mb-3',
        followed
          ? 'bg-gray-200 text-[#141522] hover:bg-gray-300'
          : 'bg-white text-[#546fff] border border-[#546fff] hover:bg-[#546fff] hover:text-white'
      ]"
    >
      {{ followed ? 'Followed' : '+ Follow' }}
    </button>

    <div class="space-y-2 text-xs text-gray-600">
      <div class="flex items-center gap-2">
        <CheckCircle :size="16" class="text-gray-400" />
        {{ tasks }}
      </div>
      <div class="flex items-center gap-2">
        <Star :size="16" class="text-yellow-400 fill-yellow-400" />
        <span class="font-semibold">{{ rating }}</span> ({{ reviews }})
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, Star } from 'lucide-vue-next'

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
