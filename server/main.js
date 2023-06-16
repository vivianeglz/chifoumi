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

appSockets.on('connection', (socket) => {
  const getRoomUpdatedBody = (roomId) => {
    const { isRoundRunning, timer, users } = rooms[roomId]
    return { users, timer, isRoundRunning }
  }

  socket.on('join-room', ({ roomId }) => {
    socket.join(`room-${roomId}`)
    if (!rooms[roomId]) {
      rooms[roomId] = { users: [], isRoundRunning: false }
    }
    rooms[roomId].users.push({ id: socket.id })
    const responseBody = getRoomUpdatedBody(roomId)
    socket.emit('room-connected', socket.id)
    socket.emit('room-updated', responseBody)
    socket.to(`room-${roomId}`).emit('room-updated', responseBody)
  })

  socket.on('room-start-round', ({ roomId }) => {
    const updateRoom = (timer) => {
      rooms[roomId].timer = timer
      rooms[roomId].isRoundRunning = timer > 0
      const responseBody = getRoomUpdatedBody(roomId)
      socket.emit('room-updated', responseBody)
      socket.to(`room-${roomId}`).emit('room-updated', responseBody)
    }
    rooms[roomId].users = rooms[roomId].users.map((user) => ({ ...user, choiceSlug: '' }))
    updateRoom(3000)
    const intervalId = setInterval(() => {
      updateRoom(rooms[roomId].timer - 1000)
      if (rooms[roomId].timer <= 0) clearInterval(intervalId)
    }, 1000)
  })

  socket.on('room-select-choice', ({ roomId, choiceSlug }) => {
    const userIndex = rooms[roomId].users.findIndex((user) => user.id === socket.id)
    rooms[roomId].users[userIndex].choiceSlug = choiceSlug
    const responseBody = getRoomUpdatedBody(roomId)
    socket.emit('room-updated', responseBody)
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
