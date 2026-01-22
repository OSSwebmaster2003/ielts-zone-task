<template>
  <div class="flex flex-col gap-8 px-5 pb-8 w-full max-w-[400px]">
    <!-- Language Section -->
    <div class="flex flex-col gap-3">
      <h3 class="text-lg font-semibold text-[#141522]">Language</h3>
      <Select v-model="language" :options="languageOptions" placeholder="Select language" variant="filled"
        width="w-full" height="h-[50px]" @change="handleLanguageChange" />
    </div>

    <!-- Timezone Section -->
    <div class="flex flex-col gap-3">
      <h3 class="text-lg font-semibold text-[#141522]">Timezone</h3>
      <Select v-model="timezone" :options="timezoneOptions" placeholder="Select timezone" variant="filled"
        width="w-full" height="h-[50px]" @change="handleTimezoneChange" />
    </div>

    <!-- Time Format Section -->
    <div class="flex flex-col gap-3">
      <h3 class="text-lg font-semibold text-[#141522]">Timezone</h3>
      <div class="flex items-center justify-start gap-3">
        <label v-for="format in timeFormatOptions" :key="format.value" style="width: calc(50% - 6px);" :class="[
          'gap-3 py-[13px] px-3 border-2 rounded-lg cursor-pointer transition-all flex items-center justify-between',
          timeFormat === format.value
            ? 'border-[#546fff] bg-blue-50'
            : 'border-[#F5F5F7] hover:border-gray-300',
        ]">
          <span :class="[
            'text-xs leading-[100%] font-medium',
            timeFormat === format.value ? 'text-[#141522]' : 'text-gray-600',
          ]">
            {{ format.label }}
          </span>
          <input type="radio" :value="format.value" v-model="timeFormat" class="w-5 h-5 text-[#546fff] cursor-pointer"
            @change="handleTimeFormatChange" />
        </label>
      </div>
    </div>

    <div class="pt-4">
      <button @click="handleSaveChanges"
        class="px-6 py-3 bg-[#546fff] text-white font-medium rounded-lg hover:bg-[#4560e6] transition-colors sm:w-auto w-full">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/ui/Select.vue'

interface GeneralSettings {
  language: string | number | null
  timezone: string | number | null
  timeFormat: string
}

const STORAGE_KEY = 'generalSettings'

const defaultSettings: GeneralSettings = {
  language: 'english',
  timezone: 'utc',
  timeFormat: '24',
}

const loadSettings = (): GeneralSettings => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Error parsing general settings from localStorage:', e)
    }
  }
  return defaultSettings
}

const savedSettings = loadSettings()
const language = ref<string | number | null>(savedSettings.language)
const timezone = ref<string | number | null>(savedSettings.timezone)
const timeFormat = ref<string>(savedSettings.timeFormat)

const languageOptions: SelectOption[] = [
  { value: 'english', label: 'English (Default)' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
]

const timezoneOptions: SelectOption[] = [
  { value: 'utc', label: 'UTC (Coordinated Universal Time)' },
  { value: 'est', label: 'EST (Eastern Standard Time)' },
  { value: 'pst', label: 'PST (Pacific Standard Time)' },
  { value: 'gmt', label: 'GMT (Greenwich Mean Time)' },
  { value: 'cet', label: 'CET (Central European Time)' },
  { value: 'jst', label: 'JST (Japan Standard Time)' },
]

const timeFormatOptions = [
  { value: '24', label: '24 Hours' },
  { value: '12', label: '12 Hours' },
]

const handleLanguageChange = (value: string | number | null) => {
  console.log('Language changed to:', value)
}

const handleTimezoneChange = (value: string | number | null) => {
  console.log('Timezone changed to:', value)
}

const handleTimeFormatChange = () => {
  console.log('Time format changed to:', timeFormat.value)
}

const handleSaveChanges = () => {
  const settings: GeneralSettings = {
    language: language.value,
    timezone: timezone.value,
    timeFormat: timeFormat.value,
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    console.log('General settings saved successfully:', settings)
  } catch (e) {
    console.error('Error saving general settings to localStorage:', e)
  }
}

onMounted(() => {
  const settings = loadSettings()
  language.value = settings.language
  timezone.value = settings.timezone
  timeFormat.value = settings.timeFormat
})
</script>

<style scoped></style>
