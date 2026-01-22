<script setup lang="ts">
import { MoreVertical, Clock } from "lucide-vue-next";
import { ref } from "vue";
import task1 from "@/assets/task1.png";

const avatarSeeds = ref(["d", "e"]);

const tasks = ref([
  "Understanding the tools in Figma",
  "Understand the basics of making designs",
  "Design a mobile application with figma",
]);
</script>

<template>
  <div class="bg-white rounded-[10px] p-6">
    <div class="flex items-center justify-between mb-5">
      <h3
        class="text-sm font-semibold text-[#141522] leading-[150%] tracking-[-2%]"
      >
        Task Today
      </h3>
      <button class="p-1 hover:bg-gray-100 rounded transition-all">
        <MoreVertical :size="20" class="text-gray-400" />
      </button>
    </div>

    <img
      :src="task1"
      alt="Task"
      class="w-full aspect-5/3 object-cover rounded-[10px] mb-4"
    />

    <h4
      class="text-base font-semibold text-[#141522] mb-1 leading-[150%] tracking-[-2%]"
    >
      Creating Awesome Mobile Apps
    </h4>
    <p class="text-xs text-[#54577A] mb-4 leading-[150%] tracking-[-2%]">
      UI/UX Designer
    </p>

    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span
          class="text-base font-medium text-[#141522] leading-[150%] tracking-[-2%]"
        >
          Progress
        </span>
        <span
          class="text-base font-medium text-[#546FFF] leading-[150%] tracking-[-2%]"
        >
          90%
        </span>
      </div>
      <div class="relative w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-[#546fff] h-2 rounded-full transition-all relative"
          style="width: 90%"
        >
          <div
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-[#546fff] rounded-full border-2 border-white"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-between pb-8 border-b border-b-[#F5F5F7]"
    >
      <div
        class="flex items-center gap-2 text-base text-[#141522] leading-[150%] tracking-[-2%]"
      >
        <Clock :size="18" />
        <span>1 Hour</span>
      </div>
      <div class="flex -space-x-2">
        <img
          v-for="seed in avatarSeeds"
          :key="seed"
          :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`"
          :alt="`User ${seed}`"
          class="w-8 h-8 rounded-full border-2 border-white object-cover"
        />
      </div>
    </div>

    <div class="flex pt-8 mb-4 items-center flex-wrap justify-between">
      <h3
        class="text-base font-semibold text-[#141522] leading-[150%] tracking-[-2%]"
      >
        Detail Task
      </h3>
      <span class="text-xs text-[#54577A] leading-[150%] tracking-[-2%]">
        UI/UX Designer
      </span>
    </div>
    <div class="space-y-2 mb-6">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="flex items-center gap-3"
      >
        <div
          :class="[
            'w-9 h-9 flex items-center justify-center text-xs font-semibold shrink-0 bg-[#F5F5F7] rounded-[10px]',
          ]"
        >
          {{ index + 1 }}
        </div>
        <p class="text-sm text-[#141522] leading-[150%] tracking-[-2%] pt-0.5">
          {{ task }}
        </p>
      </div>
    </div>

    <button
      class="w-full bg-[#546fff] text-white font-medium py-3 rounded-[10px] hover:bg-opacity-90 transition-all text-sm leading-[150%] tracking-[-2%] cursor-pointer"
    >
      Go to Detail
    </button>
  </div>
</template>
