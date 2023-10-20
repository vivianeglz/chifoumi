<script setup lang="ts">
import { computed } from 'vue'
import { type ChoiceSlug } from '@common/types/index.d'
import UiButton from '@client/components/globals/buttons/UiButton.vue'
import { getChoiceIcon } from '@client/helpers'

const props = withDefaults(
  defineProps<{
    choiceSlug: ChoiceSlug
    size?: 's' | 'm'
    selected?: boolean
    disabled?: boolean
  }>(),
  { size: 'm', selected: false, disabled: false }
)

const className = computed(() => {
  const selectedClassName = props.selected ? 'choice-button--selected' : ''
  switch (props.choiceSlug) {
    case 'leaf':
      return [selectedClassName, `choice-button--${props.size}`, 'background--secondary-1']
    case 'rock':
      return [selectedClassName, `choice-button--${props.size}`, 'background--secondary-3']
    case 'scissors':
      return [selectedClassName, `choice-button--${props.size}`, 'background--secondary-2']
    default:
      return [selectedClassName, `choice-button--${props.size}`]
  }
})
const icon = computed(() => getChoiceIcon(props.choiceSlug))
</script>

<template>
  <div v-if="disabled" :class="className" class="color--neutral-100 button choice-button">
    <FontAwesomeIcon :icon="icon" />
  </div>
  <UiButton v-else :class="className" class="choice-button">
    <FontAwesomeIcon :icon="icon" />
  </UiButton>
</template>
