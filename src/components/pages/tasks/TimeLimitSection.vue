<template>
  <div class="">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-[#141522] leading-[150%] tracking-[-3%]">
        Time Limit
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
      :space-between="16" :loop="false" @update:current-index="onSlideChange" class="time-limit-carousel">
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
    id: 1,
    title: "Creating Awesome Mobile Apps",
    category: "UI UX Design",
    progress: "90%",
    daysLeft: "1 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=11",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=12",
    ]
  },
  {
    id: 2,
    title: "Creating Fresh Website",
    category: "Web Developer",
    progress: "85%",
    daysLeft: "2 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=16",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=17",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=18",
    ]
  },
  {
    id: 3,
    title: "Creating Color Palettes",
    category: "UI UX Design",
    progress: "100%",
    daysLeft: "1 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=21",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=22",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=23",
    ]
  },
  {
    id: 4,
    title: "Creating Business Strategy",
    category: "Web Dev",
    progress: "60%",
    daysLeft: "3 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=26",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=27",
    ]
  },
  {
    id: 5,
    title: "Designing User Interfaces",
    category: "UI UX Design",
    progress: "75%",
    daysLeft: "4 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=31",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=32",
    ]
  },
  {
    id: 6,
    title: "Building E-commerce Platform",
    category: "Web Developer",
    progress: "50%",
    daysLeft: "5 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=36",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=37",
    ]
  },
  {
    id: 7,
    title: "Creating Brand Identity",
    category: "UI UX Design",
    progress: "40%",
    daysLeft: "6 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=41",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=42",
    ]
  },
  {
    id: 8,
    title: "Developing API Backend",
    category: "Web Developer",
    progress: "70%",
    daysLeft: "2 Hour",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=46",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=47",
    ]
  },
  {
    id: 9,
    title: "Creating Dashboard Design",
    category: "UI UX Design",
    progress: "95%",
    daysLeft: "1 Hour",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=51",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=52",
    ]
  }
]

// Load tasks from localStorage or use default
const loadTasks = (): Task[] => {
  const stored = localStorage.getItem('timeLimitTasks')
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
  localStorage.setItem('timeLimitTasks', JSON.stringify(tasksToSave))
}

const tasks = ref<Task[]>(loadTasks())

// Save to localStorage on mount
onMounted(() => {
  if (!localStorage.getItem('timeLimitTasks')) {
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