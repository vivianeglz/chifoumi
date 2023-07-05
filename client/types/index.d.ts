declare type User = {
  id: number
  choiceSlug?: string
}

declare type Room = {
  users: Array<User>
  isRoundRunning: boolean
  timer: number
  userId: number
}
