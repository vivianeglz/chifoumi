import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiButton from './UiButton.vue'

describe('UiButton', () => {
  it('UiButton - renders properly', () => {
    const wrapper = mount(UiButton)
    const component = wrapper.find('[data-test="ui-button"]')
    expect(component.exists()).toBe(true)
  })

  it('UiButton - renders properly slot', () => {
    const wrapper = mount(UiButton, { slots: { default: 'Button content' } })
    const component = wrapper.find('[data-test="ui-button"]')
    expect(component.text()).toContain('Button content')
  })

  it('UiButton - renders properly tag', () => {
    const wrapper = mount(UiButton, {
      props: { tag: 'router-link' },
      slots: { default: 'Button content' }
    })
    const component = wrapper.find('[data-test="ui-button"]')
    expect(component.html()).toContain('</router-link>')
  })

  it('UiButton - emit click on click', async () => {
    const wrapper = mount(UiButton, { slots: { default: 'Button content' } })
    const component = wrapper.find('[data-test="ui-button"]')
    await component.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
