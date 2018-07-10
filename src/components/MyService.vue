<template>
  <div id="my-service" class="scroll-fix">
    <van-tabs v-model="activeTab" swipeable @click="changeTab">
      <van-tab
        v-for="(tab, i) in myServiceTabs"
        :key="i"
        :title="$t(tab.title)"
      >
        <component :is="tab.component" :api="tab.api" :active="activeTab === i"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { MYSERVICETABS } from '@/constant'

export default {
  data () {
    return {
      activeTab: 0,
      myServiceTabs: MYSERVICETABS,
    }
  },
  created () {
    console.log(this.$route)
    this.activeTab = this.$route.hash.slice(1)
  },
  methods: {
    changeTab (index) {
      this.$router.replace(`/my-service#${index}`)
    },
  },
}
</script>

<style lang="less">
#my-service {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .van-tabs {
    // height: 50px;
    padding-top: 50px;
    .van-tabs__wrap {
      height: 50px;
      position: fixed;

      .van-tabs__nav {
        padding-bottom: 0;

        .van-tabs__line {
          width: 12.5% !important;
          left: 6.25%;
          bottom: 0;
          background-color: #B99F85;
        }

        .van-tab {
          font-size: 14px;
          color: #CCCCCC;

          .van-ellipsis {
            height: 50px;
            line-height: 50px;
          }

          &.van-tab--active {
            color: #B99F85;
          }
        }
      }
    }

    .van-tabs__content {
      padding-top: 5px;
      width: 100%;
      height: calc(100vh - 50px);

      .van-tab__pane {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
