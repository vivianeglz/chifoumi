<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useSocket from '@/composables/useSocket'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'

const route = useRoute()
const { joinRoom, totalUsers } = useSocket()

const roomId = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
)

joinRoom(roomId.value)
</script>

<template>
  <div class="fullscreen-height">
    <header class="header-room">
      <h1 class="text-body--m margin--null">
        <router-link :to="{ name: 'home' }">Chifoumi</router-link>
      </h1>
      <p class="text-body--s margin--null">
        Utilisateurs en ligne: <strong>{{ totalUsers }}</strong>
      </p>
    </header>
    <main class="display-center full-height">
      <ButtonPrimary>Jouer !</ButtonPrimary>
    </main>
  </div>
</template>
