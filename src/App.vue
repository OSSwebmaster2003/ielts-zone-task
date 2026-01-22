<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
</script>

<template>
  <NMessageProvider placement="top-right">
    <router-view />
  </NMessageProvider>
</template>

<style scoped></style>
