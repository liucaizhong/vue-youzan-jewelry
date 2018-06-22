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
          <div v-if="order.orderStatus === '0'" class="row">
            {{ $t('paymentType') + ': ' + $t(`paymentType${order.paymentMethod}`) }}
          </div>
          <div v-if="order.orderStatus === '0'" class="row">
            {{ $t('paymentDueDatetime') + ': ' + calcPaymentDueDatetime(order.createDate).show }}
          </div>
          <div v-else-if="order.paymentDatetime" class="row">
            {{ $t('paymentDatetime') + ': ' + order.paymentDatetime }}
          </div>
          <div class="row" v-if="order.balanceDeduction">
            {{ $t('balanceDeduction') + ': ' + order.balanceDeduction }}
          </div>
          <div class="row">
            {{ (order.orderStatus === '0' ? $t('paymentAmount') : $t('toPayAmount')) +
              ': ' + order.amount }}
          </div>
          <van-button
            v-if="order.orderStatus === '0'"
            class="my-button"
            type="default"
            bottom-action
            @click="confirmPay(order.orderNo, order.amount, order.createDate)"
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
    confirmPay (id, total, start) {
      const dueDateValue = this.calcPaymentDueDatetime(start).value
      console.log('dueDate', dueDateValue)
      this.$router.push(
        `/confirm-pay?id=${[id]}&total=${total}&due=${dueDateValue}`
      )
    },
    calcPaymentDueDatetime (start) {
      const dueDate = new Date(new Date(start.replace(' ', 'T')).valueOf() + this.orderTimeout)
      const year = dueDate.getFullYear()
      const month = dueDate.getMonth() < 10 ? '0' + dueDate.getMonth() : dueDate.getMonth()
      const day = dueDate.getDate() < 10 ? '0' + dueDate.getDate() : dueDate.getDate()
      const hour = dueDate.getHours() < 10 ? '0' + dueDate.getHours() : dueDate.getHours()
      const min = dueDate.getMinutes() < 10 ? '0' + dueDate.getMinutes() : dueDate.getMinutes()
      const second = dueDate.getSeconds() < 10 ? '0' + dueDate.getSeconds() : dueDate.getSeconds()

      return {
        value: dueDate.valueOf(),
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
