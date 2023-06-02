<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'router-link'
  }>(),
  { tag: 'button' }
)

const emit = defineEmits(['click'])
</script>

<template>
  <component
    :is="tag"
    data-test="button-primary"
    class="button button--primary"
    @click="emit('click')"
  >
    <slot />
  </component>
</template>
