<template>
  <div id="index">
    <keep-alive>
      <component
        :is="curTabComponent"
        :keyword="keyword"
      />
    </keep-alive>
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
      keyword: '',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.active = vm.hashChange(to.hash)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.active = this.hashChange(to.hash)
    next()
  },
  computed: {
    curTabComponent: function () {
      return this.indexTabs[this.active].component
    },
  },
  watch: {
    '$route': function (val, oldVal) {
      const { keyword = '' } = val.query
      this.keyword = keyword
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
      const fromActive = this.hashChange(this.$route.hash)
      if (active !== fromActive) {
        this.$router.push(`/index${this.indexTabs[active].hash}`)
      }
    },
  },
}
</script>

<style lang="less">
#index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .van-tabbar-item--active {
    color: #CCB8A3;

    svg {
      stroke: #CCB8A3;
      fill: #CCB8A3;
    }
  }
}
</style>
