<template>
  <div
    class="bg-white w-full h-full rounded-[10px] sm:p-6 p-4 flex flex-col gap-5"
  >
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div class="flex items-center justify-start gap-3">
        <img :src="image" :alt="name" class="w-12 h-12 rounded-full shrink-0" />
        <div class="flex flex-col gap-1">
          <h4
            class="font-semibold text-[#141522] text-base mb-1 leading-[150%] tracking-[-2%] wrap-break-word"
          >
            {{ name }}
          </h4>
          <p
            class="text-[#54577A] text-xs leading-[100%] tracking-[-2%] wrap-break-word"
          >
            {{ role }}
          </p>
        </div>
      </div>
      <div class="">
        <button
          v-if="!followed"
          @click="$emit('follow')"
          class="text-[#546fff] text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer leading-[150%] tracking-[-2%] whitespace-nowrap"
        >
          + Follow
        </button>
        <span
          v-else
          class="text-[#54577A] text-sm whitespace-nowrap leading-[150%] tracking-[-2%] font-medium"
        >
          Followed
        </span>
      </div>
    </div>

    <div class="flex items-center flex-wrap sm:gap-x-8 gap-x-4 gap-y-2 text-xs">
      <div class="flex items-center gap-2">
        <DoubledTasksIcon :size="24" class="text-[#54577A]" />
        <span
          class="text-[#141522] text-sm leading-[150%] tracking-[-2%] font-medium"
        >
          {{ tasks }}
        </span>
      </div>
      <div class="flex items-center flex-wrap gap-2">
        <Star :size="14" class="text-[#FFB054] fill-[#FFB054]" />
        <span
          class="text-[#141522] font-medium text-sm leading-[150%] tracking-[-2%]"
          >{{ rating }}</span
        >
        <span
          class="text-[#141522] font-medium text-sm leading-[150%] tracking-[-2%]"
          >({{ reviews }})</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star } from "lucide-vue-next";
import DoubledTasksIcon from "@/components/common/icons/DoubledTasksIcon.vue";

interface Props {
  name: string;
  role: string;
  tasks: string;
  rating: string;
  reviews: string;
  image: string;
  followed: boolean;
}

defineProps<Props>();

defineEmits<{
  follow: [];
}>();
</script>
