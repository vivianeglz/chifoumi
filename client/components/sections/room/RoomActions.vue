<script setup lang="ts">
import useRoom from '@/composables/useRoom'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'

const { room, timerLabel, userChoiceSlug, startRound, updateUserChoice } = useRoom()
</script>

<template>
  <div class="display-center full-height">
    <template v-if="room.isRoundRunning">
      <p>{{ timerLabel }}</p>
      <div class="display-flex">
        <ButtonPrimary
          :variant="userChoiceSlug === 'rock' ? 'primary' : 'secondary'"
          @click="updateUserChoice('rock')"
          class="margin--left--s margin--right--s"
        >
          <FontAwesomeIcon icon="fa-solid fa-hand-back-fist" />
        </ButtonPrimary>
        <ButtonPrimary
          :variant="userChoiceSlug === 'leaf' ? 'primary' : 'secondary'"
          @click="updateUserChoice('leaf')"
          class="margin--left--s margin--right--s"
        >
          <FontAwesomeIcon icon="fa-solid fa-hand" />
        </ButtonPrimary>
        <ButtonPrimary
          :variant="userChoiceSlug === 'scissors' ? 'primary' : 'secondary'"
          @click="updateUserChoice('scissors')"
          class="margin--left--s margin--right--s"
        >
          <FontAwesomeIcon icon="fa-solid fa-hand-scissors" />
        </ButtonPrimary>
      </div>
    </template>
    <ButtonPrimary v-else @click="startRound">Jouer !</ButtonPrimary>
  </div>
</template>
