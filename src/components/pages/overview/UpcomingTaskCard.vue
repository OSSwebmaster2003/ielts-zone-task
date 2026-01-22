<script setup lang="ts">
import { Clock } from "lucide-vue-next";

interface Props {
  title: string;
  category: string;
  progress: string;
  daysLeft: string;
  image: string;
  teamAvatars: string[];
}

defineProps<Props>();
</script>

<template>
  <div class="bg-white w-full h-full rounded-[10px] p-6 overflow-hidden">
    <img
      :src="image"
      :alt="title"
      class="w-full aspect-5/2 object-cover rounded-[10px]"
    />
    <h4
      class="font-semibold text-[#141522] text-base mb-1 mt-4 leading-[150%] tracking-[-2%]"
    >
      {{ title }}
    </h4>
    <p class="text-[#54577A] text-xs leading-[150%] tracking-[-2%]">
      {{ category }}
    </p>

    <div class="mb-4 mt-4">
      <div class="flex items-center justify-between mb-2">
        <span
          class="text-base font-medium text-[#141522] leading-[150%] tracking-[-2%]"
          >Progress</span
        >
        <span
          class="text-base font-medium text-[#546FFF] leading-[150%] tracking-[-2%]"
          >{{ progress }}</span
        >
      </div>
      <div class="relative w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-[#546fff] h-2 rounded-full transition-all relative"
          :style="{ width: progress }"
        >
          <div
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-[#546fff] rounded-full border-2 border-white"
          ></div>
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center flex-wrap justify-between gap-3">
      <div
        class="flex items-center gap-2 text-base text-[#141522] leading-[150%] tracking-[-2%]"
      >
        <Clock :size="18" />
        <span>{{ daysLeft }}</span>
      </div>

      <!-- Team Avatars -->
      <div class="flex -space-x-2">
        <img
          v-for="(avatar, index) in teamAvatars"
          :key="index"
          :src="avatar"
          :alt="`Team member ${index + 1}`"
          class="w-8 h-8 rounded-full border-2 border-white object-cover"
        />
      </div>
    </div>
  </div>
</template>
