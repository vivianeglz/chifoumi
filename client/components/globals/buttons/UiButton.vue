<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'router-link'
    variant?: 'primary' | 'secondary' | 'discrete'
  }>(),
  { tag: 'button', variant: 'primary' }
)

const emit = defineEmits(['click'])
</script>

<template>
  <component
    :is="tag"
    :class="`button button--${variant}`"
    data-test="ui-button"
    @click="emit('click')"
  >
    <slot />
  </component>
</template>
