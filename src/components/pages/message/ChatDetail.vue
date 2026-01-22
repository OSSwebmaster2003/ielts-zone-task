<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from "vue";
import ChatHeader from "./ChatHeader.vue";
import ChatMessage from "./ChatMessage.vue";
import ChatInput from "./ChatInput.vue";
import type { Chat } from "@/pages/message/MessagesPage.vue";

interface Props {
  chat: Chat | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "send-message": [text: string];
  back: [];
}>();

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(
  () => props.chat?.id,
  () => {
    scrollToBottom();
  },
);

watch(
  () => props.chat?.messages.length,
  () => {
    scrollToBottom();
  },
);

onMounted(() => {
  scrollToBottom();
});

const handleSendMessage = (text: string) => {
  emit("send-message", text);
  scrollToBottom();
};
</script>

<template>
  <div
    class="chat-detail flex-1 flex flex-col bg-white h-full absolute md:relative inset-0 z-20 md:z-auto"
  >
    <ChatHeader :chat="chat" @back="$emit('back')" />

    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto messages-area p-4 bg-gray-50"
    >
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="flex justify-center my-4">
          <div class="bg-[#141522] text-white px-6 py-3 rounded-full text-xs">
            Today
          </div>
        </div>

        <ChatMessage
          v-for="message in chat?.messages"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>

    <ChatInput @send-message="handleSendMessage" />
  </div>
</template>

<style scoped>
.chat-detail {
  height: calc(100vh - 180px);
}

.messages-area {
  height: calc(100% - 158px);
}
</style>
