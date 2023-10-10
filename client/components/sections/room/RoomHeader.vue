<script setup lang="ts">
import { type User } from '@common/types/index.d'
import useRoom from '@client/composables/useRoom'

const { room, user } = useRoom()

const getIsReady = (item: User): boolean => {
  return item.isReady
}
</script>

<template>
  <header class="header-room">
    <h1 class="text-body--m margin--null">
      <router-link :to="{ name: 'home' }">Chifoumi</router-link>
    </h1>
    <div>
      <p class="text-body--s margin--null">
        Utilisateurs en ligne: <strong>{{ room.users.length }}</strong>
      </p>
      <ul class="header-room__users padding--null">
        <li v-for="item in room.users" :key="item.id">
          {{ item.name }}
          <span v-if="user?.id === item.id">(Me)</span>
          <span v-if="getIsReady(item)" class="margin--xs">✅</span>
          <span v-else class="margin--xs">💭</span>
        </li>
      </ul>
    </div>
  </header>
</template>
