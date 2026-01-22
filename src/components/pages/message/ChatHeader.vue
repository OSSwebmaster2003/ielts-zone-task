<template>
  <div class="chat-header bg-white border-b border-gray-200 p-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Back Button (Mobile Only) -->
      <button @click="$emit('back')"
        class="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
        <ArrowLeft :size="20" class="text-[#8E92BC]" />
      </button>

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
      <button
        class="w-13 h-13 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer border border-[#F5F5F7]">
        <Video :size="20" class="text-[#8E92BC]" />
      </button>
      <button
        class="w-13 h-13 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer border border-[#F5F5F7]">
        <Phone :size="20" class="text-[#8E92BC]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Video, Phone, ArrowLeft } from 'lucide-vue-next'
import type { Chat } from '@/pages/message/MessagesPage.vue'

interface Props {
  chat: Chat
}

defineProps<Props>()

defineEmits<{
  'back': []
}>()
</script>

<style scoped></style>
