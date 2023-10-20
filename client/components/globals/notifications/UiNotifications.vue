<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'success' | 'error'
    message?: string
  }>(),
  { type: 'success' }
)

const icon = computed((): string => (props.type === 'success' ? '✅' : '⛔️'))
</script>

<template>
  <div class="notification" data-test="ui-notification">
    <p class="margin--xs">
      <span>{{ icon }}</span>
      {{ message }}
    </p>
  </div>
</template>
