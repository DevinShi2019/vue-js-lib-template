<template>
  <div class="demo-block">
    <ul class="icon-list">
      <li v-for="name in icons" :key="name">
        <div class="demo-icon-wrap">
          <x-svg-icon :name="name" :size="32"></x-svg-icon>
          <span class="name">{{ name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AssetLoader from '../../lib/assets-loader'
import '../../lib/theme-chalk/x-svg-icon.css'
import XSvgIcon from '../../lib/x-svg-icon'
var iconList = require('../icon.json')
AssetLoader.requireAllSvg()

export default {
  name: 'IconDemo',
  components: {
    XSvgIcon
  },
  data() {
    return {
      icons: iconList
    }
  }
}
</script>

<style lang="scss">
.icon-list {
  padding: 0;
  overflow: hidden;
  list-style: none !important;
  border: solid 1px #eaeefb;
  border-radius: 4px;
}
.icon-list li {
  float: left;
  width: 16.66%;
  height: 120px;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: 13px;
  line-height: 120px;
  color: #666;
  text-align: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  transition: color 0.15s linear;
  .demo-icon-wrap {
    display: inline-block;
    font-family:
 'Helvetica Neue',
 Helvetica,
 'PingFang SC',
 'Hiragino Sans GB',
 'Microsoft YaHei',
      SimSun,
 sans-serif;
    line-height: normal;
    color: #626673;
    vertical-align: middle;
  }
  .vue-cards-icon {
    display: block;
    margin-bottom: 15px;
  }
  &:hover {
    color: rgb(92, 182, 255);
  }
}
</style>
