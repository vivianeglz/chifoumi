import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInput from './UiInput.vue'

describe('UiInput', () => {
  it('UiInput - renders properly', () => {
    const wrapper = mount(UiInput)
    const component = wrapper.find('[data-test="ui-input"]')
    expect(component.exists()).toBe(true)
  })

  it('UiInput - renders properly label', () => {
    const wrapper = mount(UiInput, {
      props: { label: 'Label test' }
    })
    const component = wrapper.find('[data-test="ui-input-label"]')
    expect(component.html()).toContain('Label test')
  })

  it('UiInput - renders properly v-model and reactivity', async () => {
    const wrapper = mount(UiInput, {
      props: { modelValue: '' }
    })
    const component = wrapper.find('[data-test="ui-input-input"]')
    component.setValue('Test')
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('Test')
  })
})
