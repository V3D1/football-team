<template>
  <div class="p-3">
    <h1 class="font-medium">Edit User</h1>
    <EditUserComponent :id="id" />
  </div>
</template>

<script setup lang="ts">
import EditUserComponent from '@/components/EditUserComponent.vue'

defineProps<{
  id: string
}>()
</script>

<style scoped></style>
