<template>
  <div id="index">
    <component
      :is="curTabComponent"
    />
    <van-tabbar
      v-model="active"
      @change="changeTab"
    >
      <van-tabbar-item
        v-for="tab in indexTabs"
        :key="tab.name"
      >
        <template slot="icon">
          <my-svg :render="tab.icon" />
        </template>
        {{ $t(tab.name) }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import MySvg from '@/components/MySvg'
import { INDEXTABS } from '@/constant'

export default {
  components: {
    MySvg,
  },
  data () {
    return {
      indexTabs: INDEXTABS,
      active: 0,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.active = vm.hashChange(to.hash)
      console.log('beforeRouteEnter active', vm.active)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.active = this.hashChange(to.hash)
    console.log('beforeRouteUpdate active', this.active)
    next()
  },
  computed: {
    curTabComponent: function () {
      return this.indexTabs[this.active].component
    },
  },
  methods: {
    hashChange (hash) {
      console.log('hash', hash)
      return hash ? this.indexTabs.findIndex(tab => {
        return tab.hash === hash
      }) : 0
    },
    changeTab (active) {
      this.$router.push(`/index${this.indexTabs[active].hash}`)
    },
  },
}
</script>

<style lang="less">
#index {
  width: 100vw;
  height: 100vh;

  .van-tabbar-item--active {
    color: #CCB8A3;

    svg, g[stroke] {
      fill: #CCB8A3;
      stroke: #CCB8A3;
    }
  }
}
</style>
