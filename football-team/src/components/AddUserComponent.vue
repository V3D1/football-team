<template>
  <Form @submit="submitForm" :validation-schema="schema">
    <div class="flex w-12 h-18rem gap-4">
      <div class="flex align-content-between flex-wrap w-10 bg-white p-5 shadow-1">
        <div class="flex w-12 mt-4">
          <div class="flex flex-column w-12 mx-2">
            <InputFieldComponent name="firstName" placeholder="First Name" />
          </div>
          <div class="flex flex-column w-12 mx-2">
            <InputFieldComponent name="lastName" placeholder="Last Name" />
          </div>
        </div>
        <Button severity="success" class="w-3" label="Add new user" type="submit" />
      </div>
      <div
        class="w-4 h-full p-5 bg-white shadow-1 flex flex-column align-items-center justify-content-between"
      >
        <div class="flex h-full justify-content-center align-items-center">
          <img
            style="width: 100px; height: 100px"
            class="border-circle shadow-1"
            src="../assets/defaultAvatar.jpg"
            alt="Image with default avatar by studiogstock on Freepik"
          />
        </div>
        <FileUpload
          class="w-full bg-white border-900 text-900"
          mode="basic"
          accept="image/*"
          chooseLabel="Add Photo"
          uploadIcon="pi pi-camera"
          :maxFileSize="1000000"
          customUpload
          @upload="onUpload"
        />
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import * as yup from 'yup'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import InputFieldComponent from './InputFieldComponent.vue'

const onUpload = (value) => {
  console.log(value)
}

const schema = yup.object({
  firstName: yup.string().min(3).max(20).required(),
  lastName: yup.string().min(3).max(20).required()
})

const submitForm = (values: any) => {
  console.log(values)
}
</script>

<style scoped>
::v-deep(.p-fileupload) {
  width: 100%;
}
</style>
