<script setup lang="ts">
import RunningTaskCard from '@/components/pages/overview/RunningTaskCard.vue'
import ActivityChart from '@/components/pages/overview/ActivityChart.vue'
import MentorsSection from '@/components/pages/overview/MentorsSection.vue'
import UpcomingTasks from '@/components/pages/overview/UpcomingTasks.vue'
</script>

<template>
  <div class="overview-page">
    <!-- Top Section: Running Task and Activity Chart -->
    <div class="grid grid-cols-12 gap-6 mb-8">
      <div class="2xl:col-span-3 xl:col-span-4 col-span-5">
        <RunningTaskCard />
      </div>
      <div class="2xl:col-span-9 xl:col-span-8 col-span-7">
        <ActivityChart />
      </div>
    </div>

    <!-- Monthly Mentors Section -->
    <div class="mb-8">
      <MentorsSection />
    </div>

    <!-- Upcoming Tasks Section -->
    <div>
      <UpcomingTasks />
    </div>
  </div>
</template>

<style scoped></style>
