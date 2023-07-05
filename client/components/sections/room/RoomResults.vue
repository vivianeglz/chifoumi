<script setup lang="ts">
import useRoom from '@/composables/useRoom'
import { getChoiceIcon } from '@/helpers'
import { computed } from 'vue'

const { user, winner, opponents } = useRoom()
const userIsWinner = computed((): boolean => user.value?.id === winner.value?.id)
const resultTitle = computed((): string => {
  if (!winner.value) return 'Match nul'
  return userIsWinner.value ? '✨ Gagné ✨' : 'Perdu 😢'
})
</script>

<template>
  <p class="text-body--m font-weight--bold margin--bottom--xl">{{ resultTitle }}</p>
  <div>
    <div class="display-center">
      <div class="display--flex">
        <div v-for="opponent in opponents" :key="opponent.id" class="display-center">
          <FontAwesomeIcon
            :icon="getChoiceIcon(opponent.choiceSlug)"
            class="text-heading margin--xs"
          />
          <p>{{ opponent.id.substring(0, 6) }}</p>
        </div>
      </div>
    </div>
    <div v-if="user" class="display-center margin--s">
      <FontAwesomeIcon
        :icon="getChoiceIcon(user.choiceSlug)"
        class="text-heading color--primary-1"
      />
      <p>{{ user.id.substring(0, 6) }} (Moi)</p>
    </div>
  </div>
</template>
