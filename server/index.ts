import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { joinRoom, startRound, selectChoice, disconnecting } from './modules/rooms/index'

const app = express()
const appHttp = http.createServer(app)
const port: number = 5000

const serverSocketsParams = {
  cors: { origin: '*' }
}
const serverSockets = new Server(appHttp, serverSocketsParams)

serverSockets.on('connection', (socket) => {
  socket.on('join-room', ({ roomId }) => joinRoom({ socket, roomId }))

  socket.on('room-start-round', ({ roomId }) => startRound({ socket, roomId }))

  socket.on('room-select-choice', ({ roomId, choiceSlug }) =>
    selectChoice({ socket, roomId, choiceSlug })
  )

  socket.on('disconnecting', () => disconnecting({ socket }))
})

appHttp.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
