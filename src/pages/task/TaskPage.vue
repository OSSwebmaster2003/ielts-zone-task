<template>
  <PageHeader>Task</PageHeader>
  <section class="mb-8">
    <TimeLimitSection />
  </section>
  <section>
    <NewTaskSection />
  </section>
</template>

<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import TimeLimitSection from '@/components/pages/tasks/TimeLimitSection.vue'
import NewTaskSection from '@/components/pages/tasks/NewTaskSection.vue'
</script>