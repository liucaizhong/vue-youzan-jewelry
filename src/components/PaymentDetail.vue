<template>
  <div id="payment-detail" class="scroll-fix">
    <section class="payment-detail__info">
      <van-card
        class="my-card"
        :title="productTitle"
        :desc="productDesc"
        :price="reservedProduct.sellingPrice"
        v-if='!nopr'
      >
        <img v-lazy="reservedProduct.mainimage" slot="thumb">
      </van-card>
      <van-card v-else
        class="my-card package-info"
        :title="packageInfo.title"
        num="1"
      />
    </section>
    <div class="van-hairline--top" />
    <section v-if="orderType ==='6'" class="payment-detail__price">
      <div class="some-price">
        <span class="label">{{ $t('priceOffset')}}</span>
        <span class="value">{{ $n(totalAmount, 'currency') }}</span>
      </div>
      <div class="total">
        <span class="label">{{ $t('totalAmount') }}</span>
        <span class="value">{{ $n(totalAmount, 'currency')}}</span>
      </div>
    </section>
    <section v-else-if="orderType ==='7'" class="payment-detail__price">
      <div class="some-price" v-if="totalAmount >= 0">
        <span class="label">{{ $t('sellingPrice')}}</span>
        <span class="value">{{ $n(reservedProduct.sellingPrice, 'currency') }}</span>
      </div>
      <div class="some-price" v-if="totalAmount >= 0">
        <span class="label">{{ $t('rentPrice')}}</span>
        <span class="value">{{ '-' + $n(rent, 'currency') }}</span>
      </div>
      <div class="some-price" v-if="totalAmount >= 0">
        <span class="label">{{ $t('deposit', [''])}}</span>
        <span class="value">{{ '-' + $n(deposit, 'currency') }}</span>
      </div>
      <div class="total" v-if="totalAmount >= 0">
        <span class="label">{{ $t('priceOffset') }}</span>
        <span class="value">{{ $n(totalAmount, 'currency')}}</span>
      </div>
      <div class="some-price" v-if="totalAmount < 0">
        <span class="label">{{ $t('rentPrice')}}</span>
        <span class="value">{{ $n(rent, 'currency') }}</span>
      </div>
      <div class="some-price" v-if="totalAmount < 0">
        <span class="label">{{ $t('deposit', [''])}}</span>
        <span class="value">{{ $n(deposit, 'currency') }}</span>
      </div>
      <div class="some-price" v-if="totalAmount < 0">
        <span class="label">{{ $t('sellingPrice')}}</span>
        <span class="value">{{ '-' + $n(reservedProduct.sellingPrice, 'currency') }}</span>
      </div>
      <div class="total" v-if="totalAmount < 0">
        <span class="label">{{ $t('returnDeposit', ['']) }}</span>
        <span class="value">{{ $n(Math.abs(totalAmount, 'currency')) }}</span>
      </div>
    </section>
    <section v-else class="payment-detail__price">
      <div class="some-price" v-if="rentPeriod">
        <span class="label">{{ $t('rentPeriod', [rentPeriod])}}</span>
        <span class="value">{{ $n(rent, 'currency') }}</span>
      </div>
      <div class="some-price" v-if="deposit">
        <span class="label">{{ $t('deposit', ['']) }}</span>
        <span class="value">{{ $n(deposit, 'currency') }}</span>
      </div>
      <div class="total">
        <span class="label">{{ $t('totalAmount') }}</span>
        <span class="value">{{ $n(totalAmount, 'currency')}}</span>
      </div>
    </section>
    <section class="payment-detail__delivery" v-if="!nopr && (orderType !=='6' && orderType !== '7')">
      <span class="header">{{ $t('deliveryMode') }}</span>
      <van-radio-group
        class="mode-group"
        v-model="deliveryMode"
      >
        <my-radio
          v-for="(item, i) in deliveryModes"
          :key="item.key"
          :radioType="deliveryMode"
          :radioName="`${i}`"
        >
          <template slot="title">{{ $t(item.name) }}</template>
          <div v-show="deliveryMode === `${i}`" slot="content">
            <div v-if="item.key === '1'">
              <p
                class="content"
                v-for="i in [1, 2]"
                :key="i"
              >
                {{ $t(`paymentSuccessDescLine${i}`) }}
              </p>
            </div>
            <edit-receiver
              v-else-if="item.key === '0'"
              :form.sync="receiverForm"
            />
          </div>
        </my-radio>
      </van-radio-group>
    </section>
    <section class="payment-detail__others">
      <van-cell-group>
        <van-cell
          class="my-cell"
          :title="$t('sendInvoice')"
          is-link
          center
        />
        <van-cell class="my-cell" center v-if="totalAmount > 0">
          <div slot="title">
            <span>{{ $t('useBalance') }}</span>
            <span class="subtitle">{{ $t('curBalance', [$n(userBalance, 'currency')])}}</span>
          </div>
          <van-switch
            v-model="useBalance"
            class="my-switch"
          />
        </van-cell>
      </van-cell-group>
    </section>
    <footer class="payment-detail__footer">
      <div class="show-total van-ellipsis">
        {{ totalPayAmountText }}
      </div>
      <van-button
        class="my-button pay-btn"
        type="default"
        bottom-action
        @click="onConfirmPay"
        :loading="confirmPayLoading"
      >
        {{ paymentBtnText }}
      </van-button>
    </footer>
    <van-dialog
      class="my-dialog"
      v-model="showConfirmBalanceDeduction"
      show-cancel-button
      :title="$t('balanceDeductionTip')"
      :message="$n(totalAmount, 'currency')"
      :confirmButtonText="$t('confirmPayBtnText')"
      :cancelButtonText="$t('cancelPayBtnText')"
      @confirm="confirmBalanceDeduction"
    >
    </van-dialog>
    <van-dialog
      class="my-dialog"
      v-model="showConfirmWithoutPay"
      show-cancel-button
      :title="$t('confirmBuy')"
      :message="$t('confirmWithoutPayDesc')"
      :confirmButtonText="$t('confirm')"
      :cancelButtonText="$t('cancelPayBtnText')"
      @confirm="confirmWithoutPay"
    >
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyRadio from './MyRadio'
import EditReceiver from './EditReceiver'
import { DELIVERYMODE, CATEGORYOFPRODUCT } from '@/constant'
import bus from '@/eventBus'

