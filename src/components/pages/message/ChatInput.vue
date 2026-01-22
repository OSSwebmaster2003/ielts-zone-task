<template>
  <div class="chat-input bg-white border-t border-gray-200 p-4">
    <div class="flex items-center gap-3">
      <input v-model="messageText" type="text" placeholder="Send your message..."
        class="flex-1 shrink-0 px-4 py-3 rounded-[10px] border border-none outline-none bg-transparent focus:outline-none focus:border-none text-sm"
        @keyup.enter="handleSend" />

      <button
        class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0 cursor-pointer">
        <img src="@/assets/icons/attach-circle.svg" alt="Attach" class="w-6 h-6" />
      </button>

      <!-- Send Button -->
      <button @click="handleSend" :disabled="!messageText.trim()" :class="[
        'w-11 h-11 flex items-center justify-center rounded-[10px] transition-colors shrink-0 cursor-pointer',
        messageText.trim()
          ? 'bg-[#546fff] hover:bg-[#4560e6]'
          : 'bg-gray-300 cursor-not-allowed',
      ]">
        <img src="@/assets/icons/send-message.svg" alt="Send" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const messageText = ref('')

const emit = defineEmits<{
  'send-message': [text: string]
}>()

const handleSend = () => {
  if (messageText.value.trim()) {
    emit('send-message', messageText.value.trim())
    messageText.value = ''
  }
}
</script>

<style scoped></style>
