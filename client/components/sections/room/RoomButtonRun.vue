<script setup lang="ts">
import { computed } from 'vue'
import useRoom from '@client/composables/useRoom'
import ButtonPrimary from '@client/components/globals/buttons/ButtonPrimary.vue'

const { startRound, updateUserReadyStatus, room, isRoundEnd, isRoundReady, user } = useRoom()

const buttonTitle = computed((): string => (isRoundEnd.value ? 'Rejouer' : 'Jouer !'))
const buttonIsDisabled = computed((): boolean => room.value.users.length <= 1)
</script>

<template>
  <ButtonPrimary v-if="isRoundReady" @click="startRound" :disabled="buttonIsDisabled">
    {{ buttonTitle }}
  </ButtonPrimary>
  <template v-else>
    <p v-if="user?.isReady">En attente des autres joueurs...</p>
    <ButtonPrimary v-else variant="secondary" @click="updateUserReadyStatus">
      Je suis prêt
    </ButtonPrimary>
  </template>
</template>
