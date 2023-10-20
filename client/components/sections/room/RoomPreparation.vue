<script setup lang="ts">
import { computed } from 'vue'
import useRoom from '@client/composables/useRoom'
import UiButton from '@client/components/globals/buttons/UiButton.vue'
import UiInput from '@client/components/globals/inputs/UiInput.vue'
import UiLoader from '@client/components/globals/icons/UiLoader.vue'

const { startRound, updateUser, userName, isRoundReady, user } = useRoom()

const isReadyDisabled = computed((): boolean => !userName.value)

const onReady = () => {
  updateUser({ name: userName.value, isReady: true })
}
</script>

<template>
  <div class="display-center">
    <UiButton v-if="isRoundReady" @click="startRound" variant="secondary"> Jouer ! </UiButton>
    <template v-if="!isRoundReady">
      <template v-if="user?.isReady">
        <UiLoader />
        <p class="margin--top--m margin--bottom--null">En attente des autres joueurs...</p>
      </template>
      <template v-else>
        <UiInput v-model="userName" name="name" label="Pseudo" class="margin--bottom--m" />
        <UiButton :disabled="isReadyDisabled" @click="onReady"> Je suis prêt </UiButton>
      </template>
    </template>
  </div>
</template>
