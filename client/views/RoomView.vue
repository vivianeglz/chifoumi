<script setup lang="ts">
import useRoom from '@/composables/useRoom'
import RoomHeader from '@/components/sections/room/RoomHeader.vue'
import RoomActions from '@/components/sections/room/RoomActions.vue'

const { setRoom } = useRoom()

setRoom()
</script>

<template>
  <div class="fullscreen-height">
    <RoomHeader />
    <RoomActions />
  </div>
</template>
