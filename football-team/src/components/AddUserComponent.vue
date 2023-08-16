<template>
  <Form @submit="submitForm" :validation-schema="schema">
    <div class="flex w-12 h-23rem gap-4 flex-wrap">
      <div class="flex align-content-between flex-wrap md:w-7 bg-white p-5 shadow-1 gap-4">
        <div class="flex w-12 mt-4 gap-4">
          <div class="flex flex-column w-12">
            <InputFieldComponent name="first_name" placeholder="First Name" />
          </div>
          <div class="flex flex-column w-12">
            <InputFieldComponent name="last_name" placeholder="Last Name" />
          </div>
        </div>
        <Button severity="success" class="lg:w-3 w-12 ml-2" label="Add new user" type="submit" />
      </div>
      <div
        class="md:w-4 w-12 h-full p-5 bg-white shadow-1 flex flex-column align-items-center justify-content-between"
      >
        <div class="flex h-full justify-content-center align-items-center">
          <img
            v-if="!fileMessage.attachmentName"
            style="width: 100px; height: 100px"
            class="border-circle shadow-1"
            src="../assets/defaultAvatar.jpg"
            alt="User avatar"
          />
          <div v-else class="flex flex-column justify-content-center align-items-center mb-5">
            <div class="flex w-full justify-content-end">
              <Button
                icon="pi pi-times"
                severity="danger"
                text
                rounded
                aria-label="Cancel"
                @click="deleteFile"
              />
            </div>
            <img
              style="width: 100px; height: 100px"
              class="border-circle shadow-1"
              :src="fileMessage.url"
              alt="Image with default avatar by studiogstock on Freepik"
            />
            <span class="word-wrap my-4"> Name: {{ fileMessage.attachmentName }} </span>
          </div>
        </div>
        <FileUpload
          class="w-full bg-white border-900 text-900"
          mode="basic"
          invalidFileSizeMessage="{0}: Invalid file size, file cannot exceed {1}"
          invalidFileTypeMessage="{0}: Invalid file type, allowed: {1}."
          invalidFileLimitMessage="Exceeded maximum file limit."
          accept="image/*"
          chooseLabel="Add Photo"
          uploadIcon="pi pi-camera"
          :disabled="fileMessage.url ? true : false"
          :auto="true"
          :maxFileSize="1000000"
          :customUpload="true"
          @uploader="customUpload"
        />
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { reactive } from 'vue'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'
import InputFieldComponent from './InputFieldComponent.vue'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

interface fileData {
  attachment: File | null
  attachmentName: string
  size: number
  url: string
  fileUploadKey: string
}

const initialData = {
  attachment: null,
  attachmentName: '',
  size: 0,
  url: '',
  fileUploadKey: uuidv4()
}

const userStore = useUserStore()
const toast = useToast()
const fileMessage: fileData = reactive({ ...initialData })

const customUpload = (event: any) => {
  const file = event.files[0]
  fileMessage.attachment = file
  fileMessage.size = file.size
  fileMessage.attachmentName = file.name
  fileMessage.url = URL.createObjectURL(file)
}

const deleteFile = () => {
  fileMessage.attachment = initialData.attachment
  fileMessage.size = initialData.size
  fileMessage.attachmentName = initialData.attachmentName
  fileMessage.url = initialData.url
}

const schema = yup.object({
  first_name: yup.string().min(3).max(20).required(),
  last_name: yup.string().min(3).max(20).required()
})

const submitForm = async (values: any) => {
  fileMessage.url
    ? (values.avatar = fileMessage.url)
    : (values.avatar = 'src/assets/defaultAvatar.jpg')
  values.id = 99
  await router.push({ name: 'home' })
  await userStore.postNewUser(values)
  toast.add({
    severity: 'success',
    summary: 'Add user',
    detail: 'User added successfully',
    life: 3000
  })
}
</script>

<style scoped>
::v-deep(.p-fileupload) {
  width: 100%;
}
</style>
