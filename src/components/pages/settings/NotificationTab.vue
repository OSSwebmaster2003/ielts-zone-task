<script setup lang="ts">
import { ref, onMounted } from "vue";
import Switch from "@/ui/Switch.vue";

interface NotificationSettings {
  message: boolean;
  taskUpdate: boolean;
  taskDeadline: boolean;
  mentorHelp: boolean;
}

const STORAGE_KEY = "notificationSettings";

const defaultNotifications: NotificationSettings = {
  message: true,
  taskUpdate: false,
  taskDeadline: true,
  mentorHelp: false,
};

const loadNotifications = (): NotificationSettings => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(
        "Error parsing notification settings from localStorage:",
        e,
      );
    }
  }
  return defaultNotifications;
};

const savedNotifications = loadNotifications();
const notifications = ref<NotificationSettings>(savedNotifications);

const handleNotificationChange = (
  key: keyof NotificationSettings,
  value: boolean,
) => {
  notifications.value[key] = value;
  console.log(`Notification ${key} changed to:`, value);
};

const handleSaveChanges = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications.value));
    console.log(
      "Notification settings saved successfully:",
      notifications.value,
    );
  } catch (e) {
    console.error("Error saving notification settings to localStorage:", e);
  }
};

onMounted(() => {
  const saved = loadNotifications();
  notifications.value = saved;
});
</script>

<template>
  <div class="flex flex-col gap-8 px-5 pb-8">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-start gap-3">
        <Switch
          id="message-switch"
          v-model="notifications.message"
          variant="default"
          size="md"
          @change="handleNotificationChange('message', $event)"
        />
        <label
          class="text-sm font-medium text-[#141522] cursor-pointer"
          for="message-switch"
        >
          Message
        </label>
      </div>

      <div class="flex items-center justify-start gap-3">
        <Switch
          id="task-update-switch"
          v-model="notifications.taskUpdate"
          variant="default"
          size="md"
          @change="handleNotificationChange('taskUpdate', $event)"
        />
        <label
          class="text-sm font-medium text-[#141522] cursor-pointer"
          for="task-update-switch"
        >
          Task Update
        </label>
      </div>

      <div class="flex items-center justify-start gap-3">
        <Switch
          id="task-deadline-switch"
          v-model="notifications.taskDeadline"
          variant="default"
          size="md"
          @change="handleNotificationChange('taskDeadline', $event)"
        />
        <label
          class="text-sm font-medium text-[#141522] cursor-pointer"
          for="task-deadline-switch"
        >
          Task Deadline
        </label>
      </div>

      <div class="flex items-center justify-start gap-3">
        <Switch
          id="mentor-help-switch"
          v-model="notifications.mentorHelp"
          variant="default"
          size="md"
          @change="handleNotificationChange('mentorHelp', $event)"
        />
        <label
          class="text-sm font-medium text-[#141522] cursor-pointer"
          for="mentor-help-switch"
        >
          Mentor Help
        </label>
      </div>
    </div>

    <div class="pt-4">
      <button
        @click="handleSaveChanges"
        class="px-6 py-3 bg-[#546fff] text-white font-medium rounded-lg hover:bg-[#4560e6] transition-colors sm:w-auto w-full cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<style scoped></style>
