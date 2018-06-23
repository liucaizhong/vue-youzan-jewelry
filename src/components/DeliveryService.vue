<template>
  <div v-if="serviceData.length" id="delivery-service">
    <van-list
      class="delivery-service-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadmore"
      :loading-text="$t('loadMore')"
      :immediate-check="false"
    >
      <my-service-card
        v-for="(info, i) in serviceData"
        :key="i"
        :tab="1"
        :serviceInfo="info"
      >
        <my-order-card
          :orders="info.order"
        />
      </my-service-card>
    </van-list>
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
      loading: false,
      finished: false,
      offset: 0,
      limit: 15,
      serviceData: [],
      // serviceData: [{
      //   serviceNo: '2312313123131313',
      //   serviceType: '0',
      //   rentStartDate: '2018-06-16',
      //   rentDueDate: '2018-07-16',
      //   rentPeriod: '30',
      //   totalAmount: '2000.00',
      //   initialDeposit: '1000.00',
      //   initialRent: '1500.00',
      //   packageTitle: '3月/90天随心换套餐',
      //   packagePrice: '2080.00',
      //   balanceDeduction: '500.00',
      //   product: {
      //     mainimage: '',
      //     series: '经典系列',
      //     title: '无敌套装',
      //     category: '1',
      //     productid: '000001',
      //     brand: 'theia',
      //     sellingPrice: '1000.00',
      //   },
      //   // product: null,
      //   orders: [{
      //     orderNo: '23131313',
      //     orderType: '0',
      //     amount: '2000.00',
      //     createDate: '2018-06-18 12:30:20',
      //     paymentDatetime: '2018-06-18 12:40:20',
      //     orderStatus: '0',
      //     balanceDeduction: '500.00',
      //     paymentMethod: '0',
      //     // paymentOrderNo: 'dfas123123',
      //     // paymentDueDatetime: '2018-06-18 12:45:20',
      //   }, {
      //     orderNo: '231313133232',
      //     orderType: '1',
      //     amount: '2000.00',
      //     createDate: '2018-06-18 12:30:20',
      //     paymentDatetime: '2018-06-18 12:40:20',
      //     orderStatus: '1',
      //     balanceDeduction: '500.00',
      //     paymentMethod: '0',
      //     // paymentOrderNo: 'dfas123123',
      //     // paymentDueDatetime: '2018-06-18 12:45:20',
      //   }],
      // }],
    }
  },
  watch: {
    '$attrs': {
      immediate: true,
      handler: function (val, oldVal) {
        if (val.active) {
          console.log('this.$attrs', val.api)
          this.api = val.api
          this.offset = 0
          this.getService(val.api, true)
        }
      }
    },
  },
  methods: {
    onLoadmore () {
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
#delivery-service {
  width: 100%;
  // height: 100%;
  position: relative;
}
</style>
