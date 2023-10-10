export type ChoiceSlug = '' | 'rock' | 'leaf' | 'scissors'

export type User = {
  id: string
  choiceSlug: ChoiceSlug
}

export type Room = {
  users: Array<User>
  isRoundRunning: boolean
  timer: number
}

export type Rooms = {
  [key: string]: Room
}
