<script setup lang="ts">
import RunningTaskCard from "@/components/pages/overview/RunningTaskCard.vue";
import ActivityChart from "@/components/pages/overview/ActivityChart.vue";
import MentorsSection from "@/components/pages/overview/MentorsSection.vue";
import UpcomingTasks from "@/components/pages/overview/UpcomingTasks.vue";
</script>

<template>
  <div class="overview-page">
    <div class="flex md:hidden flex-col gap-2 mb-4">
      <h1
        class="text-2xl font-semibold leading-[150%] tracking-[-3%] text-[#141522]"
      >
        Hi, Dennis Nzioki
      </h1>
      <p class="text-[#54577A] text-base tracking-[-2%] leading-[150%]">
        Let's finish your task today!
      </p>
    </div>

    <div class="grid grid-cols-12 gap-6 mb-8 items-stretch">
      <div class="2xl:col-span-3 xl:col-span-4 sm:col-span-5 col-span-12">
        <RunningTaskCard />
      </div>
      <div class="2xl:col-span-9 xl:col-span-8 sm:col-span-7 col-span-12">
        <ActivityChart />
      </div>
    </div>

    <div class="mb-8">
      <MentorsSection />
    </div>

    <div>
      <UpcomingTasks />
    </div>
  </div>
</template>

<style scoped></style>
