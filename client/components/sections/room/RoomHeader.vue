<script setup lang="ts">
import useRoom from '@client/composables/useRoom'

const { room } = useRoom()
</script>

<template>
  <header class="header-room">
    <h1 class="text-body--m margin--null">
      <router-link :to="{ name: 'home' }">Chifoumi</router-link>
    </h1>
    <p class="text-body--s margin--null">
      Utilisateurs en ligne: <strong>{{ room.users.length }}</strong>
    </p>
  </header>
</template>
