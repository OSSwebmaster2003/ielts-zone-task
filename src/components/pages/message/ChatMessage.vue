<script setup lang="ts">
import type { Message } from "@/pages/message/MessagesPage.vue";

interface Props {
  message: Message;
}

defineProps<Props>();
</script>

<template>
  <div :class="['flex', message.isSent ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'max-w-[70%] rounded-2xl px-4 py-2',
        message.isSent
          ? 'bg-[#546fff] text-white'
          : 'bg-white text-[#141522] border border-gray-200',
      ]"
    >
      <div v-if="message.image" class="mb-2 rounded-lg overflow-hidden">
        <img
          :src="message.image"
          alt="Message image"
          class="w-full h-auto object-cover"
        />
      </div>

      <p class="text-sm leading-relaxed wrap-break-word">
        {{ message.text }}
      </p>

      <p
        :class="[
          'text-xs mt-1',
          message.isSent ? 'text-white/70' : 'text-gray-500',
        ]"
      >
        {{ message.timestamp }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
