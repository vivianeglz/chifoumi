const getChoiceIcon = (choiceSlug: any): string => {
  switch (choiceSlug) {
    case 'rock':
      return 'fa-solid fa-hand-back-fist'
    case 'leaf':
      return 'fa-solid fa-hand'
    case 'scissors':
      return 'fa-solid fa-hand-scissors'
    default:
      throw new Error("Error param : this choice slug doesn't exist")
  }
}

export default getChoiceIcon
