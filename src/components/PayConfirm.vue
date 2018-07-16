<template>
  <div id="pay-confirm" class="scroll-fix">
    <header>
      <p class="order-no">{{ orderNoTitle }}</p>
      <p class="payment-amount">{{ paymentAmountText }}</p>
      <p class="count-down">{{ paymentDueDateText }}</p>
    </header>
    <van-radio-group class="payment-ways" v-model="paymentMethod">
      <van-cell-group>
        <van-cell
          v-for="item in paymentWay"
          :key="item.key"
          :title="$t(item.title)"
          clickable
          @click="paymentMethod = item.key"
        >
          <my-svg slot="icon" :render="item.icon" />
          <van-radio class="my-radio my-radio-square" :name="item.key" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="confirmPay"
      :loading="confirmPayLoading"
    >{{ confirmPayBtnText }}</van-button>
  </div>
</template>

<script>
import MySvg from './MySvg'
import { PAYMENTWAY, ORDERTIMEOUT } from '@/constant'

export default {
  components: {
    MySvg,
  },
  // props: {
  //   orderNo: {
  //     type: String,
  //     // required: true,
  //     default: '40000001',
  //   },
  //   paymentAmount: {
  //     type: String,
  //     // required: true,
  //     default: '6000',
  //   },
  //   paymentDueDate: {
  //     type: Date,
  //     // required: true,
  //     default: function () {
  //       return new Date(Date.now() + 15 * 60 * 1000)
  //     },
  //   }
  // },
  data () {
    return {
      orderNo: '',
      paymentAmount: '',
      // paymentDueDate: null,
      countDownTimer: null,
      paymentCountDown: 0,
      paymentCountDownText: '',
      paymentMethod: PAYMENTWAY[0].key,
      paymentWay: PAYMENTWAY,
      confirmPayLoading: false,
      orderTimeout: ORDERTIMEOUT,
      payOption: {
        appId: '',
        timeStamp: '',
        nonceStr: '',
        packageStr: '',
        signType: '',
        paySign: '',
      },
    }
  },
  created () {
    const { id, total, due } = this.$route.query
    console.log('payConfirm', id)
    this.orderNo = id.split`,`
    this.paymentAmount = total
    // this.paymentDueDate = new Date(due + 15 * 60 * 1000)
    let gap = +due + this.orderTimeout - Date.now()
    if (gap <= 0) {
      this.paymentCountDownText = this.$t('paymentOvertime')
    } else {
      this.paymentCountDown = gap
      if (!this.countDownTimer) {
        this.countDownTimer = setInterval(() => {
          this.paymentCountDown -= 1000
          if (this.paymentCountDown <= 0) {
            this.paymentCountDownText = this.$t('paymentOvertime')
            clearInterval(this.countDownTimer)
            this.$router.replace('/index')
          } else {
            let curCountDown = new Date(this.paymentCountDown)
            this.paymentCountDownText = curCountDown.getMinutes() + ':' +
              (curCountDown.getSeconds() < 10 ? '0' + curCountDown.getSeconds() : curCountDown.getSeconds())
          }
        }, 1000)
      }
    }
  },
  mounted () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )
  },
  beforeDestroy () {
    if (this.countDownTimer) {
      clearInterval(this.countDownTimer)
    }
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
  computed: {
    orderNoTitle: function () {
      return this.orderNo.length < 2
        ? (this.$t('orderNo') + ': ' + this.orderNo[0])
        : this.$t('batchPayment')
    },
    paymentAmountText: function () {
      return this.$n(this.paymentAmount, 'currency')
    },
    paymentDueDateText: function () {
      return this.$t('payToCompleteTime') + ' ' + this.paymentCountDownText
    },
    confirmPayBtnText: function () {
      return this.$t('confirmPay') + ' ' + this.$n(this.paymentAmount, 'currency')
    },
  },
  methods: {
    jsSdk () {
    // 判断微信的WeixinJSBridge
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
      } else {
        this.onBridgeReady()
      }
    },
    onBridgeReady () {
      const { appId, timeStamp, nonceStr, signType, sign } = this.payOption
      const packageStr = this.payOption.package
      const successCb = this.successCb
      const cancelCb = this.cancelCb
      // eslint-disable-next-line
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': appId, // 公众号名称，由商户传入
          'timeStamp': timeStamp, // 时间戳，自1970年以来的秒数
          'nonceStr': nonceStr, // 随机串
          'package': packageStr,
          'signType': signType, // 微信签名方式：
          'paySign': sign, // 微信签名
        },
        function (res) {
          // alert(JSON.stringify(res))
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            successCb()
          }
          if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            cancelCb()
          }
        },
      )
    },
    successCb () {
      this.$router.replace('/payment-success')
    },
    cancelCb () {
      const url = '/common/payment/cancel/'
      this.$fetch(url, {
        data: {
          orderno: this.orderNo,
        },
        method: 'post',
      }).then(resp => {
        console.log(resp)
        this.confirmPayLoading = false
      }).catch(err => {
        console.log(err)
        this.confirmPayLoading = false
        this.$message({
          content: this.$t('confirmPayFail'),
        })
      })
    },
    confirmPay () {
      console.log('confirmPay')
      this.confirmPayLoading = true
      const url = '/common/payment/'
      this.$fetch(url, {
        data: {
          orderno: this.orderNo,
          paymentMethod: this.paymentMethod,
        },
        method: 'post',
      }).then(resp => {
        console.log(resp)
        // this.confirmPayLoading = false
        this.payOption = {
          ...resp.data,
        }
        this.$nextTick(this.jsSdk())
      }).catch(err => {
        console.log(err)
        this.confirmPayLoading = false
        this.$message({
          content: this.$t('confirmPayFail'),
        })
      })
    }
  },
}
</script>

<style lang="less">
#pay-confirm {
  width: 100vw;
  height: 100vh;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  header {
    width: 100%;
    height: 135px;
    padding: 25px 30px;
    background: #fff;

    p {
      margin: 0;

      &:not(:last-of-type) {
        margin-bottom: 5px;
      }

      &.order-type {
        font-size: 14px;
        color: #000000;
      }

      &.payment-amount {
        font-size: 24px;
        color: #B99F85;
      }

      &.count-down {
        font-size: 14px;
        color: #999999;
      }
    }
  }

  .payment-ways {
    margin-top: 12px;

    .van-cell {
      height: 76px;
      align-items: center;

      .my-svg {
        width: 20px;
      }

      .van-cell__title {
        margin-left: 8px;
        font-size: 16px;
        color: #000000;
        text-align: left;
      }

      .my-radio-square {
        justify-content: flex-end;
        margin-bottom: 0;
      }
    }
  }

  .my-button {
    position: fixed;
    bottom: 0;
    z-index: 999;
  }
}
</style>
