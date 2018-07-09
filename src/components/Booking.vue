<template>
  <div id="booking" class="scroll-fix" :style="{ height: height + 'px'}">
    <header class="booking--header">
      <p class="main-title">{{ $t('booking') }}</p>
      <p
        class="content"
        v-for="i in 2"
        :key="i"
      >
        {{ $t(`bookingDesc${i-1}`) }}
      </p>
    </header>

    <van-cell-group class="booking-info">
      <van-cell class="my-field" icon="info-o" :title="$t('bookingDesc2')" />
      <van-cell class="my-field" icon="phone" :title="$t('bookingDesc3')" />
      <van-cell class="my-field" icon="location" :title="$t('bookingDesc4')" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 0,
    }
  },
  mounted () {
    const app = document.getElementById('app')
    this.height = app.clientHeight
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
#booking {
  width: 100vw;
  height: 100vh;
  // background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .booking--header {
    width: 100%;
    min-height: 156px;
    padding: 32px 18px;
    background: #fff;
    margin-bottom: 12px;

    p {
      margin: 0;
    }

    .main-title {
      font-size: 18px;
      margin-bottom: 20px;
    }

    .content {
      font-size: 14px;
      color: #999999;
    }
  }

  .booking-info {
    .my-field {
      .van-cell__title {
        span {
          color: #000;
        }
      }
    }
  }
}
</style>
