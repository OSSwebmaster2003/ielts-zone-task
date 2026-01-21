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
      <div class="col-span-3">
        <RunningTaskCard />
      </div>
      <div class="col-span-9">
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

<style scoped>

</style>
