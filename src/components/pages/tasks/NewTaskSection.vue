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
  videoUrl?: string
  categories?: string
  studentsCount?: number
  description?: string
  assessmentPoints?: string[]
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
    ],
    videoUrl: "https://example.com/video10.mp4",
    categories: "Frontend Developer . React Development",
    studentsCount: 240,
    description: "Learn how to build modern web applications using React. This comprehensive course covers components, hooks, state management, routing, and best practices for building scalable React applications.",
    assessmentPoints: [
      "Understanding React fundamentals",
      "Working with components and props",
      "Managing state with hooks",
      "Building complete React applications"
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
    ],
    videoUrl: "https://example.com/video11.mp4",
    categories: "UI UX Design . Mobile Design",
    studentsCount: 195,
    description: "Master mobile UI design principles and create stunning mobile interfaces. Learn about mobile-first design, touch interactions, responsive layouts, and platform-specific design guidelines.",
    assessmentPoints: [
      "Understanding mobile design principles",
      "Creating touch-friendly interfaces",
      "Designing for different screen sizes",
      "Following platform guidelines"
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
    ],
    videoUrl: "https://example.com/video12.mp4",
    categories: "Web Developer . Landing Pages",
    studentsCount: 165,
    description: "Create high-converting landing pages that drive results. Learn about conversion optimization, A/B testing, persuasive copywriting, and design techniques that turn visitors into customers.",
    assessmentPoints: [
      "Understanding landing page structure",
      "Writing persuasive copy",
      "Optimizing for conversions",
      "Testing and improving performance"
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
    ],
    videoUrl: "https://example.com/video13.mp4",
    categories: "Backend Developer . API Development",
    studentsCount: 205,
    description: "Build robust REST APIs from scratch. Learn about HTTP methods, status codes, request/response handling, authentication, error handling, and API documentation best practices.",
    assessmentPoints: [
      "Designing RESTful API endpoints",
      "Implementing CRUD operations",
      "Handling authentication and authorization",
      "Documenting APIs effectively"
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
    ],
    videoUrl: "https://example.com/video14.mp4",
    categories: "UI UX Design . Wireframing",
    studentsCount: 140,
    description: "Learn the fundamentals of wireframing and information architecture. This course teaches you how to plan and structure your designs before diving into visual details, ensuring better user experiences.",
    assessmentPoints: [
      "Understanding wireframing basics",
      "Creating information architecture",
      "Using wireframing tools",
      "Translating wireframes to designs"
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
    ],
    videoUrl: "https://example.com/video15.mp4",
    categories: "Backend Developer . Database Design",
    studentsCount: 185,
    description: "Master database design and schema creation. Learn about normalization, relationships, indexing, query optimization, and best practices for designing efficient and scalable databases.",
    assessmentPoints: [
      "Understanding database fundamentals",
      "Designing normalized schemas",
      "Creating relationships and constraints",
      "Optimizing database performance"
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
    ],
    videoUrl: "https://example.com/video16.mp4",
    categories: "UI UX Design . Icon Design",
    studentsCount: 155,
    description: "Create cohesive icon sets that enhance your design projects. Learn about icon design principles, consistency, scalability, and how to create icons that work across different platforms and sizes.",
    assessmentPoints: [
      "Understanding icon design principles",
      "Creating consistent icon sets",
      "Designing scalable icons",
      "Exporting icons for different uses"
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
    ],
    videoUrl: "https://example.com/video17.mp4",
    categories: "Full Stack Developer . Security",
    studentsCount: 230,
    description: "Implement secure authentication systems for your applications. Learn about password hashing, JWT tokens, OAuth, session management, and security best practices for protecting user data.",
    assessmentPoints: [
      "Understanding authentication methods",
      "Implementing secure login systems",
      "Working with JWT tokens",
      "Ensuring application security"
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
    ],
    videoUrl: "https://example.com/video18.mp4",
    categories: "Product Manager . Agile Development",
    studentsCount: 110,
    description: "Learn how to write effective user stories that drive product development. This course covers story structure, acceptance criteria, prioritization, and how to work with development teams.",
    assessmentPoints: [
      "Writing clear user stories",
      "Defining acceptance criteria",
      "Prioritizing user stories",
      "Collaborating with development teams"
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