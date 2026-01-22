<template>
  <div class="chat-detail flex-1 flex flex-col bg-white h-full">
    <!-- Chat Header -->
    <ChatHeader :chat="chat" />

    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="flex justify-center my-4">
          <div class="bg-[#141522] text-white px-6 py-3 rounded-full text-xs">
            Today
          </div>
        </div>

        <!-- Messages -->
        <ChatMessage v-for="message in chat.messages" :key="message.id" :message="message" />
      </div>
    </div>

    <!-- Message Input -->
    <ChatInput @send-message="handleSendMessage" />
  </div>
</template>

<script setup lang="ts">
import ChatHeader from './ChatHeader.vue'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import type { Chat } from '@/pages/message/MessagesPage.vue'

interface Props {
  chat: Chat
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'send-message': [text: string]
}>()

const handleSendMessage = (text: string) => {
  emit('send-message', text)
}
</script>

<style scoped>
.chat-detail {
  height: calc(100vh - 180px);
}
</style>
