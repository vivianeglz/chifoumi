import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonPrimary from '@/components/globals/buttons/ButtonPrimary.vue'

describe('ButtonPrimary', () => {
  it('ButtonPrimary - renders properly', () => {
    const wrapper = mount(ButtonPrimary)
    const component = wrapper.find('[data-test="button-primary"]')
    expect(component.exists()).toBe(true)
  })

  it('ButtonPrimary - renders properly slot', () => {
    const wrapper = mount(ButtonPrimary, { slots: { default: 'Button content' } })
    const component = wrapper.find('[data-test="button-primary"]')
    expect(component.text()).toContain('Button content')
  })

  it('ButtonPrimary - renders properly tag', () => {
    const wrapper = mount(ButtonPrimary, {
      props: { tag: 'router-link' },
      slots: { default: 'Button content' }
    })
    const component = wrapper.find('[data-test="button-primary"]')
    expect(component.html()).toContain('</router-link>')
  })
})
