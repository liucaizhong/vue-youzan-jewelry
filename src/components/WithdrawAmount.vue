<template>
  <div id="withdraw-amount" class="scroll-fix">
    <p class="tips">
      {{ $t('withdrawTips') }}
    </p>
    <p class="title">{{ $t('withdrawAmount') }}</p>
    <div class="amount-input">
      <input class="amount" type="number" v-model="amount" />
      <span class="rmb">¥</span>
    </div>
    <div class="opt">
      <div class="balance">{{ $t('myBalance') + ': ' + $n(userInfo.balance, 'currency') }}</div>
      <a href="javascript:void(0)" @click="withdrawAll">{{ $t('withdrawAll') }}</a>
    </div>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="confirmWithdraw"
    >{{ $t('confirmWithdraw') }}</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      amount: '',
    }
  },
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
    withdrawAll () {
      this.amount = this.userInfo.balance
    },
    confirmWithdraw () {
      if (this.amount) {
        if (this.amount > this.userInfo.balance) {
          this.$message({
            content: this.$t('withdrawInvalid'),
          })
        } else {
          this.$router.push('/input-bankinfo')
        }
      }
    },
  },
}
</script>

<style lang="less">
#withdraw-amount {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 78px 18px 0 18px;
  background: #fff;

  p {
    margin: 0;
  }

  .tips {
    font-size: 14px;
    color: #595959;
    margin-bottom: 30px;
  }

  .title {
    font-size: 14px;
    color: #000000;
    margin-bottom: 18px;
  }

  .amount-input {
    position: relative;
    border-bottom: 1px solid #CCCCCC;
    width: 100%;
    height: 68px;
    margin-bottom: 15px;

    .amount {
      position: absolute;
      border: none;
      padding: 0 0 0 50px;
      font-size: 48px;
      line-height: 100%;
      width: 100%;
      height: 100%;
    }

    .rmb {
      position: absolute;
      left: 0;
      font-size: 48px;
      font-weight: bold;
      height: 100%;
      width: 50px;
      text-align: center;
      line-height: 67px;
    }
  }

  .opt {
    margin-bottom: 42px;

    .balance {
      display: inline-block;
      font-size: 14px;
      color: #919191;
      margin-right: 28px;
    }

    a {
      font-size: 14px;
      color: #000000;
      text-decoration: underline;
    }
  }
}
</style>
