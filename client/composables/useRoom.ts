import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { type Room, type User, type UserDataToUpdate } from '@common/types/index.d'
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
const userName = ref<string>('')

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
  const isRoundInPreparation = computed((): boolean => !isRoundRunning.value && !isRoundEnd.value)
  const isRoundRunning = computed((): boolean => room.value.isRoundRunning)
  const isRoundEnd = computed(
    (): boolean =>
      !isRoundRunning.value &&
      room.value.users?.length > 1 &&
      room.value.users.every((user: User) => !!user.choiceSlug)
  )
  const isRoundReady = computed(
    (): boolean =>
      room.value.users.length > 1 && room.value.users.every((user: User) => user.isReady)
  )

  const updateRoom = (newRoomData: object): void => {
    Object.assign(room.value, newRoomData)
  }
  const setRoom = (): void => {
    room.value = {
      isRoundRunning: false,
      users: [],
      timer: 0
    }
    userId.value = ''

    socket.emit('join-room', { roomId: roomId.value })
    socket.on('room-updated', updateRoom)
    socket.on('room-connected', ({ id, name }: { id: string; name: string }) => {
      userId.value = id
      userName.value = name
    })
  }
  const startRound = (): void => {
    socket.emit('room-start-round', { roomId: roomId.value })
  }
  const updateUser = (data: UserDataToUpdate): void => {
    socket.emit('room-update-user', { roomId: roomId.value, data })
  }

  return {
    userName,
    room,
    timerLabel,
    user,
    winner,
    opponents,
    isRoundRunning,
    isRoundEnd,
    isRoundReady,
    isRoundInPreparation,
    setRoom,
    startRound,
    updateUser
  }
}
