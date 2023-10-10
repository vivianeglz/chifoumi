<script setup lang="ts">
import { choiceSlugs } from '@common/constants'
import useRoom from '@client/composables/useRoom'
import ButtonPrimary from '@client/components/globals/buttons/ButtonPrimary.vue'
import { getChoiceIcon } from '@client/helpers'

const { timerLabel, user, updateUserChoice } = useRoom()

const getVariant = (choiceSlug: ChoiceSlug) =>
  user.value?.choiceSlug === choiceSlug ? 'primary' : 'secondary'
</script>

<template>
  <p class="text-body--m font-weight--bold">{{ timerLabel }}</p>
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
