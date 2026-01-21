<template>
  <div class="">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-[#141522] leading-[150%] tracking-[-3%]">
        New Task
      </h2>
      <div class="flex gap-2">
        <button @click="prevSlide" :disabled="isAtStart" :class="[
          'w-6 h-6 flex items-center justify-center rounded-lg transition-all',
          isAtStart
            ? 'cursor-not-allowed'
            : 'hover:bg-gray-100 cursor-pointer'
        ]">
          <ChevronLeft :size="24" :class="isAtStart ? 'text-gray-400' : 'text-[#141522]'" />
        </button>
        <button @click="nextSlide" :disabled="isAtEnd" :class="[
          'w-6 h-6 flex items-center justify-center rounded-lg transition-all',
          isAtEnd
            ? 'cursor-not-allowed'
            : 'hover:bg-gray-100 cursor-pointer'
        ]">
          <ChevronRight :size="24" :class="isAtEnd ? 'text-gray-400' : 'text-[#141522]'" />
        </button>
      </div>
    </div>

    <n-carousel ref="carouselRef" :show-dots="false" :show-arrow="false" :slides-per-view="slidesPerView"
      :space-between="16" :loop="false" @update:current-index="onSlideChange" class="new-task-carousel">
      <div v-for="task in tasks" :key="task.id" class="task-slide">
        <div @click="handleTaskClick(task.id)" class="cursor-pointer">
          <UpcomingTaskCard :title="task.title" :category="task.category" :progress="task.progress"
            :daysLeft="task.daysLeft" :image="task.image" :teamAvatars="task.teamAvatars" />
        </div>
      </div>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { NCarousel } from 'naive-ui'
import { useRouter } from 'vue-router'
import UpcomingTaskCard from '@/components/pages/overview/UpcomingTaskCard.vue'
import task1 from '@/assets/task1.png'
import task2 from '@/assets/task2.png'

interface Task {
  id: number
  title: string
  category: string
  progress: string
  daysLeft: string
  image: string
  teamAvatars: string[]
}

const router = useRouter()

// Default tasks data
const defaultTasks: Task[] = [
  {
    id: 10,
    title: "Building React Application",
    category: "Frontend Developer",
    progress: "30%",
    daysLeft: "5 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=61",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=62",
    ]
  },
  {
    id: 11,
    title: "Designing Mobile UI",
    category: "UI UX Design",
    progress: "25%",
    daysLeft: "6 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=63",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=64",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=65",
    ]
  },
  {
    id: 12,
    title: "Creating Landing Page",
    category: "Web Developer",
    progress: "45%",
    daysLeft: "4 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=66",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=67",
    ]
  },
  {
    id: 13,
    title: "Developing REST API",
    category: "Backend Developer",
    progress: "55%",
    daysLeft: "3 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=68",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=69",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=70",
    ]
  },
  {
    id: 14,
    title: "Creating Wireframes",
    category: "UI UX Design",
    progress: "20%",
    daysLeft: "7 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=71",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=72",
    ]
  },
  {
    id: 15,
    title: "Building Database Schema",
    category: "Backend Developer",
    progress: "35%",
    daysLeft: "5 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=73",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=74",
    ]
  },
  {
    id: 16,
    title: "Designing Icons Set",
    category: "UI UX Design",
    progress: "15%",
    daysLeft: "8 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=75",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=76",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=77",
    ]
  },
  {
    id: 17,
    title: "Implementing Authentication",
    category: "Full Stack Developer",
    progress: "65%",
    daysLeft: "2 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=78",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=79",
    ]
  },
  {
    id: 18,
    title: "Creating User Stories",
    category: "Product Manager",
    progress: "10%",
    daysLeft: "9 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=80",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=81",
    ]
  }
]

// Load tasks from localStorage or use default
const loadTasks = (): Task[] => {
  const stored = localStorage.getItem('newTasks')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Error parsing tasks from localStorage:', e)
    }
  }
  return defaultTasks
}

// Save tasks to localStorage
const saveTasks = (tasksToSave: Task[]) => {
  localStorage.setItem('newTasks', JSON.stringify(tasksToSave))
}

const tasks = ref<Task[]>(loadTasks())

// Save to localStorage on mount
onMounted(() => {
  if (!localStorage.getItem('newTasks')) {
    saveTasks(defaultTasks)
  }
})

const carouselRef = ref<InstanceType<typeof NCarousel> | null>(null)
const currentIndex = ref(0)
const windowWidth = ref(window.innerWidth)

const slidesPerView = computed(() => {
  // Mobile: < 768px (md breakpoint) - 1 per view
  // Tablet: 768px - 1024px (md to lg) - 2 per view
  // Large: >= 1024px (lg breakpoint) - 3 per view
  if (windowWidth.value < 768) {
    return 1 // Mobile
  } else if (windowWidth.value < 1024) {
    return 2 // Tablet
  } else {
    return 3 // Large screen
  }
})

const isAtStart = computed(() => currentIndex.value === 0)

const isAtEnd = computed(() => {
  return currentIndex.value >= tasks.value.length - slidesPerView.value
})

const onSlideChange = (index: number) => {
  currentIndex.value = index
}

const prevSlide = () => {
  if (!isAtStart.value) {
    carouselRef.value?.prev()
  }
}

const nextSlide = () => {
  if (!isAtEnd.value) {
    carouselRef.value?.next()
  }
}

const handleTaskClick = (taskId: number) => {
  router.push(`/tasks/${taskId}`)
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped></style>