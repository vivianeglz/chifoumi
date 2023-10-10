<script setup lang="ts">
import getRandomId from '@common/helpers/getRandomId'

withDefaults(
  defineProps<{
    label?: string
    modelValue: string
    name: string
  }>(),
  {
    label: '',
    modelValue: '',
    name: getRandomId()
  }
)

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="input-container">
    <label v-if="label" :for="name" class="input-container__label">{{ label }}</label>
    <input
      :value="modelValue"
      :name="name"
      type="text"
      autocomplete="off"
      @input="onInput"
      @keypress.enter.prevent
      class="input-container__input"
    />
  </div>
</template>
