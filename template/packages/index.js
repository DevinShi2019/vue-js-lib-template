import XSvgIcon from './components/x-svg-icon/index'
import AssetLoader from './assets-loader'

import XDateFormatPlugin from './plugins/dayjs/x-date-format'

import { version } from '../package.json'

const components = [XSvgIcon]

const plugins = [XDateFormatPlugin]

const install = function(Vue) {
  // 判断是否安装
  if (install.installed) {
    return
  }

  plugins.forEach((plugin) => {
    Vue.use(plugin)
  })

  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version,
  install,
  XSvgIcon,
  AssetLoader,
  XDateFormatPlugin
}