export default {
  components: {
    MyRadio,
    EditReceiver,
  },
  data () {
    return {
      id: '',
      type: '0', // 0: one, 1: package, 2: buy
      orderType: '',
      nopr: false,
      showConfirmWithoutPay: false,
      showConfirmBalanceDeduction: false,
      deliveryModes: DELIVERYMODE,
      deliveryMode: DELIVERYMODE[1].key,
      productCategory: CATEGORYOFPRODUCT,
      confirmPayLoading: false,
      totalAmount: '',
      // priceOffset: 0,
      // returnDeposit: 0,
      useBalance: false,
      deposit: '',
      rent: '',
      rentPeriod: 0,
      receiverForm: {
        gender: '0',
        lastName: '',
        firstName: '',
        phone: '',
        area: [],
        address: '',
        remark: '',
      },
      reservedProduct: {
        mainimage: '',
        brand: '',
        category: '',
        model: '',
        sellingPrice: '',
        series: '',
        title: '',
      },
      packageInfo: {
        title: '',
        deposit: '',
        price: '',
        id: '',
        period: '',
      },
    }
  },
  created () {
    console.log('$route', this.$route)
    this.id = this.$route.params.id
    this.type = this.$route.query.type || '0'
    this.nopr = !!this.$route.query.nopr
    this.orderType = this.$route.query.orderType

    switch (this.type) {
      case '0': {
        const url = '/client/RentalService/'
        this.$fetch(url, {
          params: {
            serviceNo: this.id,
          },
        }, true).then(resp => {
          console.log('resp', resp)
          const serviceInfo = resp.data.results[0]
          const { 'current_payamount': totalAmount, initialDeposit, initialRent,
            rentPeriod } = serviceInfo
          this.deposit = initialDeposit
          this.rent = initialRent
          if (this.orderType === '7') {
            this.totalAmount = this.$roundTo2Decimal(
              (parseFloat(serviceInfo.reservedProduct.sellingPrice) || 0) -
              (parseFloat(initialRent) || 0) -
              (parseFloat(initialDeposit) || 0))
          } else {
            this.totalAmount = totalAmount
          }
          this.rentPeriod = rentPeriod
          this.reservedProduct = {
            ...serviceInfo.reservedProduct,
          }
        }).catch(err => {
          console.log(err)
        })
        break
      }
      case '1': {
        // if (this.nopr) {
        //   const url = '/client/package/'
        //   this.$fetch(url, {
        //     params: {
        //       packageNo: this.id,
        //     },
        //   }, true).then(resp => {
        //     console.log('resp', resp)
        //     const info = resp.data.results[0]
        //     this.packageInfo = {
        //       ...info,
        //     }
        //     const { deposit, period, price } = info
        //     this.deposit = deposit
        //     this.rent = price
        //     this.rentPeriod = period
        //     this.totalAmount = parseFloat(deposit) + parseFloat(price)
        //   }).catch(err => {
        //     console.log(err)
        //   })
        // }
        const url = '/client/ComboService/'
        this.$fetch(url, {
          params: {
            serviceNo: this.id,
          },
        }, true).then(resp => {
          console.log('resp', resp)
          const serviceInfo = resp.data.results[0]
          const { 'current_payamount': totalAmount, initialDeposit, initialRent,
            rentPeriod } = serviceInfo
          if (this.orderType === '6') {
            this.totalAmount = serviceInfo.product.sellingPrice
          } else {
            this.totalAmount = totalAmount
          }
          this.deposit = initialDeposit
          this.rent = initialRent
          this.rentPeriod = rentPeriod
          this.reservedProduct = serviceInfo.reservedProduct ? {
            ...serviceInfo.reservedProduct,
          } : {
            ...serviceInfo.product,
          }
          this.packageInfo = {
            ...serviceInfo.packageshot,
          }
        }).catch(err => {
          console.log(err)
        })
        break
      }
      case '2': {
        const url = '/client/ProductDetail/'
        this.$fetch(url, {
          params: {
            productid: this.id,
          },
        }, true).then(resp => {
          console.log('resp', resp)
          const { MainImage0, sellingPrice, title, series, category } = resp.data.results[0]

          this.reservedProduct = {
            mainimage: MainImage0 && MainImage0.avatar,
            sellingPrice,
            title,
            series,
            category,
          }
          this.totalAmount = sellingPrice
        }).catch(err => {
          console.log(err)
        })
        break
      }
    }

    const that = this
    bus.$on('receiverValidationResult', function (valid) {
      console.log('valid', valid)
      if (valid) {
        // that.confirmPayRequest()
        if (that.totalPayAmount) {
          that.confirmPayRequest()
        } else {
          if (that.orderType === '7' && !that.useBalance) {
            that.showConfirmWithoutPay = true
          } else {
            that.showConfirmBalanceDeduction = true
          }
        }
      }
    })
  },
  mounted () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )
  },
  beforeDestroy () {
    bus.$off('receiverValidationResult')
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
  computed: {
    paymentBtnText: function () {
      return this.totalAmount < 0 ? this.$t('confirm') : this.$t('confirmPay')
    },
    totalPayAmountText: function () {
      if (this.totalAmount < 0) {
        return this.$t('returnDeposit', [this.$n(Math.abs(this.totalPayAmount), 'currency')])
      } else {
        return this.$t('totalPayAmount', [this.$n(this.totalPayAmount, 'currency')])
      }
    },
    productTitle: function () {
      return (this.reservedProduct.series ? this.reservedProduct.series + '-' : '') +
        this.reservedProduct.title
    },
    productDesc: function () {
      const category = this.productCategory.find(cur => {
        return cur.key === this.reservedProduct.category
      })

      return (category && this.$t(category.name)) || ''
    },
    totalPayAmount: function () {
      if (this.useBalance) {
        return Math.max(this.totalAmount - this.userBalance, 0)
      } else {
        return this.totalAmount
      }
    },
    ...mapState({
      userBalance: state => state.userInfo.balance,
    }),
  },
  methods: {
    formShipInfo () {
      const postData = {}
      if (this.deliveryMode === '0') {
        const { gender, lastName, firstName, phone, area, address, remark } = this.receiverForm
        postData.gender = gender
        postData.name = lastName + firstName
        postData.phone = phone
        postData.address = area.reduce((cum, cur) => {
          return cum + (cur.code !== '-1' ? cur.name + ' ' : '')
        }, '') + address
        if (remark) {
          postData.remark = remark
        }
      }
      return postData
    },
    onConfirmPay () {
      console.log('onConfirmPay')
      if (this.deliveryMode === '0') {
        bus.$emit('receiverValidation')
      } else {
        if (this.totalPayAmount) {
          this.confirmPayRequest()
        } else {
          if (this.orderType === '7' && !this.useBalance) {
            this.showConfirmWithoutPay = true
          } else {
            this.showConfirmBalanceDeduction = true
          }
        }
      }
    },
    confirmBalanceDeduction () {
      this.confirmPayRequest()
    },
    confirmWithoutPay () {
      this.confirmPayRequest()
    },
    confirmPayRequest () {
      console.log('ordertype', this.type)
      this.confirmPayLoading = true
      if (this.type === '2') {
        const url = '/client/SellService/'
        this.$fetch(url, {
          data: {
            reservedProductid: this.id,
            sellingPrice: this.reservedProduct.sellingPrice,
            serviceType: this.type,
            orderType: this.orderType || this.type,
            deliveryMode: this.deliveryMode,
            useBalance: +this.useBalance,
            ...this.formShipInfo(),
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          const { orderNo, payedamount, orderStatus } = resp.data
          this.confirmPayLoading = false
          if (orderStatus === '0') {
            this.$router.replace(
              `/confirm-pay?id=${[orderNo]}&total=${payedamount}&due=${Date.now()}`
            )
          } else {
            this.$router.replace('/payment-success')
          }
        }).catch(err => {
          console.log(err)
          this.confirmPayLoading = false
          this.$message({
            content: this.$t('paymentFail'),
          })
        })
      } else {
        if (this.orderType === '7') {
          const url = '/client/RentalService/buy/'
          this.$fetch(url, {
            data: {
              serviceNo: this.id,
              serviceType: this.type,
              orderType: this.orderType || this.type,
              deliveryMode: this.deliveryMode,
              useBalance: +this.useBalance,
              // ...this.formShipInfo(),
            },
            method: 'post',
          }).then(resp => {
            console.log(resp)
            const { result, order } = resp.data
            this.confirmPayLoading = false
            if (!result) {
              const { orderNo, payedamount } = order
              console.log('confirmwithoutpay', payedamount)
              if (parseFloat(payedamount) > 0.01) {
                this.$router.replace(
                  `/confirm-pay?id=${[orderNo]}&total=${payedamount}&due=${Date.now()}`
                )
              } else {
                // jump to pay success page
                this.$router.replace('/payment-success')
              }
            }
          }).catch(err => {
            console.log(err)
            this.confirmPayLoading = false
            this.$message({
              content: this.$t('paymentFail'),
            })
          })
        } else {
          const url = '/common/order/'
          this.$fetch(url, {
            data: {
              serviceNo: this.id,
              serviceType: this.type,
              orderType: this.orderType || this.type,
              deliveryMode: this.deliveryMode,
              useBalance: +this.useBalance,
              ...this.formShipInfo(),
            },
            method: 'post',
          }).then(resp => {
            console.log(resp)
            const { orderNo, payedamount, orderStatus } = resp.data
            this.confirmPayLoading = false
            if (orderStatus === '0') {
              this.$router.replace(
                `/confirm-pay?id=${[orderNo]}&total=${payedamount}&due=${Date.now()}`
              )
            } else {
              // jump to pay success page
              this.$router.replace('/payment-success')
            }
          }).catch(err => {
            console.log(err)
            this.confirmPayLoading = false
            this.$message({
              content: this.$t('paymentFail'),
            })
          })
        }
      }
    },
    // onChangeUseBalance (checked) {
    //   if (checked) {
    //     this.totalAmount -= this.userBalance
    //   } else {
    //     this.totalAmount += this.userBalance
    //   }
    // },
  },
}
</script>

<style lang="less">
#payment-detail {
  width: 100vw;
  height: 100vh;
  // padding-bottom: 60px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F5;

  .payment-detail__price {
    background: #fff;
    padding: 18px;
    margin-bottom: 12px;

    .some-price {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      span {
        font-size: 14px;
        color: #6C6C6C;
        line-height: 18px;
      }
    }

    .total {
      display: flex;
      justify-content: space-between;
      padding-top: 6px;

      span {
        font-size: 16px;
        color: #B99F85;
        // line-height: 16px;
      }
    }
  }

  .payment-detail__delivery {
    margin-bottom: 12px;
    background: #fff;
    padding: 20px 18px;

    .header {
      font-size: 14px;
      color: #000000;
      text-align: left;
      line-height: 16px;
      margin: 0;
    }

    .mode-group {
      margin-top: 30px;

      .van-radio__label {
        font-size: 14px;
        color: #000000;
        line-height: 20px;
      }

      .content {
        font-size: 14px;
        color: #AFAFAF;
        margin: 0;
        margin-top: 10px;
      }
    }
  }

  .payment-detail__footer {
    width: 100%;
    height: 50px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;

    .show-total {
      flex: 1;
      background: #FFFFFF;
      font-size: 16px;
      color: #B99F85;
      border-top: .5px solid #e5e5e5;
      text-align: left;
      line-height: 50px;
      padding-left: 18px;
    }

    .pay-btn {
      max-width: 120px;
    }
  }

  .payment-detail__others {
    margin-bottom: 60px;
    .van-cell__title {
      min-width: 250px;
    }
  }

  .package-info {
    padding-left: 18px;
    height: 60px;

    .van-card__thumb {
      display: none;
    }

    .van-card__content {
      display: flex;
      justify-content: space-between;

      .van-card__row {
        margin-bottom: 0;
      }
    }
  }
}
</style>
