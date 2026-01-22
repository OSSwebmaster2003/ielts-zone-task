<script setup lang="ts">
import MentorCardWithDescriptions from "./MentorCardWithDescriptions.vue";

interface Mentor {
  id: number;
  name: string;
  role: string;
  tasks: string;
  rating: string;
  reviews: string;
  image: string;
  followed: boolean;
  description: string;
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
    description:
      "Experienced designer with 8+ years creating intuitive user interfaces. Specializes in mobile app design and design systems.",
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
    description:
      "Full stack expert passionate about building scalable web applications. Proficient in React, Node.js, and cloud technologies.",
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
    description:
      "Product designer focused on user-centered design and creating meaningful digital experiences that solve real problems.",
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
    description:
      "Frontend specialist with expertise in modern JavaScript frameworks. Creates performant and accessible web applications.",
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
    description:
      "UX researcher dedicated to understanding user behavior and translating insights into actionable design recommendations.",
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
    description:
      "Backend engineer specializing in API development, database design, and building robust server-side architectures.",
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
    description:
      "Design system expert who creates cohesive design languages and component libraries for scalable product teams.",
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
    description:
      "Mobile developer with expertise in iOS and Android development. Creates native and cross-platform mobile applications.",
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
    description:
      "Interaction designer focused on creating delightful and intuitive user experiences through thoughtful micro-interactions.",
  },
];
</script>

<template>
  <div class="flex items-center justify-between">
    <h2
      class="text-2xl font-semibold text-[#141522] leading-[150%] tracking-[-3%]"
    >
      Mentors
    </h2>
  </div>

  <div
    class="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 items-stretch"
  >
    <div
      v-for="mentor in defaultMentors"
      :key="mentor.id"
      class="w-full h-full"
    >
      <MentorCardWithDescriptions
        :name="mentor.name"
        :role="mentor.role"
        :tasks="mentor.tasks"
        :rating="mentor.rating"
        :reviews="mentor.reviews"
        :image="mentor.image"
        :followed="mentor.followed"
        :description="mentor.description"
      />
    </div>
  </div>
</template>

<style scoped></style>
