<script setup lang="ts">
import { computed } from 'vue'
import useRoom from '@/composables/useRoom'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'

const { startRound, room, isRoundEnd } = useRoom()

const buttonTitle = computed(() => (isRoundEnd.value ? 'Rejouer' : 'Jouer !'))
const buttonIsDisabled = computed(() => room.value.users.length <= 1)
</script>

<template>
  <ButtonPrimary @click="startRound" :disabled="buttonIsDisabled">
    {{ buttonTitle }}
  </ButtonPrimary>
</template>
