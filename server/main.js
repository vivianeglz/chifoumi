const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const appHttp = http.createServer(app)
const port = 4000
const appSockets = new Server(appHttp, {
  cors: {
    origins: '*'
  }
})
const rooms = {}

appHttp.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const getRoomUpdatedBody = (roomId) => {
  const totalUsers = rooms[roomId].users.length
  const isRoundRunning = rooms[roomId].isRoundRunning
  return { totalUsers, isRoundRunning }
}

appSockets.on('connection', (socket) => {
  socket.on('join-room', ({ roomId }) => {
    socket.join(`room-${roomId}`)
    if (!rooms[roomId]) {
      rooms[roomId] = { users: [], isRoundRunning: false }
    }
    rooms[roomId].users.push({ id: socket.id })
    const responseBody = getRoomUpdatedBody(roomId)
    socket.emit('room-connected', { socketId: socket.id, ...responseBody })
    socket.to(`room-${roomId}`).emit('room-updated', responseBody)
  })

  socket.on('room-start-round', ({ roomId }) => {
    rooms[roomId].isRoundRunning = true
    const responseBody = getRoomUpdatedBody(roomId)
    socket.to(`room-${roomId}`).emit('room-updated', responseBody)
  })

  socket.on('disconnecting', () => {
    for (const [roomId, room] of Object.entries(rooms)) {
      if (room.users.find((item) => item.id === socket.id)) {
        room.users = room.users.filter((item) => item.id !== socket.id)
        const responseBody = getRoomUpdatedBody(roomId)
        socket.to(`room-${roomId}`).emit('room-updated', responseBody)
      }
    }
  })
})

module.exports = app
