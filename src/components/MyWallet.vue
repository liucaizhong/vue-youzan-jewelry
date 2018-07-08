<template>
  <div id="my-wallet" class="scroll-fix">
    <div
      class="total-assets"
    >
      <div class="content">
        <div class="desc">{{ $t('myTotalAssets') }}</div>
        <div class="total van-ellipsis">{{ userInfo.balance + userInfo.deposit }}</div>
        <div class="unit">{{ $t('rmbUnit') }}</div>
      </div>
    </div>
    <van-cell-group class="amount-info">
      <van-cell class="my-field" :title="$t('myBalance')" :value="userInfo.balance + $t('rmbUnit')" />
      <van-cell class="my-field" :title="$t('myDeposit')" :value="userInfo.deposit + $t('rmbUnit')" />
    </van-cell-group>
    <div class="tips">
      {{ $t('myWalletTips') }}
    </div>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="withdraw"
    >{{ $t('withdrawImmediately') }}</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  methods: {
    withdraw () {
      this.$router.push('/withdraw-amount')
    },
  },
}
</script>

<style lang="less">
#my-wallet {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .total-assets {
    width: 100%;
    height: 188px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #B99F85;

    .content {
      width: 140px;
      height: 140px;
      border: 1px solid;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 24px 0;

      .desc {
        font-size: 14px;
      }

      .total {
        font-size: 36px;
        line-height: 36px;
        font-weight: 400;
      }

      .unit {
        font-size: 18px;
      }
    }
  }

  .amount-info {
    .my-field {
      .van-cell__title {
        span {
          color: #000;
        }
      }
    }
  }

  .tips {
    font-size: 12px;
    color: #AFAFAF;
    padding: 18px;
  }

  .my-button {
    position: absolute;
    bottom: 0;
  }
}
</style>
