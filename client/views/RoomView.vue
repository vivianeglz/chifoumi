<script setup lang="ts">
import useRoom from '@client/composables/useRoom'
import RoomHeader from '@client/components/sections/room/RoomHeader.vue'
import RoomActions from '@client/components/sections/room/RoomActions.vue'
import RoomResults from '@client/components/sections/room/RoomResults.vue'
import RoomButtonRun from '@client/components/sections/room/RoomButtonRun.vue'

const { setRoom, isRoundEnd, isRoundRunning } = useRoom()

setRoom()
</script>

<template>
  <div class="fullscreen-height">
    <RoomHeader />
    <div class="display-center full-height">
      <RoomResults v-if="isRoundEnd" />
      <RoomActions v-if="isRoundRunning" />
      <RoomButtonRun v-else class="margin--top--xl" />
    </div>
  </div>
</template>
