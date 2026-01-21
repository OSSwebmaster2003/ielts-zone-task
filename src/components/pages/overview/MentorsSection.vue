<template>
  <div class="">
    <div class="flex items-center justify-between sm:mb-6 mb-4">
      <h3 class="text-2xl font-semibold text-[#141522] leading-[150%] tracking-[-3%]">Monthly Mentors</h3>
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
      :space-between="16" :loop="false" draggable @update:current-index="onSlideChange" class="mentors-carousel">
      <div v-for="mentor in mentors" :key="mentor.id" class="mentor-slide">
        <MentorCard :name="mentor.name" :role="mentor.role" :tasks="mentor.tasks" :rating="mentor.rating"
          :reviews="mentor.reviews" :image="mentor.image" :followed="mentor.followed" />
      </div>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { NCarousel } from 'naive-ui'
import MentorCard from './MentorCard.vue'
import mentor1 from '@/assets/mentor1.png'
import mentor2 from '@/assets/mentor2.png'

interface Mentor {
  id: number
  name: string
  role: string
  tasks: string
  rating: string
  reviews: string
  image: string
  followed: boolean
}

const mentors = ref<Mentor[]>([
  {
    id: 1,
    name: "Curious George",
    role: "UI UX Design",
    tasks: "40 Task",
    rating: "4,7",
    reviews: "750 Reviews",
    image: mentor1,
    followed: false
  },
  {
    id: 2,
    name: "Abraham Lincoln",
    role: "3D Design",
    tasks: "32 Task",
    rating: "4,9",
    reviews: "510 Reviews",
    image: mentor2,
    followed: true
  },
  {
    id: 3,
    name: "Josh Washington",
    role: "Computer graphics",
    tasks: "22 task",
    rating: "4,1",
    reviews: "51 Reviews",
    image: mentor1,
    followed: true
  }
])

const carouselRef = ref<InstanceType<typeof NCarousel> | null>(null)
const currentIndex = ref(0)
const windowWidth = ref(window.innerWidth)

const slidesPerView = computed(() => {
  // sm breakpoint is 640px in Tailwind
  return windowWidth.value < 640 ? 1 : 2
})

const isAtStart = computed(() => currentIndex.value === 0)

const isAtEnd = computed(() => {
  // Calculate if we're at the end: currentIndex + slidesPerView >= total items
  return currentIndex.value >= mentors.value.length - slidesPerView.value
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