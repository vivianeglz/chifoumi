<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import UiTile from '@client/components/globals/tile/UiTile.vue'
import HomeHeader from '@client/components/sections/home/HomeHeader.vue'

const route = useRoute()
const router = useRouter()

if (route.query?.roomId) {
  router.replace({ name: 'room', params: { id: route.query.roomId } })
}
</script>

<template>
  <div class="fullscreen-height display-center wrapper wrapper--s">
    <UiTile>
      <HomeHeader />
    </UiTile>
  </div>
</template>
