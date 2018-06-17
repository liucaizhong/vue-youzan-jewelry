<template>
  <div id="payment-detail">
    <section class="payment-detail__info">
      <van-card
        class="my-card"
        :title="productTitle"
        :desc="productDesc"
        :price="reservedProduct.sellingPrice"
      >
        <img v-lazy="reservedProduct.mainimage" slot="thumb">
      </van-card>
    </section>
    <div class="van-hairline--top" />
    <section class="payment-detail__price">
      <div class="some-price">
        <span class="label">{{ $t('rentPeriod', [rentPeriod])}}</span>
        <span class="value">{{ $n(rent, 'currency') }}</span>
      </div>
      <div class="some-price">
        <span class="label">押金</span>
        <span class="value">{{ $n(deposit, 'currency') }}</span>
      </div>
      <div class="total">
        <span class="label">{{ $t('totalAmount') }}</span>
        <span class="value">{{ $n(totalAmount, 'currency')}}</span>
      </div>
    </section>
    <section class="payment-detail__delivery">
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
              上海市静安区
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
        <van-cell class="my-cell" center>
          <div slot="title">
            <span>{{ $t('useBalance') }}</span>
            <span class="subtitle">{{ $t('curBalance', [$n('3500', 'currency')])}}</span>
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
        {{ $t('totalPayAmount', [$n(totalAmount, 'currency')] )}}
      </div>
      <van-button
        class="my-button pay-btn"
        type="default"
        bottom-action
        @click="onConfirmPay"
        :loading="confirmPayLoading"
      >{{ $t('payment') }}</van-button>
    </footer>
  </div>
</template>

<script>
import MyRadio from './MyRadio'
import EditReceiver from './EditReceiver'
import { DELIVERYMODE, CATEGORYOFPRODUCT } from '@/constant'

export default {
  components: {
    MyRadio,
    EditReceiver,
  },
  data () {
    return {
      id: '',
      type: 0, // 0: one, 1: package, 2: buy
      deliveryModes: DELIVERYMODE,
      deliveryMode: DELIVERYMODE[1].key,
      productCategory: CATEGORYOFPRODUCT,
      confirmPayLoading: false,
      totalAmount: '',
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
    }
  },
  created () {
    console.log('$route', this.$route)
    this.id = this.$route.params.id
    this.type = this.$route.query.type

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
      this.totalAmount = totalAmount
      this.deposit = initialDeposit
      this.rent = initialRent
      this.rentPeriod = rentPeriod
      this.reservedProduct = {
        ...serviceInfo.reservedProduct,
      }
    }).catch(err => {
      console.log(err)
    })

    this.$eventHub.$on('receiverValidationResult', valid => {
      console.log('valid', valid)
      if (!valid) {
        this.$message({
          content: this.$t('shippingInvalid'),
        })
      } else {
        this.confirmPayRequest()
      }
    })
  },
  computed: {
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
        this.$eventHub.$emit('receiverValidation')
      } else {
        this.confirmPayRequest()
      }
    },
    confirmPayRequest () {
      this.confirmPayLoading = true
      const fieldName = this.type !== 2 ? 'serviceNo' : 'reservedProductid'
      const url = '/common/order/'
      console.log('ordertype', this.type)
      this.$fetch(url, {
        data: {
          [fieldName]: this.id,
          serviceType: this.type,
          orderType: this.type,
          deliveryMode: this.deliveryMode,
          useBalance: +this.useBalance,
          ...this.formShipInfo(),
        },
        method: 'post',
      }).then(resp => {
        console.log(resp)
        const { orderNo, payedamount } = resp.data
        this.confirmPayLoading = false
        this.$router.replace(
          `/confirm-pay?id=${orderNo}&total=${payedamount}&due=${Date.now()}`
        )
      }).catch(err => {
        console.log(err)
        this.confirmPayLoading = false
        this.$message({
          content: this.$t('paymentFail'),
        })
      })
    },
  },
}
</script>

<style lang="less">
#payment-detail {
  width: 100vw;
  height: 100vh;
  padding-bottom: 60px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F5;

  .payment-detail__price {
    background: #fff;
    padding: 18px;

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
    margin: 12px 0;
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
    .van-cell__title {
      min-width: 250px;
    }
  }
}
</style>
