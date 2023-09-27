declare type ChoiceSlug = '' | 'rock' | 'leaf' | 'scissors'

declare type User = {
  id: string
  choiceSlug: string
}

declare type Room = {
  users: Array<User>
  isRoundRunning: boolean
  timer: number
}
