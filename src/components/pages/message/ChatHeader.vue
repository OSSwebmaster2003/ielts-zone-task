<script setup lang="ts">
import { Video, Phone, ArrowLeft } from "lucide-vue-next";
import type { Chat } from "@/pages/message/MessagesPage.vue";

interface Props {
  chat: Chat | null;
}

defineProps<Props>();

defineEmits<{
  back: [];
}>();
</script>

<template>
  <div
    class="chat-header bg-white border-b border-gray-200 p-4 flex items-center justify-between"
  >
    <div class="flex items-center gap-3">
      <button
        @click="$emit('back')"
        class="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft :size="20" class="text-[#8E92BC]" />
      </button>

      <div class="relative">
        <img
          :src="chat?.avatar"
          :alt="chat?.name"
          class="w-12 h-12 rounded-full object-cover"
        />
        <span
          v-if="chat?.isOnline"
          class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
        ></span>
      </div>

      <div>
        <h2 class="text-base font-semibold text-[#141522]">
          {{ chat?.name }}
        </h2>
        <p
          class="text-xs"
          :class="chat?.isOnline ? 'text-green-500' : 'text-gray-400'"
        >
          {{ chat?.isOnline ? "online" : "last seen 20minutes ago" }}
        </p>
      </div>
    </div>

    <div class="flex items-center sm:gap-3 gap-2">
      <button
        class="sm:w-13 sm:h-13 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer border border-[#F5F5F7]"
      >
        <Video :size="20" class="text-[#8E92BC]" />
      </button>
      <button
        class="sm:w-13 sm:h-13 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer border border-[#F5F5F7]"
      >
        <Phone :size="20" class="text-[#8E92BC]" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
