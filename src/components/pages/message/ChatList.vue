<template>
  <div
    class="chat-list w-full md:w-[400px] border-r border-gray-200 bg-white flex flex-col h-full absolute md:relative inset-0 z-10 md:z-auto">
    <!-- Search Bar -->
    <div class="p-4 border-b border-gray-200">
      <div class="relative">
        <Input v-model="searchQuery" placeholder="Search Name" :icon-component="Search" icon-position="after"
          variant="filled" width="w-full" height="h-[44px]" borderRadius="rounded-[10px]" />
      </div>
    </div>

    <!-- Chat Contacts List -->
    <div class="flex-1 overflow-y-auto">
      <div v-for="chat in filteredChats" :key="chat.id" :class="[
        'p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50',
        selectedChatId === chat.id ? 'bg-gray-50' : '',
      ]" @click="$emit('select-chat', chat.id)">
        <div class="flex items-start gap-3">
          <!-- Avatar -->
          <div class="relative shrink-0">
            <img :src="chat.avatar" :alt="chat.name" class="w-12 h-12 rounded-full object-cover" />
            <span v-if="chat.isOnline"
              class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <!-- Chat Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-sm font-semibold text-[#141522] truncate leading-[150%] tracking-[-2%]">
                {{ chat.name }}
              </h3>
              <span class="text-xs text-gray-500 shrink-0 ml-2">
                {{ chat.timestamp }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-xs text-[#9C9CA4] truncate">
                {{ chat.lastMessage }}
              </p>
              <div class="shrink-0 ml-2">
                <span v-if="chat.unread" class="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                <svg v-else class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import Input from '@/ui/Input.vue'
import type { Chat } from '@/pages/message/MessagesPage.vue'

interface Props {
  chats: Chat[]
  selectedChatId: string | null
}

const props = defineProps<Props>()

defineEmits<{
  'select-chat': [chatId: string]
}>()

const searchQuery = ref('')

const filteredChats = computed(() => {
  if (!searchQuery.value) {
    return props.chats
  }
  const query = searchQuery.value.toLowerCase()
  return props.chats.filter(
    chat => chat.name.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.chat-list {
  height: calc(100vh - 180px);
}
</style>
