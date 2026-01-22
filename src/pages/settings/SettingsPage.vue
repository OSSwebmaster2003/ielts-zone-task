<template>
  <PageHeader>Settings</PageHeader>

  <div class="bg-white rounded-[10px] pt-5">
    <Tab v-model="activeTab" :tabs="tabs" variant="underline" @tab-change="handleTabChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import Tab from '@/ui/Tab.vue'
import type { TabItem } from '@/ui/Tab.vue'
import GeneralTab from '@/components/pages/settings/GeneralTab.vue'
import NotificationTab from '@/components/pages/settings/NotificationTab.vue'

const activeTab = ref<string | number>('general')

const tabs: TabItem[] = [
  {
    id: 'general',
    label: 'General',
    content: GeneralTab,
  },
  {
    id: 'notification',
    label: 'Notification',
    content: NotificationTab,
  },
]

const handleTabChange = (tab: TabItem) => {
  console.log('Tab changed to:', tab.label)
}
</script>

<style scoped></style>
