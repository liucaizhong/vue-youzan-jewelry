<template>
  <div id="my-service">
    <van-tabs v-model="activeTab" swipeable sticky>
      <van-tab
        v-for="(tab, i) in myServiceTabs"
        :key="i"
        :title="$t(tab.title)"
      >
        <component :is="tab.component" :api="tab.api"  />
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
}
</script>

<style lang="less">
#my-service {
  .van-tabs {
    .van-tabs__wrap {
      height: 50px;

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

          &.van-tab--active {
            color: #B99F85;
          }
        }
      }
    }

    .van-tabs__content {
      margin-top: 5px;
    }
  }
}
</style>
