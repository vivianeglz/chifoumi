import { ref } from 'vue'
import socketService from '@/services/socket.js'

const socket = new socketService()
const socketId = ref('')
const totalUsers = ref(0)

export default () => {
  const joinRoom = (roomId: string) => {
    socket.emit('join-room', { roomId })
    socket.on('room-connected', (response: { socketId: string; totalUsers: number }) => {
      socketId.value = response.socketId
      totalUsers.value = response.totalUsers
    })
    socket.on('room-updated', (response: { totalUsers: number }) => {
      totalUsers.value = response.totalUsers
    })
  }

  return {
    joinRoom,
    totalUsers
  }
}
