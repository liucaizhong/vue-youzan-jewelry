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
        <!-- <template slot="icon" slot-scope="props">
          <svg viewBox="${props.icon.viewBox}">
            <use xlink:href="#${props.icon.id}" />
          </svg>
        </template> -->
        {{ $t(tab.name) }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { INDEXTABS } from '@/constant'

export default {
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
  width: 100%;
  height: 100vh;
}
</style>
