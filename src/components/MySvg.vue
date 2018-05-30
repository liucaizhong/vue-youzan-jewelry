<template>
  <div class="my-svg" v-html="template" />
</template>

<script>
export default {
  props: {
    render: Function, // Promise
    el: Object,
  },
  data () {
    return {
      template: '',
    }
  },
  created () {
    if (this.el) {
      this.template = `
      <svg viewBox="${this.el.viewBox}">
        <use xlink:href="#${this.el.id}" />
      </svg>`
    }
    if (this.render) {
      this.render().then(el => {
        console.dir(el.default)
        this.template = `
        <svg viewBox="${el.default.viewBox}">
          <use xlink:href="#${el.default.id}" />
        </svg>`
      })
    }
  },
}
</script>

<style lang="less">
.my-svg {
  width: 18px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;

    path, g[stroke] {
      fill: inherit;
      stroke: inherit;
    }
  }
}
</style>
