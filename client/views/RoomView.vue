<script setup lang="ts">
import useRoom from '@client/composables/useRoom'
import RoomHeader from '@client/components/sections/room/RoomHeader.vue'
import RoomChoiceButtons from '@client/components/sections/room/RoomChoiceButtons.vue'
import RoomResults from '@client/components/sections/room/RoomResults.vue'
import RoomPreparation from '@client/components/sections/room/RoomPreparation.vue'

const { setRoom, isRoundEnd, isRoundRunning, isRoundInPreparation } = useRoom()

setRoom()
</script>

<template>
  <div class="fullscreen-height">
    <RoomHeader />
    <div class="display-center full-height">
      <Transition>
        <RoomPreparation v-if="isRoundInPreparation" class="margin--top--xl" key="preparation" />
        <RoomChoiceButtons v-else-if="isRoundRunning" key="running" />
        <RoomResults v-else-if="isRoundEnd" key="results" />
      </Transition>
    </div>
  </div>
</template>
