<template>
  <div class="flex flex-col gap-8 px-5 pb-8">
    <!-- Notification Preferences -->
    <div class="flex flex-col gap-6">
      <!-- Message -->
      <div class="flex items-center justify-start gap-3">
        <Switch id="message-switch" v-model="notifications.message" variant="default" size="md"
          @change="handleNotificationChange('message', $event)" />
        <label class="text-sm font-medium text-[#141522] cursor-pointer" for="message-switch">
          Message
        </label>
      </div>

      <!-- Task Update -->
      <div class="flex items-center justify-start gap-3">
        <Switch id="task-update-switch" v-model="notifications.taskUpdate" variant="default" size="md"
          @change="handleNotificationChange('taskUpdate', $event)" />
        <label class="text-sm font-medium text-[#141522] cursor-pointer" for="task-update-switch">
          Task Update
        </label>
      </div>

      <!-- Task Deadline -->
      <div class="flex items-center justify-start gap-3">
        <Switch id="task-deadline-switch" v-model="notifications.taskDeadline" variant="default" size="md"
          @change="handleNotificationChange('taskDeadline', $event)" />
        <label class="text-sm font-medium text-[#141522] cursor-pointer" for="task-deadline-switch">
          Task Deadline
        </label>
      </div>

      <!-- Mentor Help -->
      <div class="flex items-center justify-start gap-3">
        <Switch id="mentor-help-switch" v-model="notifications.mentorHelp" variant="default" size="md"
          @change="handleNotificationChange('mentorHelp', $event)" />
        <label class="text-sm font-medium text-[#141522] cursor-pointer" for="mentor-help-switch">
          Mentor Help
        </label>
      </div>
    </div>

    <!-- Save Changes Button -->
    <div class="pt-4">
      <button @click="handleSaveChanges"
        class="px-6 py-3 bg-[#546fff] text-white font-medium rounded-lg hover:bg-[#4560e6] transition-colors sm:w-auto w-full">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Switch from '@/ui/Switch.vue'

interface NotificationSettings {
  message: boolean
  taskUpdate: boolean
  taskDeadline: boolean
  mentorHelp: boolean
}

const notifications = ref<NotificationSettings>({
  message: true,
  taskUpdate: false,
  taskDeadline: true,
  mentorHelp: false,
})

const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
  notifications.value[key] = value
  console.log(`Notification ${key} changed to:`, value)
}

const handleSaveChanges = () => {
  console.log('Saving notification changes:', notifications.value)
  // Add your save logic here
}
</script>

<style scoped></style>
