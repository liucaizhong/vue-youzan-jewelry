<template>
  <div id="index">
    <keep-alive>
      <component
        :is="curTabComponent"
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
      // params: null,
      // logged: false,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.params = to.query
      // vm.logged = vm.$getCookie('logged') === '0'
      vm.active = vm.hashChange(to.hash)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('to', to)
    // this.params = to.query
    // this.logged = this.$getCookie('logged') === '0'
    this.active = this.hashChange(to.hash)
    next()
  },
  computed: {
    curTabComponent: function () {
      return this.indexTabs[this.active].component
    },
  },
  // watch: {
  //   '$route': function (val, oldVal) {
  //     console.log('index route', val)
  //     this.params = val.query
  //   },
  // },
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
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .van-tabbar-item {
    position: relative;

    &:not(:last-of-type)::after {
      content: '';
      position: absolute;
      right: 0;
      border-right: 1px solid #E0E0E0;
      height: 14px;
    }
  }

  .van-tabbar-item--active {
    color: #CCB8A3;

    svg {
      stroke: #CCB8A3;
      fill: #CCB8A3;
    }
  }
}
</style>
