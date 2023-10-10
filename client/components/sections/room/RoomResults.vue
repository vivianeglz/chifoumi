<script setup lang="ts">
import { type User } from '@common/types/index.d'
import ButtonPrimary from '@client/components/globals/buttons/ButtonPrimary.vue'
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
  <p class="text-body--m font-weight--bold margin--bottom--xl">{{ resultTitle }}</p>
  <div>
    <div class="display-center">
      <div class="display--flex">
        <div v-for="opponent in opponents" :key="opponent.id" class="display-center margin--s">
          <FontAwesomeIcon
            :icon="getChoiceIcon(opponent.choiceSlug)"
            class="text-heading margin--xs"
          />
          <p>{{ getUserName(opponent) }}</p>
        </div>
      </div>
    </div>
    <div v-if="user" class="display-center margin--s">
      <FontAwesomeIcon
        :icon="getChoiceIcon(user.choiceSlug)"
        class="text-heading color--primary-1"
      />
      <p>{{ getUserName(user) }} (Moi)</p>
    </div>
  </div>
  <ButtonPrimary @click="startRound"> Rejouer </ButtonPrimary>
</template>
