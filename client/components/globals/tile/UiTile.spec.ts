import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTile from './UiTile.vue'

describe('UiTile', () => {
  it('UiTile - renders properly', () => {
    const wrapper = mount(UiTile)
    const component = wrapper.find('[data-test="ui-tile"]')
    expect(component.exists()).toBe(true)
  })

  it('UiTile - renders properly slot', () => {
    const wrapper = mount(UiTile, { slots: { default: 'Content' } })
    const component = wrapper.find('[data-test="ui-tile"]')
    expect(component.text()).toContain('Content')
  })
})
