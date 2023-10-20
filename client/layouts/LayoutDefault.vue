<script setup>
import { RouterView } from 'vue-router'
import useNotifications from '@client/composables/useNotifications.ts'
import UiNotifications from '@client/components/globals/notifications/UiNotifications.vue'

const { notification } = useNotifications()
</script>

<template>
  <main class="background--primary-1 color--neutral-00">
    <Transition name="notification">
      <UiNotifications
        v-if="notification"
        :type="notification.type"
        :message="notification.message"
      />
    </Transition>
    <RouterView v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>
