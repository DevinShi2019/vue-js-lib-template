<template>
  <div id="app">
    <mainHeader />
    <div class="container">
      <sideNav class="nav" />
      <router-view class="view" />
    </div>
    <mainFooter />
    <div style="display: none;" class="mobile-toggle-wrap" @click="isMobileShow = true">
      <vue-cards-icon
        style="display: none; "
        class="mobile-toggle-wrap__icon"
        :symbol="false"
        :size="26"
        name="mobile"
        color="#628cf5"
      />开启移动端预览
    </div>
    <mobile-frame v-if="isMobileShow" :show.sync="isMobileShow" />
  </div>
</template>

<script>
import mainHeader from './components/header.vue'
import mainFooter from './components/footer.vue'
import sideNav from './components/side-nav.vue'
import MobileFrame from './components/mobile-frame.vue'
import router from './router'

export default {
  name: 'App',
  components: {
    mainHeader,
    sideNav,
    mainFooter,
    MobileFrame
  },
  data() {
    return {
      isMobileShow: false
    }
  },
  watch: {
    $route(to, from) {
      // if (to.path === '/') {
      //   router.push({ name: 'introduce' })
      // }
    }
  },
  mounted() {
    if ('onhashchange' in window) {
      window.onhashchange = function(ev) {
        let name = window.location.hash.substring(2)
        router.push({ name })
      }
    }
  }
}
</script>
<style lang="scss">
@import './assets/scss/index';

.container {
  width: 90%;
  margin: 48px auto;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
  .nav {
    float: left;
    width: 210px;
  }
  .view {
    float: left;
    width: calc(100% - 215px);
    padding: 32px 48px 48px;
    box-sizing: border-box;
  }
}

.container:after {
  display: block;
  clear: both;
  content: '';
}
.mobile-toggle-wrap {
  position: fixed;
  top: 18px;
  right: 70px;
  z-index: 999;
  display: flex;
  height: 40px;
  padding: 0 20px;
  line-height: 40px;
  color: #628cf5;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #628cf5;
  transition: all 0.5s ease;
  align-items: center;
  &:hover {
    border-radius: 14px;
    opacity: 0.7;
  }
}
</style>
