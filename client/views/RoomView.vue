<script setup lang="ts">
import useRoom from '@/composables/useRoom'
import RoomHeader from '@/components/sections/room/RoomHeader.vue'
import RoomActions from '@/components/sections/room/RoomActions.vue'
import RoomResults from '@/components/sections/room/RoomResults.vue'
import RoomButtonRun from '@/components/sections/room/RoomButtonRun.vue'

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
