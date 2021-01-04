<template>
  <div class="x-svg-icon">
    <svg class="svg-icon" :class="className" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'XSvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#svg-${this.name}`
    },
    className() {
      return `svg-${this.name}`
    }
  }
}
</script>
