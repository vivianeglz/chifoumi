import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiNotifications from './UiNotifications.vue'

describe('UiNotifications', () => {
  it('UiNotifications - renders properly', () => {
    const wrapper = mount(UiNotifications)
    const component = wrapper.find('[data-test="ui-notification"]')
    expect(component.exists()).toBe(true)
  })

  it('UiNotifications - renders properly type', () => {
    const wrapper = mount(UiNotifications, { props: { type: 'success' } })
    const component = wrapper.find('[data-test="ui-notification"]')
    expect(component.text()).toContain('✅')
  })
})
