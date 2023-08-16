<template>
  <div class="md:p-5">
    <RouterView />
  </div>
  <Toast position="bottom-right" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
</script>

<style scoped></style>
