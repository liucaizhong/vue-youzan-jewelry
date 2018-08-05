<template>
  <div class="my-order-card">
    <van-collapse v-model="activeOrders">
      <van-collapse-item
        v-for="(order, i) in orders"
        :key="i"
        :name="i"
      >
        <div class="header" slot="title">
          <div class="title van-ellipsis">{{ $t('orderNo') + ': ' + order.orderNo }}</div>
          <div
            v-if="order.orderStatus === '0'"
            class="extra"
          >
            {{ $t('waitToPay') }}
          </div>
        </div>
        <div class="content">
          <div class="row">{{ $t('orderType') + ': ' + $t(`orderType${order.orderType}`) }}</div>
          <div class="row">{{ $t('createDatetime') + ': ' + order.createDate }}</div>
          <div class="row">{{ $t('orderStatus') + ': ' + $t(`orderStatus${order.orderStatus}`) }}</div>
          <!-- <div v-if="order.orderStatus === '0'" class="row">
            {{ $t('paymentOrderNo') + ': ' + order.paymentOrderNo }}
          </div> -->
          <div v-if="order.orderStatus !== '0'" class="row">
            {{ $t('paymentType') + ': ' + $t(`paymentType${order.paymentMethod}`) }}
          </div>
          <div v-if="order.orderStatus === '0'" class="row">
            {{ $t('paymentDueDatetime') + ': ' + calcPaymentDueDatetime(order.createDate).show }}
          </div>
          <div v-else-if="order.paymentDatetime" class="row">
            {{ $t('paymentDatetime') + ': ' + order.paymentDatetime }}
          </div>
          <div class="row" v-if="order.amount">
            {{ $t('orderAmount') + ': ' + $n(order.amount, 'currency') }}
          </div>
          <div class="row" v-if="order.balanceDeduction">
            {{ $t('balanceDeduction') + ': ' + $n(order.balanceDeduction, 'currency') }}
          </div>
          <div class="row">
            {{ paymentAmount(order) }}
          </div>
          <van-button
            v-if="order.orderStatus === '0'"
            class="my-button"
            type="default"
            bottom-action
            @click="confirmPay(order.orderNo, toPayAmount(order), order.createDate, order.orderType)"
          >{{ $t('confirmPay') }}</van-button>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { ORDERSTATUS, ORDERTIMEOUT } from '@/constant'

export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      activeOrders: [],
      orderStatus: ORDERSTATUS,
      orderTimeout: ORDERTIMEOUT,
    }
  },
  methods: {
    toPayAmount (order) {
      const { amount, balanceDeduction } = order
      return Math.max(0, parseFloat(amount) - parseFloat(balanceDeduction))
    },
    paymentAmount (order) {
      const { orderStatus, amount, balanceDeduction } = order
      return (orderStatus === '0' ? this.$t('toPayAmount') : this.$t('paymentAmount')) +
              ': ' + this.$n(Math.max(0, parseFloat(amount) - parseFloat(balanceDeduction)), 'currency')
    },
    confirmPay (id, total, start, orderType) {
      const dueDateValue = this.calcPaymentDueDatetime(start).value
      console.log('dueDate', dueDateValue)
      let url = `/confirm-pay?id=${[id]}&total=${total}&due=${dueDateValue}`
      if (orderType === '3' || orderType === '7') {
        url += '&serviceTab=3'
      } else if (orderType === '6') {
        url += '&serviceTab=2'
      }
      this.$router.push(url)
    },
    getLocalTime (d) {
      const seconds = d.getTime()
      const offset = d.getTimezoneOffset() * 60000
      return new Date(seconds + offset)
    },
    calcPaymentDueDatetime (start) {
      const [startDate, startTime] = start.split` `
      const [startYear, startMonth, startDay] = startDate.split`-`
      const startUTC = Date.UTC(startYear, startMonth - 1, startDay, ...startTime.split`:`)
      const dueDate = new Date(this.getLocalTime(new Date(startUTC + this.orderTimeout)))
      const year = dueDate.getFullYear()
      let month = dueDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      const day = dueDate.getDate() < 10 ? '0' + dueDate.getDate() : dueDate.getDate()
      const hour = dueDate.getHours() < 10 ? '0' + dueDate.getHours() : dueDate.getHours()
      const min = dueDate.getMinutes() < 10 ? '0' + dueDate.getMinutes() : dueDate.getMinutes()
      const second = dueDate.getSeconds() < 10 ? '0' + dueDate.getSeconds() : dueDate.getSeconds()

      return {
        value: startUTC.valueOf(),
        show: `${year}-${month}-${day} ${hour}:${min}:${second}`,
      }
    }
  },
}
</script>

<style lang="less">
.my-order-card {
  padding: 0 18px 20px;

  .van-collapse {

    &::after, ::after {
      border-color: #CCB8A3;
    }

    .van-collapse-item {
      .van-cell {
        padding: 20px 0;

        &::after {
          content: none;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-right: 20px;

          .title {
            font-size: 14px;
            flex: 1;
            padding-right: 50px;
          }

          .extra {
            font-size: 14px;
            color: #F01400;
          }
        }
      }

      .van-collapse-item__content {
        padding: 8px 0 28px;

        .content {
          font-size: 14px;
          color: #666666;

          .row {
            margin-bottom: 18px;

            &:last-child {
              margin-bottom: 0;
            }
          }

          .my-button {
            width: 135px !important;
          }
        }
      }
    }
  }
}
</style>
