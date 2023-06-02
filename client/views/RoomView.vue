<script setup lang="ts">
import useRoom from '@/composables/useRoom'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'

const { room, setRoom, startRound } = useRoom()

setRoom()
</script>

<template>
  <div class="fullscreen-height">
    <header class="header-room">
      <h1 class="text-body--m margin--null">
        <router-link :to="{ name: 'home' }">Chifoumi</router-link>
      </h1>
      <p class="text-body--s margin--null">
        Utilisateurs en ligne: <strong>{{ room.totalUsers }}</strong>
      </p>
    </header>
    <main class="display-center full-height">
      <p v-if="room.isRoundRunning">C'est parti !</p>
      <ButtonPrimary v-else @click="startRound">Jouer !</ButtonPrimary>
    </main>
  </div>
</template>
