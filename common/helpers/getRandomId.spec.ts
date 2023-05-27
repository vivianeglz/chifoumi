import { describe, it, expect } from 'vitest'
import getRandomId from '@common/helpers/getRandomId'

describe('getRandomId', () => {
  it('getRandomId - generates 6 random characters', () => {
    const randomId = getRandomId()
    expect(typeof randomId).toBe('string')
    expect(randomId?.length).toBe(6)
  })

  it('getRandomId - generates different ids ', () => {
    expect(getRandomId() !== getRandomId()).toBe(true)
  })
})
