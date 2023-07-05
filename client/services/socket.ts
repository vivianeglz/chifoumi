import { io, Socket } from 'socket.io-client'
import { socketPort } from '@common/constants'

class SocketioService {
  socket: Socket

  constructor() {
    this.socket = io(`http://192.168.1.88:${socketPort}`)
  }

  emit(event: string, params: object): void {
    this.socket.emit(event, params)
  }

  on(event: string, callback: (params: any) => void): void {
    this.socket.on(event, callback)
  }
}

export default SocketioService
