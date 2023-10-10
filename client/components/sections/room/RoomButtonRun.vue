<script setup lang="ts">
import { computed } from 'vue'
import useRoom from '@client/composables/useRoom'
import ButtonPrimary from '@client/components/globals/buttons/ButtonPrimary.vue'

const { startRound, room, isRoundEnd } = useRoom()

const buttonTitle = computed((): string => (isRoundEnd.value ? 'Rejouer' : 'Jouer !'))
const buttonIsDisabled = computed((): boolean => room.value.users.length <= 1)
</script>

<template>
  <ButtonPrimary @click="startRound" :disabled="buttonIsDisabled">
    {{ buttonTitle }}
  </ButtonPrimary>
</template>
