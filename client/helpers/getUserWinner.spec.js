import { describe, it, expect } from 'vitest'
import getUserWinner from './getUserWinner'

describe('getUserWinner', () => {
  it('getUserWinner - should return correctly winner', () => {
    expect(
      getUserWinner([
        { id: '0', choiceSlug: 'leaf' },
        { id: '1', choiceSlug: 'rock' },
        { id: '2', choiceSlug: 'rock' }
      ])
    ).toEqual({ id: '0', choiceSlug: 'leaf', points: 2 })
    expect(
      getUserWinner([
        { id: '0', choiceSlug: 'scissors' },
        { id: '1', choiceSlug: 'rock' },
        { id: '2', choiceSlug: 'scissors' }
      ])
    ).toEqual({ id: '1', choiceSlug: 'rock', points: 2 })
    expect(
      getUserWinner([
        { id: '0', choiceSlug: 'leaf' },
        { id: '1', choiceSlug: 'leaf' },
        { id: '2', choiceSlug: 'scissors' }
      ])
    ).toEqual({ id: '2', choiceSlug: 'scissors', points: 2 })
  })

  it('getUserWinner - should return correctly null in case of match draw', () => {
    expect(
      getUserWinner([
        { id: '0', choiceSlug: 'rock' },
        { id: '1', choiceSlug: 'rock' },
        { id: '2', choiceSlug: 'rock' }
      ])
    ).toBe(null)
    expect(
      getUserWinner([
        { id: '0', choiceSlug: 'rock' },
        { id: '1', choiceSlug: 'leaf' },
        { id: '2', choiceSlug: 'scissors' }
      ])
    ).toBe(null)
    expect(
      getUserWinner([
        { id: '0', choiceSlug: 'leaf' },
        { id: '1', choiceSlug: 'rock' },
        { id: '2', choiceSlug: 'rock' },
        { id: '3', choiceSlug: 'leaf' }
      ])
    ).toBe(null)
  })
})
