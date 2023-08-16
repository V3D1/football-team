<template>
  <div class="md:p-3">
    <h1 class="font-medium">User list</h1>
    <UserListComponent
      :userList="userList"
      :pageData="pageData"
      @changePage="fetchUsers"
      @deleteUser="deleteUser"
    />
  </div>
</template>

<script setup lang="ts">
import UserListComponent from '@/components/UserListComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const toast = useToast()
const userList = computed(() => userStore.getUserList)
const pageData = computed(() => userStore.getPageData)

const fetchUsers = (pageDetails: any) => {
  if (pageDetails.page) {
    pageDetails = pageDetails.page
  }
  userStore.fetchUserList(pageDetails)
}

const deleteUser = async (id: number) => {
  const answer = window.confirm('Are you sure you want to delete this user?')
  if (!answer) return false
  await userStore.deleteUser(id)
  toast.add({
    severity: 'success',
    summary: 'Delete user',
    detail: 'User deleted successfully',
    life: 3000
  })
}

onMounted(() => {
  fetchUsers(1)
})
</script>

<style scoped></style>
