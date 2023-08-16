<template>
  <label class="mb-2" :for="name">{{ placeholder }}</label>
  <Field
    :class="{ invalid: errorMessage }"
    class="pl-2 text-base shadow-1"
    type="text"
    style="font-family: Cabin, Arial, Helvetica, sans-serif"
    :placeholder="placeholder"
    :value="providedText"
    :name="name"
    v-model="value"
    aria-describedby="text-help"
    rules="required"
  />
  <small id="text-help" class="text-red-600">{{ errorMessage }}</small>
</template>

<script setup lang="ts">
import { useField, Field } from 'vee-validate'
import { toRef } from 'vue'

const props = defineProps<{
  placeholder: string
  providedText?: string
  name: string
}>()

const { errorMessage, value } = useField(toRef(props, 'name'))

if (props.providedText) {
  value.value = JSON.parse(JSON.stringify(props.providedText))
}
</script>

<style scoped>
input {
  border: 2px solid transparent;
  padding: 7px;
  outline: none;
  width: 100%;
  transition:
    border-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
}
.invalid {
  border-color: var(--red-300);
  color: var(--red-600);
}
</style>
