<template>
  <PageHeader>Task Details</PageHeader>

  <div v-if="task" class="task-detail-page">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column - Main Content -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-[10px] overflow-hidden">
          <!-- Video Player - Full width of card -->
          <div class="relative w-full aspect-video bg-black">
            <video v-if="task.videoUrl" :src="task.videoUrl" controls class="w-full h-full object-cover">
              Your browser does not support the video tag.
            </video>
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-900">
              <img :src="task.image" :alt="task.title" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Course Title and Info -->
          <div class="p-6">
            <h1 class="text-2xl md:text-[32px] font-semibold text-[#141522] mb-3 leading-[150%] tracking-[-3%]">
              {{ task.title }}
            </h1>
            <div class="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
              <span class="text-sm text-[#54577A] leading-[150%] tracking-[-2%]">
                {{ task.categories || task.category }}
              </span>
              <a href="#" class="text-sm text-[#04A4F4] font-medium hover:underline leading-[150%] tracking-[-2%]">
                + Get Mentors
              </a>
            </div>
            <div
              class="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-[#54577A] leading-[150%] tracking-[-2%]">
              <div class="flex items-center gap-2">
                <Users class="w-4 h-4" />
                <span class="text-sm text-[#141522] leading-[150%] tracking-[-2%] font-medium">{{ task.studentsCount ||
                  0
                }} Students
                  Involved</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock class="w-4 h-4" />
                <span class="text-sm text-[#141522] leading-[150%] tracking-[-2%] font-medium">{{ task.daysLeft
                }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="p-6">
            <h2 class="text-2xl font-semibold text-[#141522] mb-4 leading-[150%] tracking-[-2%]">
              Description
            </h2>
            <p class="text-sm text-[#54577A] leading-[200%] whitespace-pre-line">
              {{ task.description || 'No description available.' }}
            </p>
          </div>

          <!-- Essence of Assessment -->
          <div class="p-6 ">
            <h2 class="text-2xl font-semibold text-[#141522] mb-4 leading-[150%] tracking-[-2%]">
              Essence of Assessment
            </h2>
            <ul class="space-y-3">
              <li v-for="(point, index) in task.assessmentPoints" :key="index" class="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="mt-0.5 shrink-0">
                  <circle cx="10" cy="10" r="9" fill="#546FFF" stroke="#546FFF" stroke-width="2" />
                  <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <span class="text-sm text-[#141522] leading-[200%] ">{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right Column - Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-[10px] p-6 space-y-6">
          <!-- Assigned Assignments -->
          <div>
            <h2 class="text-sm font-semibold text-[#141522] mb-4 leading-[150%] tracking-[-2%]">
              Assigned Assignments
            </h2>
            <h3 class="text-2xl font-semibold text-[#141522] mb-2 leading-[150%] tracking-[-3%]">
              {{ task.title }}
            </h3>
            <p class="text-sm text-[#54577A] leading-[150%] tracking-[-2%] font-medium">
              {{ task.categories || task.category }}
            </p>
          </div>

          <!-- Detail Student -->
          <div class=" pt-6">
            <h2 class="text-xl font-semibold text-[#141522] mb-4 leading-[150%] tracking-[-2%]">
              Detail Student
            </h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between gap-x-2 gap-y-1 flex-wrap">
                <p class="text-sm text-[#54577A] mb-1 leading-[150%] tracking-[-2%]">Student's name</p>
                <p class="text-sm font-medium text-[#141522] leading-[150%] tracking-[-2%]">Dennis Nzioki</p>
              </div>
              <div class="flex items-center justify-between gap-x-2 gap-y-1 flex-wrap">
                <p class="text-sm text-[#54577A] mb-1 leading-[150%] tracking-[-2%]">Student Class</p>
                <p class="text-sm font-medium text-[#141522] leading-[150%] tracking-[-2%]">MIPA 2</p>
              </div>
              <div class="flex items-center justify-between gap-x-2 gap-y-1 flex-wrap">
                <p class="text-sm text-[#54577A] mb-1 leading-[150%] tracking-[-2%]">Student Number</p>
                <p class="text-sm font-medium text-[#141522] leading-[150%] tracking-[-2%]">10</p>
              </div>
            </div>
          </div>

          <!-- File Task -->
          <div class=" pt-6">
            <h2 class="text-xl font-semibold text-[#141522] mb-4 leading-[150%] tracking-[-2%]">
              File Task
            </h2>
            <div class="mb-4 flex items-center justify-between gap-x-2 gap-y-1 flex-wrap">
              <p class="text-sm text-[#54577A] mb-1 leading-[150%] tracking-[-2%]">Last Modified</p>
              <p class="text-sm font-medium text-[#141522] leading-[150%] tracking-[-2%]">1 July 2022</p>
            </div>
            <div class="mb-4 ">
              <p class="text-xs text-[#54577A] mb-2 leading-[150%] tracking-[-2%]">File submissions</p>
              <div
                class="border-2 border-dashed border-gray-300 rounded-[10px] p-8 text-center cursor-pointer hover:border-[#546FFF] transition-colors min-h-[140px] flex items-center justify-center"
                @click="triggerFileInput">
                <input ref="fileInput" type="file" class="hidden" @change="handleFileChange" />
                <div class="flex flex-col items-center justify-center">
                  <FolderOpenIcon v-if="!selectedFileName" />
                  <p v-if="!selectedFileName" class="text-xs text-[#8E92BC] leading-[150%] tracking-[-2%]">
                    *drag or browser from device
                  </p>
                  <p v-else class="text-sm text-[#141522] font-medium leading-[150%] tracking-[-2%]">
                    {{ selectedFileName }}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="w-full bg-[#546FFF] text-white font-medium py-3 rounded-[10px] hover:bg-opacity-90 transition-all text-sm leading-[150%] tracking-[-2%] cursor-pointer"
              @click="handleSubmit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Task not found</p>
  </div>
</template>

<script setup lang="ts">
import { Clock, Users } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FolderOpenIcon from '@/components/common/icons/FolderOpenIcon.vue'
import PageHeader from '@/components/common/PageHeader.vue'

interface Task {
  id: number
  title: string
  category: string
  progress: string
  daysLeft: string
  image: string
  teamAvatars: string[]
  videoUrl?: string
  categories?: string
  studentsCount?: number
  description?: string
  assessmentPoints?: string[]
}

const route = useRoute()
const task = ref<Task | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFileName = ref<string | null>(null)

const findTaskById = (taskId: number): Task | null => {
  // Check timeLimitTasks first
  const timeLimitTasks = localStorage.getItem('timeLimitTasks')
  if (timeLimitTasks) {
    try {
      const tasks: Task[] = JSON.parse(timeLimitTasks)
      const foundTask = tasks.find(t => t.id === taskId)
      if (foundTask) return foundTask
    } catch (e) {
      console.error('Error parsing timeLimitTasks from localStorage:', e)
    }
  }

  // Check newTasks
  const newTasks = localStorage.getItem('newTasks')
  if (newTasks) {
    try {
      const tasks: Task[] = JSON.parse(newTasks)
      const foundTask = tasks.find(t => t.id === taskId)
      if (foundTask) return foundTask
    } catch (e) {
      console.error('Error parsing newTasks from localStorage:', e)
    }
  }

  return null
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    if (file) {
      selectedFileName.value = file.name
      console.log('File selected:', file)
      // Handle file upload logic here
    }
  }
}

const handleSubmit = () => {
  console.log('Submit button clicked')
  // Handle submit logic here
}

onMounted(() => {
  const taskId = Number(route.params.id)

  if (isNaN(taskId)) {
    console.error('Invalid task ID:', route.params.id)
    return
  }

  const foundTask = findTaskById(taskId)

  if (foundTask) {
    task.value = foundTask
    console.log('Task found:', foundTask)
  } else {
    console.log('Task not found with ID:', taskId)
  }
})
</script>

<style scoped>
.task-detail-page {
  padding: 0;
}
</style>
