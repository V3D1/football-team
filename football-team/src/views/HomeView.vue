<template>
  <div class="md:p-3">
    <h1>User list</h1>
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

const userStore = useUserStore()

const userList = computed(() => userStore.getUserList)
const pageData = computed(() => userStore.getPageData)

const fetchUsers = (pageDetails: any) => {
  if (pageDetails.page) {
    pageDetails = pageDetails.page
  }
  userStore.fetchUserList(pageDetails)
}

const deleteUser = (id: number) => {
  userStore.deleteUser(id)
}

onMounted(() => {
  fetchUsers(1)
})
</script>

<style scoped></style>
