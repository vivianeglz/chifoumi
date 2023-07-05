import { describe, it, expect } from 'vitest'
import getChoiceIcon from './getChoiceIcon'

describe('getChoiceIcon', () => {
  it('getChoiceIcon - should return correctly icon', () => {
    expect(getChoiceIcon('rock')).toBe('fa-solid fa-hand-back-fist')
    expect(getChoiceIcon('leaf')).toBe('fa-solid fa-hand')
    expect(getChoiceIcon('scissors')).toBe('fa-solid fa-hand-scissors')
  })

  it('getChoiceIcon - should throw error if choiceSlug is not "leaf", "rock" or "scissors ', () => {
    expect(() => getChoiceIcon(null)).toThrow()
    expect(() => getChoiceIcon(undefined)).toThrow()
    expect(() => getChoiceIcon('')).toThrow()
    expect(() => getChoiceIcon('test')).toThrow()
  })
})
