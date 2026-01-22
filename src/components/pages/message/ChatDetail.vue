<template>
  <div class="chat-detail flex-1 flex flex-col bg-white h-full absolute md:relative inset-0 z-20 md:z-auto">
    <!-- Chat Header -->
    <ChatHeader :chat="chat" @back="$emit('back')" />

    <!-- Messages Area -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto messages-area p-4 bg-gray-50">
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
import { ref, nextTick, watch, onMounted } from 'vue'
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
  'back': []
}>()

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Scroll to bottom when chat changes
watch(() => props.chat.id, () => {
  scrollToBottom()
})

// Scroll to bottom when messages change
watch(() => props.chat.messages.length, () => {
  scrollToBottom()
})

// Scroll to bottom on mount
onMounted(() => {
  scrollToBottom()
})

const handleSendMessage = (text: string) => {
  emit('send-message', text)
  // Scroll to bottom after sending message
  scrollToBottom()
}
</script>

<style scoped>
.chat-detail {
  height: calc(100vh - 180px);
}

.messages-area {
  height: calc(100% - 158px);
}
</style>
