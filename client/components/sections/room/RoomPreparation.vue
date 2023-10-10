<script setup lang="ts">
import { computed } from 'vue'
import useRoom from '@client/composables/useRoom'
import ButtonPrimary from '@client/components/globals/buttons/ButtonPrimary.vue'
import InputText from '@client/components/globals/inputs/InputText.vue'

const { startRound, updateUser, userName, isRoundReady, user } = useRoom()

const isReadyDisabled = computed((): boolean => !userName.value)

const onReady = () => {
  updateUser({ name: userName.value, isReady: true })
}
</script>

<template>
  <ButtonPrimary v-if="isRoundReady" @click="startRound"> Jouer ! </ButtonPrimary>
  <template v-if="!isRoundReady">
    <template v-if="user?.isReady">
      <p>En attente des autres joueurs...</p>
    </template>
    <template v-else>
      <InputText v-model="userName" name="name" label="Pseudo" class="margin--bottom--m" />
      <ButtonPrimary :disabled="isReadyDisabled" variant="secondary" @click="onReady">
        Je suis prêt
      </ButtonPrimary>
    </template>
  </template>
</template>
