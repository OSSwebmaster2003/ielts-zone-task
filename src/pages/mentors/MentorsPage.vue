<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import RecentMentors from "@/components/pages/mentors/RecentMentors.vue";
import AllMentors from "@/components/pages/mentors/AllMentors.vue";
</script>

<template>
  <PageHeader>Explore Mentors</PageHeader>
  <div class="flex flex-col gap-8">
    <RecentMentors />
    <AllMentors />
  </div>
</template>

<style scoped></style>
