import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import socketService from '@/services/socket.js'

const timerLabels = ['Mi !', 'Fou..', 'Chi..']
const socket = new socketService()
const room = ref<Room>({
  isRoundRunning: false,
  users: [],
  timer: 0,
  userId: 0
})
const userId = ref<number | null>(null)

export default () => {
  const route = useRoute()

  const roomId = computed((): string =>
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  )
  const timerLabel = computed((): string => timerLabels[(room.value.timer - 1000) / 1000])
  const userChoiceSlug = computed((): string => {
    const user = room.value.users.find((item) => item.id === userId.value)
    return user?.choiceSlug || ''
  })

  const updateRoom = (newRoomData: object): void => {
    Object.assign(room.value, newRoomData)
  }
  const setRoom = (): void => {
    socket.emit('join-room', { roomId: roomId.value })
    socket.on('room-updated', updateRoom)
    socket.on('room-connected', (id: number) => {
      userId.value = id
    })
  }
  const startRound = (): void => {
    socket.emit('room-start-round', { roomId: roomId.value })
  }
  const updateUserChoice = (choiceSlug: string): void => {
    socket.emit('room-select-choice', { roomId: roomId.value, choiceSlug })
  }

  return {
    room,
    timerLabel,
    userChoiceSlug,
    setRoom,
    startRound,
    updateUserChoice
  }
}
