<script setup lang="ts">
import { type User } from '@common/types/index.d'
import UiChoiceButton from '@client/components/globals/buttons/UiChoiceButton.vue'
import UiButton from '@client/components/globals/buttons/UiButton.vue'
import UiTile from '@client/components/globals/tile/UiTile.vue'
import useRoom from '@client/composables/useRoom'
import { getChoiceIcon } from '@client/helpers'
import { computed } from 'vue'

const { user, winner, opponents, startRound } = useRoom()

const userIsWinner = computed((): boolean => user.value?.id === winner.value?.id)
const resultTitle = computed((): string => {
  if (!winner.value) return 'Match nul'
  return userIsWinner.value ? '✨ Gagné ✨' : 'Perdu 😢'
})

const getUserName = (user: User): string => user.id.substring(0, 6)
</script>

<template>
  <div class="display-center">
    <UiTile class="display-center padding--left--xl padding--right--xl">
      <p class="text-body--m font-weight--bold margin--bottom--l">
        {{ resultTitle }}
      </p>
      <div>
        <div class="display--flex">
          <div v-for="opponent in opponents" :key="opponent.id">
            <UiChoiceButton
              :choice-slug="opponent.choiceSlug"
              disabled
              size="s"
              class="margin--left--s margin--right--s"
            />
            <p>{{ getUserName(opponent) }}</p>
          </div>
        </div>
      </div>
      <div v-if="user" class="display-center">
        <UiChoiceButton
          :choice-slug="user.choiceSlug"
          disabled
          selected
          size="s"
          class="margin--s"
        />
        <p>{{ getUserName(user) }} (Moi)</p>
      </div>
    </UiTile>
    <UiButton @click="startRound" variant="secondary" class="margin--top--m"> Rejouer </UiButton>
  </div>
</template>
