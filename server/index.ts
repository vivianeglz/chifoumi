import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { type UserDataToUpdate } from '@common/types/index.d'
import { joinRoom, startRound, disconnecting, updateRoomUser } from './modules/rooms/index'

const app = express()
const appHttp = http.createServer(app)
const port: number = 5000

const serverSocketsParams = {
  cors: { origin: '*' }
}
const serverSockets = new Server(appHttp, serverSocketsParams)

serverSockets.on('connection', (socket) => {
  socket.on('join-room', ({ roomId }: { roomId: string }) => joinRoom({ socket, roomId }))

  socket.on('room-start-round', ({ roomId }: { roomId: string }) => startRound({ socket, roomId }))

  socket.on('room-update-user', ({ roomId, data }: { roomId: string; data: UserDataToUpdate }) =>
    updateRoomUser({ socket, roomId, data })
  )

  socket.on('disconnecting', () => disconnecting({ socket }))
})

appHttp.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
