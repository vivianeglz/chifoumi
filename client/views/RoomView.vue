<script setup lang="ts">
import useRoom from '@client/composables/useRoom'
import RoomHeader from '@client/components/sections/room/RoomHeader.vue'
import RoomChoiceButtons from '@client/components/sections/room/RoomChoiceButtons.vue'
import RoomResults from '@client/components/sections/room/RoomResults.vue'
import RoomPreparation from '@client/components/sections/room/RoomPreparation.vue'

const { setRoom, isRoundEnd, isRoundRunning } = useRoom()

setRoom()
</script>

<template>
  <div class="fullscreen-height">
    <RoomHeader />
    <div class="display-center full-height">
      <RoomResults v-if="isRoundEnd" />
      <RoomChoiceButtons v-if="isRoundRunning" />
      <RoomPreparation v-if="!isRoundEnd && !isRoundRunning" class="margin--top--xl" />
    </div>
  </div>
</template>
