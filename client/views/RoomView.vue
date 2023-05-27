<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = computed(() => route.params.id)
</script>

<template>
  <header>
    <h1 class="text-heading">Room {{ roomId }}</h1>
  </header>
  <main></main>
</template>
