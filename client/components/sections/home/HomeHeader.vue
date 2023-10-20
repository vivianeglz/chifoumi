<script setup lang="ts">
import getRandomId from '@common/helpers/getRandomId'
import UiButton from '@client/components/globals/buttons/UiButton.vue'
import UiLogo from '@client/components/globals/icons/UiLogo.vue'
</script>

<template>
  <header class="display-center padding--m">
    <UiLogo size="m" />
    <h1 class="text-heading margin--top--l margin--bottom--l">Chifoumi</h1>
    <UiButton
      tag="router-link"
      :to="{ name: 'room', params: { id: getRandomId() } }"
      data-test="home-actions-button"
    >
      Créer une partie
    </UiButton>
  </header>
</template>
