<template>
  <div id="outlets" class="scroll-fix">
    <!-- <van-cell-group
      class="outlet-info"
      v-for="i in count"
      :key="i"
    >
      <van-cell class="my-field outlet-name" :title="i + '. ' + $t(`outletName${i-1}`)" />
      <van-cell class="my-field" icon="phone" :title="$t(`outletContact${i-1}`)" />
      <van-cell class="my-field" icon="location" :title="$t(`outletAddress${i-1}`)" />
    </van-cell-group> -->
    <div class="head-outlet-info">
      <p class="name">{{ $t('outletName0') }}</p>
      <p class="address">{{ $t('outletAddress0') }}</p>
      <p class="contact">{{ $t('outletContact0') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  // data () {
  //   return {
  //     count: 1,
  //   }
  // },
  mounted () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )
  },
  beforeDestroy () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
}
</script>

<style lang="less">
#outlets {
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  // .outlet-info {
  //   margin-bottom: 12px;

  //   .outlet-name {
  //     .van-cell__title {
  //       span {
  //         font-size: 20px;
  //         font-weight: bold;
  //       }
  //     }
  //   }

  //   .my-field {
  //     .van-cell__title {
  //       span {
  //         color: #000;
  //       }
  //     }
  //   }
  // }
  .head-outlet-info {
    padding-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 0;
    }

    .name {
      font-size: 18px;
      color: #000000;
      margin-bottom: 26px;
    }

    .contact {
      font-size: 14px;
      color: #898989;
    }

    .address {
      font-size: 14px;
      color: #898989;
      margin-bottom: 14px;
    }
  }
}
</style>
