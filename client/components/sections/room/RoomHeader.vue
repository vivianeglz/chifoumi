<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { type User } from '@common/types/index.d'
import useRoom from '@client/composables/useRoom'
import useCopyClipboard from '@client/composables/useCopyClipboard.ts'
import UiButton from '@client/components/globals/buttons/UiButton.vue'
import UiTile from '@client/components/globals/tile/UiTile.vue'
import UiLogo from '@client/components/globals/icons/UiLogo.vue'

const { room, user, isRoundInPreparation } = useRoom()
const { copyToClipboard } = useCopyClipboard()
const route = useRoute()

const roomUrl = computed(() => {
  return `${window.location.origin}?roomId=${route.params.id}`
})

const getIsReady = (item: User): boolean => {
  return item.isReady
}
</script>

<template>
  <header class="header-room">
    <UiButton tag="router-link" :to="{ name: 'home' }" variant="discrete">
      <UiLogo size="s" class="margin--right" />
    </UiButton>

    <UiTile>
      <p class="text-body--s margin--null">Utilisateurs en ligne:</p>
      <ul class="header-room__users padding--null margin--null">
        <li v-for="item in room.users" :key="item.id" class="margin--top--s margin--bottom--null">
          {{ item.name }}
          <span v-if="user?.id === item.id">(Moi)</span>
          <template v-if="isRoundInPreparation">
            <span v-if="getIsReady(item)" class="margin--xs">✅</span>
            <span v-else class="margin--xs">💭</span>
          </template>
        </li>
      </ul>
      <UiButton
        v-if="isRoundInPreparation"
        variant="discrete"
        class="margin--top--l"
        @click="copyToClipboard(roomUrl)"
      >
        Inviter des joueurs
      </UiButton>
    </UiTile>
  </header>
</template>
