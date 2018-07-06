<template>
  <div v-if="serviceData.length" id="payment-service">
    <van-list
      class="payment-service-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadmore"
      :loading-text="$t('loadMore')"
      :immediate-check="false"
    >
      <my-service-card
        v-for="(info, i) in serviceData"
        :key="i"
        :tab="0"
        checked
        :checkValue.sync="checked[i]"
        :serviceInfo="info"
      >
        <my-order-card
          :orders="info.order"
        />
      </my-service-card>
    </van-list>

    <footer class="payment-service__footer">
      <van-checkbox
        class="my-checkbox"
        v-model="selectAll"
        @change="onSelectAll"
      >
        {{ $t('selectAll') }}
      </van-checkbox>
      <div class="show-total van-ellipsis">
        {{ $t('productAndAmount', [totalSelectedProduct, $n(totalSelectedAmount, 'currency')] )}}
      </div>
      <van-button
        class="my-button pay-btn"
        type="default"
        bottom-action
        @click="onConfirmPay"
      >{{ $t('confirmPay') }}</van-button>
    </footer>
  </div>
  <has-no-service v-else />
</template>

<script>
import HasNoService from './HasNoService'
import MyServiceCard from './MyServiceCard'
import MyOrderCard from './MyOrderCard'

export default {
  components: {
    HasNoService,
    MyServiceCard,
    MyOrderCard,
  },
  data () {
    return {
      api: '',
      selectAll: false,
      checked: [],
      loading: false,
      finished: false,
      offset: 0,
      limit: 15,
      serviceData: [],
    }
  },
  computed: {
    totalSelectedProduct: function () {
      return this.checked.filter(cur => cur).length
    },
    totalSelectedAmount: function () {
      let total = 0
      this.checked.forEach((cur, i) => {
        if (cur) {
          total += +this.serviceData[i].totalAmount
        }
      })
      return total
    },
  },
  watch: {
    '$attrs.active': {
      immediate: true,
      handler: function (val, oldVal) {
        if (val) {
          !this.api && (this.api = this.$attrs.api)
          this.offset = 0
          this.getService(this.api, true)
        }
      }
    },
    checked: {
      deep: true,
      handler: function (val, oldVal) {
        const allSameTrue = val.filter(cur => cur).length === val.length
        console.log('checked', val)
        this.selectAll = allSameTrue
      },
    },
  },
  methods: {
    onSelectAll (b) {
      console.log('onSelectAll', b)
      if (b) {
        this.checked = [...this.checked.fill(b)]
      } else {
        const hasTrue = this.checked.some(cur => cur)
        if (!hasTrue) {
          this.checked = [...this.checked.fill(b)]
        }
      }
    },
    onConfirmPay () {
      const orders = this.checked.reduce((cum, cur, i) => {
        if (cur) {
          cum = cum.concat(this.serviceData[i].order.map(o => o.orderNo))
        }
        return cum
      }, [])
      console.log('confirm pay', orders)
      orders.length && this.$router.push(
        `/confirm-pay?id=${orders}&total=${this.totalSelectedAmount}&due=${Date.now()}`
      )
    },
    onLoadmore () {
      console.log('loadmore')
      this.loading = true
      this.getService(this.api)
    },
    getService (url, loading = false) {
      const { offset, limit } = this.$data
      this.$fetch(url, {
        params: {
          offset: offset * limit,
          limit,
        },
      }, loading).then(resp => {
        console.log('resp', resp)
        ++this.offset
        const results = resp.data.results
        this.serviceData = [...results]
        this.checked = this.checked.concat(new Array(results.length))
        this.loading = false
        if (results.length < this.limit) {
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
#payment-service {
  width: 100%;
  // height: 100%;
  position: relative;
  padding-bottom: 50px;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;

  .payment-service__footer {
    width: 100%;
    height: 50px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;

    .my-checkbox {
      background: #fff;
      border-top: .5px solid #e5e5e5;
      display: flex;
      align-items: center;
      padding-left: 18px;
      font-size: 14px;
    }

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
