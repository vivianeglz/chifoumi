<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'router-link'
  }>(),
  { tag: 'button' }
)
</script>

<template>
  <component :is="tag" data-test="button-primary" class="button button--primary">
    <slot />
  </component>
</template>
