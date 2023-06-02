<script setup lang="ts">
import useRoom from '@/composables/useRoom'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'

const { room, startRound } = useRoom()
</script>

<template>
  <div class="display-center full-height">
    <p v-if="room.isRoundRunning">C'est parti !</p>
    <ButtonPrimary v-else @click="startRound">Jouer !</ButtonPrimary>
  </div>
</template>
