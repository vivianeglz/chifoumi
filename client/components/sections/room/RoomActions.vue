<script setup lang="ts">
import { choiceSlugs } from '@common/constants'
import useRoom from '@/composables/useRoom'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'
import { getChoiceIcon } from '@/helpers'

const { room, timerLabel, userChoiceSlug, startRound, updateUserChoice } = useRoom()

const getVariant = (choiceSlug: string) =>
  userChoiceSlug.value === choiceSlug ? 'primary' : 'secondary'
</script>

<template>
  <div class="display-center full-height">
    <template v-if="room.isRoundRunning">
      <p>{{ timerLabel }}</p>
      <div class="display-flex">
        <ButtonPrimary
          v-for="choiceSlug in choiceSlugs"
          :key="choiceSlug"
          :variant="getVariant(choiceSlug)"
          @click="updateUserChoice(choiceSlug)"
          class="margin--left--s margin--right--s"
        >
          <FontAwesomeIcon :icon="getChoiceIcon(choiceSlug)" />
        </ButtonPrimary>
      </div>
    </template>
    <ButtonPrimary v-else @click="startRound">Jouer !</ButtonPrimary>
  </div>
</template>
