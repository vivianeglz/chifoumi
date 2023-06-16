<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'router-link'
    variant?: 'primary' | 'secondary'
  }>(),
  { tag: 'button', variant: 'primary' }
)

const emit = defineEmits(['click'])
</script>

<template>
  <component
    :is="tag"
    :class="`button button--${variant}`"
    data-test="button-primary"
    @click="emit('click')"
  >
    <slot />
  </component>
</template>
