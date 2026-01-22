<template>
  <div class="messages-page flex relative">
    <!-- Left Sidebar: Chat List -->
    <ChatList :chats="chats" :selectedChatId="selectedChatId" :class="[
      'md:block',
      selectedChatId ? 'hidden' : 'block'
    ]" @select-chat="handleSelectChat" />

    <!-- Right Side: Chat Detail -->
    <ChatDetail v-if="selectedChatId" :chat="selectedChat" :class="[
      'md:block',
      selectedChatId ? 'block' : 'hidden'
    ]" @send-message="handleSendMessage" @back="handleBack" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ChatList from '@/components/pages/message/ChatList.vue'
import ChatDetail from '@/components/pages/message/ChatDetail.vue'

export interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
  isOnline: boolean
  messages: Message[]
}

export interface Message {
  id: string
  text: string
  timestamp: string
  isSent: boolean
  image?: string
}

const selectedChatId = ref<string | null>(null)

const chats = ref<Chat[]>([
  {
    id: '1',
    name: 'Angelie Crison',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Angelie',
    lastMessage: "Thank you very much. I'm glad...",
    timestamp: '1 m Ago',
    unread: true,
    isOnline: true,
    messages: [
      {
        id: '1',
        text: 'Morning Angelie, I have question about My Task',
        timestamp: 'Today 11:52',
        isSent: true,
      },
      {
        id: '2',
        text: 'How to make a responsive display from the dashboard?',
        timestamp: 'Today 11:52',
        isSent: true,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
      },
      {
        id: '3',
        text: 'Is there a plugin to do this task?',
        timestamp: 'Today 11:52',
        isSent: true,
      },
      {
        id: '4',
        text: "Yes sure, Any problem with your assignment?",
        timestamp: 'Today 11:53',
        isSent: false,
      },
      {
        id: '5',
        text: 'No plugins. You just have to make it smaller according to the size of the phone.',
        timestamp: 'Today 11:53',
        isSent: false,
      },
      {
        id: '6',
        text: "Thank you very much. I'm glad you asked about the assignment",
        timestamp: 'Today 11:53',
        isSent: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Jakob Saris',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jakob',
    lastMessage: "You: Sure! let me tell you about w...",
    timestamp: '2 m Ago',
    unread: false,
    isOnline: false,
    messages: [
      {
        id: '1',
        text: 'Hello!',
        timestamp: 'Today 10:30',
        isSent: false,
      },
      {
        id: '2',
        text: "Sure! let me tell you about what I've been working on",
        timestamp: 'Today 10:31',
        isSent: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'Great! Looking forward to it.',
    timestamp: '5 m Ago',
    unread: true,
    isOnline: true,
    messages: [
      {
        id: '1',
        text: 'Hi there!',
        timestamp: 'Today 09:15',
        isSent: false,
      },
      {
        id: '2',
        text: 'Great! Looking forward to it.',
        timestamp: 'Today 09:16',
        isSent: true,
      },
    ],
  },
])

const selectedChat = computed(() => {
  return chats.value.find(chat => chat.id === selectedChatId.value) || null
})

const handleSelectChat = (chatId: string) => {
  selectedChatId.value = chatId
  // Mark as read when selected
  const chat = chats.value.find(c => c.id === chatId)
  if (chat) {
    chat.unread = false
  }
}

const handleBack = () => {
  selectedChatId.value = null
}

const handleSendMessage = (text: string) => {
  if (!selectedChatId.value) return

  const chat = chats.value.find(c => c.id === selectedChatId.value)
  if (chat) {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: 'Just now',
      isSent: true,
    }
    chat.messages.push(newMessage)
    chat.lastMessage = text
    chat.timestamp = 'Just now'
  }
}
</script>

<style scoped>
.messages-page {
  min-height: calc(100vh - 180px);
}
</style>
