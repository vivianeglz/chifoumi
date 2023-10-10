export type ChoiceSlug = '' | 'rock' | 'leaf' | 'scissors'

export type User = {
  id: string
  choiceSlug: ChoiceSlug
  name: string
  isReady: boolean
}

export type UserDataToUpdate = {
  choiceSlug?: ChoiceSlug
  name?: string
  isReady?: boolean
}

export type Room = {
  users: Array<User>
  isRoundRunning: boolean
  timer: number
}

export type Rooms = {
  [key: string]: Room
}
