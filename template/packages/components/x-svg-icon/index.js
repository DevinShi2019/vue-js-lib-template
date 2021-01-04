import XSvgIcon from './x-svg-icon.vue'
import AssetsLoader from '../../assets-loader'

XSvgIcon.install = (vue) => {
  AssetsLoader.requireAllSvg()
  vue.component(XSvgIcon.name, XSvgIcon)
}

export default XSvgIcon
