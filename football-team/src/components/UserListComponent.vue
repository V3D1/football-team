<template>
  <DataTable
    :value="userList"
    :filters="filters"
    stripedRows
    tableStyle="min-width: 20rem; border-radius: 2rem;"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
    column-resize-mode="fit"
    responsive-layout="scroll"
    breakpoint="800px"
    class="shadow-1"
    :global-filter-fields="['global', 'fullName']"
  >
    <template #header>
      <div class="flex justify-content-between flex-row flex-wrap gap-4">
        <span class="p-input-icon-right">
          <InputText v-model="filters['global'].value" placeholder="Search for users..." />
          <i class="pi pi-search" />
        </span>
        <div>
          <Button
            label="Add user"
            icon="pi pi-plus"
            severity="success"
            rounded
            @click="goToAddUser"
          />
        </div>
      </div>
    </template>
    <template #empty> Nie znaleziono danych. </template>
    <template #loading> Ładowanie danych. Proszę czekać. </template>
    <Column field="avatar" header-style="width: 10%; background-color: #fff;">
      <template #body="{ data }">
        <Avatar :image="data.avatar" class="mr-2" size="large" shape="circle" />
      </template>
    </Column>
    <Column
      field="fullName"
      sortable
      header="Full Name"
      header-style="width: 75%; background-color: #fff;"
    >
      <template #body="{ data }">
        <div class="">{{ data.fullName }}</div>
      </template>
    </Column>
    <Column field="action" header="Action" header-style="width: 15%; background-color: #fff;">
      <template #body="{ data }">
        <Button
          icon="pi pi-file-edit"
          severity="secondary"
          text
          rounded
          aria-label="Edit user"
          @click="editUser(data.id)"
        />
        <Button
          icon="pi pi-trash"
          severity="secondary"
          text
          rounded
          aria-label="Delete user"
          @click="deleteUser(data.id)"
        />
      </template>
    </Column>
  </DataTable>
  <Paginator
    :rows="pageData.per_page"
    :totalRecords="pageData.total"
    @page="changePage"
  ></Paginator>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import { FilterMatchMode } from 'primevue/api'
import Column from 'primevue/column'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import router from '@/router'
import type singleUserType from '@/types/singleUserType'
import type pageDetailsType from '@/types/pageDetailsType'

defineProps<{
  userList: Array<singleUserType>
  pageData: pageDetailsType
}>()

const emit = defineEmits<{
  (e: 'changePage', values: object): void
  (e: 'deleteUser', id: number): void
}>()

const goToAddUser = async () => {
  await router.push({ name: 'add user' })
}

const editUser = async (id: number) => {
  await router.push({ name: 'edit user', query: { id: id } })
}

const deleteUser = (id: number) => {
  emit('deleteUser', id)
}

const changePage = (pageDetails: any) => {
  pageDetails.page += 1
  emit('changePage', pageDetails)
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
</script>

<style scoped lang="scss">
::v-deep(.p-datatable-header) {
  background-color: #fff;
}
::v-deep(.p-inputtext) {
  background-color: #f7f7f7;
  border: none;
}
::v-deep(.p-paginator) {
  display: flex;
  justify-content: start;
  background-color: #eee;
  .p-paginator-pages .p-highlight {
    background-color: #689f38;
    color: #fff;
  }
}
</style>
