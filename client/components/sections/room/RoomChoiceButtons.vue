<script setup lang="ts">
import { choiceSlugs } from '@common/constants'
import { type ChoiceSlug } from '@common/types/index.d'
import useRoom from '@client/composables/useRoom'
import UiButton from '@client/components/globals/buttons/UiButton.vue'
import { getChoiceIcon } from '@client/helpers'

const { timerLabel, user, updateUser } = useRoom()

const getVariant = (choiceSlug: ChoiceSlug) =>
  user.value?.choiceSlug === choiceSlug ? 'secondary' : 'primary'
</script>

<template>
  <p class="text-body--m font-weight--bold color--neutral-00">{{ timerLabel }}</p>
  <div class="display--flex">
    <UiButton
      v-for="choiceSlug in choiceSlugs"
      :key="choiceSlug"
      :variant="getVariant(choiceSlug)"
      @click="updateUser({ choiceSlug })"
      class="margin--left--s margin--right--s text-body--m"
    >
      <FontAwesomeIcon :icon="getChoiceIcon(choiceSlug)" />
    </UiButton>
  </div>
</template>
