<script setup lang="ts">
import getRandomId from '@common/helpers/getRandomId'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'
</script>

<template>
  <ButtonPrimary
    tag="router-link"
    :to="{ name: 'room', params: { id: getRandomId() } }"
    data-test="home-actions-button"
  >
    Créer une partie
  </ButtonPrimary>
</template>
