<template>
  <div id="payment-detail">
    <section class="payment-detail__info">
      <van-card
        class="my-card"
        title="标题"
        desc="描述"
        num="1"
        price="4999.00"
      >
        <img v-lazy="'imgURL'" slot="thumb">
      </van-card>
    </section>
    <div class="van-hairline--top" />
    <section class="payment-detail__price">
      <div class="some-price">
        <span class="label">日租10天</span>
        <span class="value">￥1000</span>
      </div>
      <div class="some-price">
        <span class="label">押金</span>
        <span class="value">￥5000</span>
      </div>
      <div class="total">
        <span class="label">{{ $t('totalAmount') }}</span>
        <span class="value">￥6000</span>
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
            <span class="subtitle">{{ $t('curBalance', ['3500'])}}</span>
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
        {{ $t('totalPayAmount', [totalAmount] )}}
      </div>
      <van-button
        class="my-button pay-btn"
        type="default"
        bottom-action
        @click="onConfirmPay"
        :loading="confirmPayLoading"
      >{{ $t('confirmPay') }}</van-button>
    </footer>
  </div>
</template>

<script>
import MyRadio from './MyRadio'
import EditReceiver from './EditReceiver'
import { DELIVERYMODE } from '@/constant'

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
      confirmPayLoading: false,
      totalAmount: '4999',
      useBalance: false,
      receiverForm: {
        gender: '0',
        lastName: '',
        firstName: '',
        phone: '',
        area: [],
        address: '',
        remark: '',
      },
    }
  },
  created () {
    console.log('$route', this.$route)
    this.id = this.$route.params.id
    this.type = this.$route.query.type
  },
  methods: {
    shipValidation () {
      return Object.keys(this.receiverForm).every(key => {
        if (key === 'remark') {
          return true
        }
        const val = this.receiverForm[key]
        if (key === 'phone') {
          const pattern = /^1[3|5|7|8]\d{9}$/gi
          if (!pattern.test(val)) {
            this.$message({
              content: this.$t('invalidPhoneNo'),
            })
            return false
          }
          return true
        }
        if (typeof val === 'object') {
          return val.every(area => {
            return area.code !== '-1'
          })
        } else if (val) {
          return true
        } else {
          return false
        }
      })
    },
    formShipInfo () {
      const postData = {}
      if (this.deliveryMode === '1') {
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
      if (this.deliveryMode === '1' && !this.shipValidation()) {
        this.$message({
          content: this.$t('shippingInvalid'),
        })
        return false
      }

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
        this.confirmPayLoading = false
        // this.$router.replace(`/payment/${resp.data.serviceNo}?query=0`)
      }).catch(err => {
        console.log(err)
        this.confirmPayLoading = false
        this.$message({
          content: this.$t('confirmPayFail'),
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
        line-height: 16px;
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
}
</style>
