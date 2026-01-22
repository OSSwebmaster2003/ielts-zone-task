<script setup lang="ts">
import { ref, computed } from "vue";
import ChatList from "@/components/pages/message/ChatList.vue";
import ChatDetail from "@/components/pages/message/ChatDetail.vue";
import { useChatStorage } from "@/composables/useChatStorage";

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isOnline: boolean;
  messages: Message[];
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  image?: string;
}

const selectedChatId = ref<string | null>(null);

const { chats, saveChats } = useChatStorage();

const selectedChat = computed(() => {
  return chats.value.find((chat) => chat.id === selectedChatId.value) || null;
});

const handleSelectChat = (chatId: string) => {
  selectedChatId.value = chatId;
  const chat = chats.value.find((c) => c.id === chatId);
  if (chat) {
    chat.unread = false;
    saveChats(chats.value);
  }
};

const handleBack = () => {
  selectedChatId.value = null;
};

const handleSendMessage = (text: string) => {
  if (!selectedChatId.value) return;

  const chat = chats.value.find((c) => c.id === selectedChatId.value);
  if (chat) {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: "Just now",
      isSent: true,
    };
    chat.messages.push(newMessage);
    chat.lastMessage = text;
    chat.timestamp = "Just now";
    saveChats(chats.value);
  }
};
</script>

<template>
  <div class="messages-page flex relative">
    <ChatList
      :chats="chats"
      :selectedChatId="selectedChatId"
      :class="['md:block', selectedChatId ? 'hidden' : 'block']"
      @select-chat="handleSelectChat"
    />

    <ChatDetail
      v-if="selectedChatId"
      :chat="selectedChat"
      :class="['md:block', selectedChatId ? 'block' : 'hidden']"
      @send-message="handleSendMessage"
      @back="handleBack"
    />
  </div>
</template>

<style scoped>
.messages-page {
  min-height: calc(100vh - 180px);
}
</style>
