const getChoiceIcon = (choiceSlug: string): string => {
  switch (choiceSlug) {
    case 'rock':
      return 'fa-solid fa-hand-back-fist'
    case 'leaf':
      return 'fa-solid fa-hand'
    case 'scissors':
      return 'fa-solid fa-hand-scissors'
    default:
      throw new Error("Error choiceSlug param : this icon doesn't exists")
  }
}

export default getChoiceIcon
