// jest api https://jestjs.io/docs/zh-Hans/expect#expectvalue

import { shallowMount } from '@vue/test-utils'
import XIconSvg from '@packages/components/x-icon-svg/index'

describe('test: XIconSvg.vue', () => {
  it('renders props name when passed', () => {
    const name = 'share-icon'
    const wrapper = shallowMount(XIconSvg, {
      propsData: { 'name': name }
    })
    // 正则匹配toMatch
    expect(wrapper.find('svg').classes()).toContain('svg-share-icon')
  })
})
