<template>
  <div class="chat-header bg-white border-b border-gray-200 p-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Avatar -->
      <div class="relative">
        <img :src="chat.avatar" :alt="chat.name" class="w-12 h-12 rounded-full object-cover" />
        <span v-if="chat.isOnline"
          class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      <!-- Name and Status -->
      <div>
        <h2 class="text-base font-semibold text-[#141522]">
          {{ chat.name }}
        </h2>
        <p class="text-xs text-green-500">Online</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center gap-3">
      <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
        <Video :size="20" class="text-[#8E92BC]" />
      </button>
      <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
        <Phone :size="20" class="text-[#8E92BC]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Video, Phone } from 'lucide-vue-next'
import type { Chat } from '@/pages/message/MessagesPage.vue'

interface Props {
  chat: Chat
}

defineProps<Props>()
</script>

<style scoped></style>
