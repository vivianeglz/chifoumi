const getUserPoints = (opponents: Array<User>, user: User): number => {
  return opponents.reduce((userPoints, opponent) => {
    switch (true) {
      case user.choiceSlug === 'rock' && opponent.choiceSlug === 'scissors':
      case user.choiceSlug === 'leaf' && opponent.choiceSlug === 'rock':
      case user.choiceSlug === 'scissors' && opponent.choiceSlug === 'leaf':
        return userPoints + 1
      case user.choiceSlug === opponent.choiceSlug:
        return userPoints
      default:
        return userPoints - 1
    }
  }, 0)
}

const getUserWinner = (users: Array<User>): User | null => {
  const usersPoints = users.map((user) => {
    const opponents = users.filter((item) => item.id !== user.id)
    return {
      ...user,
      points: getUserPoints(opponents, user)
    }
  })
  const maxPoints = usersPoints.reduce((maxPoints, user) => {
    if (user.points > maxPoints) return user.points
    return maxPoints
  }, 0)
  const usersWithMaxPoints = usersPoints.filter((user) => user.points === maxPoints)
  const isDraw = usersWithMaxPoints.length > 1
  return isDraw ? null : usersWithMaxPoints[0]
}

export default getUserWinner
