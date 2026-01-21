<template>
  <div class="">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-2xl font-semibold text-[#141522] leading-[150%] tracking-[-3%]">Upcoming Tasks</h3>
      <div class="flex gap-2">
        <button 
          @click="prevSlide"
          :disabled="isAtStart"
          :class="[
            'w-6 h-6 flex items-center justify-center rounded-lg transition-all',
            isAtStart 
              ? 'cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          ]"
        >
          <ChevronLeft 
            :size="24" 
            :class="isAtStart ? 'text-gray-400' : 'text-[#141522]'" 
          />
        </button>
        <button 
          @click="nextSlide"
          :disabled="isAtEnd"
          :class="[
            'w-6 h-6 flex items-center justify-center rounded-lg transition-all',
            isAtEnd 
              ? 'cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          ]"
        >
          <ChevronRight 
            :size="24" 
            :class="isAtEnd ? 'text-gray-400' : 'text-[#141522]'" 
          />
        </button>
      </div>
    </div>
    
    <n-carousel
      ref="carouselRef"
      :show-dots="false"
      :show-arrow="false"
      :slides-per-view="2"
      :space-between="16"
      :loop="false"
      draggable
      @update:current-index="onSlideChange"
      class="upcoming-tasks-carousel"
    >
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-slide"
      >
        <UpcomingTaskCard
          :title="task.title"
          :category="task.category"
          :progress="task.progress"
          :daysLeft="task.daysLeft"
          :image="task.image"
          :teamAvatars="task.teamAvatars"
        />
      </div>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { NCarousel } from 'naive-ui'
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

const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Creating Mobile App Design",
    category: "UI UX Design",
    progress: "75%",
    daysLeft: "3 Days Left",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=5"
    ]
  },
  {
    id: 2,
    title: "Creating Perfect Website",
    category: "Web Developer",
    progress: "85%",
    daysLeft: "4 Days Left",
    image: task2,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=9",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=10"
    ]
  },
  {
    id: 3,
    title: "Creating Business Plan",
    category: "Project Management",
    progress: "20%",
    daysLeft: "8 Days Left",
    image: task1,
    teamAvatars: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=9",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=10"
    ]
  }
])

const carouselRef = ref<InstanceType<typeof NCarousel> | null>(null)
const currentIndex = ref(0)
const slidesPerView = 2

const isAtStart = computed(() => currentIndex.value === 0)

const isAtEnd = computed(() => {
  return currentIndex.value >= tasks.value.length - slidesPerView
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
</script>

<style scoped>

</style>
