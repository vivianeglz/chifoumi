<script setup lang="ts">
import { choiceSlugs } from '@common/constants'
import useRoom from '@client/composables/useRoom'
import UiChoiceButton from '@client/components/globals/buttons/UiChoiceButton.vue'

const { timerLabel, user, updateUser } = useRoom()
</script>

<template>
  <div class="choice-buttons display-center">
    <p class="text-body--m font-weight--bold margin--bottom--l">
      {{ timerLabel }}
    </p>
    <div class="choice-buttons__container">
      <div
        v-for="choiceSlug in choiceSlugs"
        :key="choiceSlug"
        class="choice-buttons__container__item"
      >
        <UiChoiceButton
          :choice-slug="choiceSlug"
          :selected="user?.choiceSlug === choiceSlug"
          @click="updateUser({ choiceSlug })"
        />
      </div>
    </div>
  </div>
</template>
