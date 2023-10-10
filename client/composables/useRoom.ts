import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { type Room, type User, type ChoiceSlug } from '@common/types/index.d'
import { socketService } from '@client/services'
import { getUserWinner } from '@client/helpers'

const timerLabels = ['Mi !', 'Fou..', 'Chi..']
const socket = new socketService()
const room = ref<Room>({
  isRoundRunning: false,
  users: [],
  timer: 0
})
const userId = ref<string>('')

export default () => {
  const route = useRoute()

  const roomId = computed((): string =>
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  )
  const timerLabel = computed((): string => timerLabels[(room.value.timer - 1000) / 1000])
  const user = computed((): User | undefined =>
    room.value.users.find((user: User) => user.id === userId.value)
  )
  const winner = computed((): User | null => getUserWinner(room.value.users))
  const opponents = computed(
    (): Array<User> => room.value.users.filter((user: User) => user.id !== userId.value)
  )
  const isRoundRunning = computed((): boolean => room.value.isRoundRunning)
  const isRoundEnd = computed(
    (): boolean =>
      !isRoundRunning.value && room.value.users.every((user: User) => !!user.choiceSlug)
  )
  const isRoundReady = computed((): boolean => room.value.users.every((user: User) => user.isReady))

  const updateRoom = (newRoomData: object): void => {
    Object.assign(room.value, newRoomData)
  }
  const setRoom = (): void => {
    socket.emit('join-room', { roomId: roomId.value })
    socket.on('room-updated', updateRoom)
    socket.on('room-connected', (id: string) => {
      userId.value = id
    })
  }
  const startRound = (): void => {
    socket.emit('room-start-round', { roomId: roomId.value })
  }
  const updateUserReadyStatus = (): void => {
    socket.emit('room-update-user', { roomId: roomId.value, data: { isReady: true } })
  }
  const updateUserChoice = (choiceSlug: ChoiceSlug): void => {
    socket.emit('room-update-user', { roomId: roomId.value, data: { choiceSlug } })
  }

  return {
    room,
    timerLabel,
    user,
    winner,
    opponents,
    isRoundRunning,
    isRoundEnd,
    isRoundReady,
    setRoom,
    startRound,
    updateUserReadyStatus,
    updateUserChoice
  }
}
