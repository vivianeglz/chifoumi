<script setup lang="ts">
import { choiceSlugs } from '@common/constants'
import { getChoiceIcon } from '@/helpers'
</script>

<template>
  <header class="display-center">
    <div class="display-flex color--primary-1">
      <FontAwesomeIcon
        v-for="choiceSlug in choiceSlugs"
        :key="choiceSlug"
        :icon="getChoiceIcon(choiceSlug)"
        class="margin--left--s margin--right--s"
      />
    </div>
    <h1 class="text-heading margin--top--l margin--bottom--l">Chifoumi</h1>
  </header>
</template>
