<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { NCarousel } from "naive-ui";
import { useMessage } from "naive-ui";
import MentorCard from "../overview/MentorCard.vue";

interface Mentor {
  id: number;
  name: string;
  role: string;
  tasks: string;
  rating: string;
  reviews: string;
  image: string;
  followed: boolean;
}

const defaultMentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior UI/UX Designer",
    tasks: "24 Tasks",
    rating: "4.8",
    reviews: "120",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    followed: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Developer",
    tasks: "18 Tasks",
    rating: "4.9",
    reviews: "95",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    followed: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Designer",
    tasks: "32 Tasks",
    rating: "4.7",
    reviews: "156",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    followed: false,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Frontend Developer",
    tasks: "15 Tasks",
    rating: "4.9",
    reviews: "88",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    followed: false,
  },
  {
    id: 5,
    name: "Jessica Martinez",
    role: "UX Researcher",
    tasks: "28 Tasks",
    rating: "4.6",
    reviews: "134",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    followed: true,
  },
  {
    id: 6,
    name: "Robert Taylor",
    role: "Backend Developer",
    tasks: "21 Tasks",
    rating: "4.8",
    reviews: "102",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    followed: false,
  },
  {
    id: 7,
    name: "Amanda Wilson",
    role: "Design System Lead",
    tasks: "35 Tasks",
    rating: "5.0",
    reviews: "178",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    followed: true,
  },
  {
    id: 8,
    name: "James Anderson",
    role: "Mobile App Developer",
    tasks: "19 Tasks",
    rating: "4.7",
    reviews: "91",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    followed: false,
  },
  {
    id: 9,
    name: "Lisa Thompson",
    role: "Interaction Designer",
    tasks: "26 Tasks",
    rating: "4.8",
    reviews: "145",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    followed: false,
  },
];

const STORAGE_KEY = "recentMentors";
const message = useMessage();

const loadMentors = (): Mentor[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error parsing mentors from localStorage:", e);
  }
  return defaultMentors;
};

const saveMentors = (mentorsToSave: Mentor[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mentorsToSave));
  } catch (error) {
    console.error("Error saving mentors to localStorage:", error);
  }
};

const mentors = ref<Mentor[]>(loadMentors());

// Watch for changes and save to localStorage
watch(
  mentors,
  (newMentors) => {
    saveMentors(newMentors);
  },
  { deep: true }
);

const handleFollow = (mentorId: number) => {
  const mentor = mentors.value.find((m) => m.id === mentorId);
  if (mentor) {
    mentor.followed = !mentor.followed;
    if (mentor.followed) {
      message.success(`You are following ${mentor.name}`);
    }
    saveMentors(mentors.value);
  }
};

const carouselRef = ref<InstanceType<typeof NCarousel> | null>(null);
const currentIndex = ref(0);
const windowWidth = ref(window.innerWidth);

const slidesPerView = computed(() => {
  if (windowWidth.value < 768) {
    return 1;
  } else if (windowWidth.value < 1024) {
    return 2;
  } else {
    return 3;
  }
});

const isAtStart = computed(() => currentIndex.value === 0);

const isAtEnd = computed(() => {
  return currentIndex.value >= mentors.value.length - slidesPerView.value;
});

const onSlideChange = (index: number) => {
  currentIndex.value = index;
};

const prevSlide = () => {
  if (!isAtStart.value) {
    carouselRef.value?.prev();
  }
};

const nextSlide = () => {
  if (!isAtEnd.value) {
    carouselRef.value?.next();
  }
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  if (!localStorage.getItem(STORAGE_KEY)) {
    saveMentors(defaultMentors);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-[#141522] leading-[150%] tracking-[-3%]">
        Recent Mentors
      </h2>
      <div class="flex gap-2">
        <button @click="prevSlide" :disabled="isAtStart" :class="[
          'w-6 h-6 flex items-center justify-center rounded-lg transition-all',
          isAtStart
            ? 'cursor-not-allowed'
            : 'hover:bg-gray-100 cursor-pointer',
        ]">
          <ChevronLeft :size="24" :class="isAtStart ? 'text-gray-400' : 'text-[#141522]'" />
        </button>
        <button @click="nextSlide" :disabled="isAtEnd" :class="[
          'w-6 h-6 flex items-center justify-center rounded-lg transition-all',
          isAtEnd ? 'cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer',
        ]">
          <ChevronRight :size="24" :class="isAtEnd ? 'text-gray-400' : 'text-[#141522]'" />
        </button>
      </div>
    </div>

    <n-carousel ref="carouselRef" :show-dots="false" :show-arrow="false" :slides-per-view="slidesPerView"
      :space-between="16" :loop="false" @update:current-index="onSlideChange" class="recent-mentors-carousel">
      <div v-for="mentor in mentors" :key="mentor.id" class="mentor-slide">
        <MentorCard :name="mentor.name" :role="mentor.role" :tasks="mentor.tasks" :rating="mentor.rating"
          :reviews="mentor.reviews" :image="mentor.image" :followed="mentor.followed"
          @follow="handleFollow(mentor.id)" />
      </div>
    </n-carousel>
  </div>
</template>

<style scoped>
:deep(.n-carousel__slides) {
  display: flex;
  align-items: stretch;
}

:deep(.n-carousel__slide) {
  height: auto !important;
  display: flex;
  width: 100%;
}

:deep(.mentor-slide) {
  width: 100%;
}
</style>
