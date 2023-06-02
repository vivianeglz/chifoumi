import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import socketService from '@/services/socket.js'

const socket = new socketService()
const room = ref<Room>({
  isRoundRunning: false,
  totalUsers: 0
})

export default () => {
  const route = useRoute()

  const roomId = computed((): string =>
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  )

  const updateRoom = (newRoomData: object) => {
    Object.assign(room.value, newRoomData)
  }

  const setRoom = (): void => {
    socket.emit('join-room', { roomId: roomId.value })
    socket.on('room-connected', updateRoom)
    socket.on('room-updated', updateRoom)
  }

  const startRound = (): void => {
    socket.emit('room-start-round', { roomId: roomId.value })
    updateRoom({ isRoundRunning: true })
  }

  return {
    room,
    setRoom,
    startRound
  }
}
