import { type ChoiceSlug, type Rooms, type Room, type User } from '@common/types/index.d'

const rooms: Rooms = {}
const choiceSlugs: Array<ChoiceSlug> = ['rock', 'leaf', 'scissors']

const getRoomUpdatedBody = (roomId: string): Room => {
  const { isRoundRunning, timer, users } = rooms[roomId]
  return { users, timer, isRoundRunning }
}

const getRandomChoiceForUsers = (users: Array<User>): void => {
  users.forEach((user: User) => {
    if (user.choiceSlug) return
    const randomChoiceSlug: ChoiceSlug = choiceSlugs[Math.floor(Math.random() * choiceSlugs.length)]
    user.choiceSlug = randomChoiceSlug
  })
}

const updateRoom = (roomId: string, timer: number, socket: any) => {
  rooms[roomId].timer = timer
  rooms[roomId].isRoundRunning = timer > 0
  const isEndRound: boolean = !rooms[roomId].isRoundRunning
  if (isEndRound) {
    getRandomChoiceForUsers(rooms[roomId].users)
  }
  const responseBody: Room = getRoomUpdatedBody(roomId)
  socket.emit('room-updated', responseBody)
  socket.to(`room-${roomId}`).emit('room-updated', responseBody)
}

const joinRoom = ({ socket, roomId }: { socket: any; roomId: string }): void => {
  socket.join(`room-${roomId}`)
  if (!rooms[roomId]) {
    rooms[roomId] = { users: [], isRoundRunning: false, timer: 0 }
  }
  rooms[roomId].users.push({ id: socket.id, choiceSlug: '' })
  const responseBody: Room = getRoomUpdatedBody(roomId)
  socket.emit('room-connected', socket.id)
  socket.emit('room-updated', responseBody)
  socket.to(`room-${roomId}`).emit('room-updated', responseBody)
}

const startRound = ({ socket, roomId }: { socket: any; roomId: string }): void => {
  rooms[roomId].users = rooms[roomId].users.map((user) => ({ ...user, choiceSlug: '' }))
  updateRoom(roomId, 3000, socket)
  const intervalId = setInterval(() => {
    updateRoom(roomId, rooms[roomId].timer - 1000, socket)
    if (rooms[roomId].timer <= 0) clearInterval(intervalId)
  }, 1000)
}

const selectChoice = ({
  socket,
  roomId,
  choiceSlug
}: {
  socket: any
  roomId: string
  choiceSlug: ChoiceSlug
}): void => {
  const userIndex: number = rooms[roomId].users.findIndex((user) => user.id === socket.id)
  rooms[roomId].users[userIndex].choiceSlug = choiceSlug
  const responseBody: Room = getRoomUpdatedBody(roomId)
  socket.emit('room-updated', responseBody)
  socket.to(`room-${roomId}`).emit('room-updated', responseBody)
}

const disconnecting = ({ socket }: { socket: any }) => {
  for (const [roomId, room] of Object.entries(rooms)) {
    const isUserRoom: boolean = room.users.some((item: User) => item.id === socket.id)
    if (isUserRoom) {
      room.users = room.users.filter((item: User) => item.id !== socket.id)
      const responseBody: Room = getRoomUpdatedBody(roomId)
      socket.to(`room-${roomId}`).emit('room-updated', responseBody)
    }
  }
}

export { joinRoom, startRound, selectChoice, disconnecting }
