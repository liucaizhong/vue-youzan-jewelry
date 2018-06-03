<template>
  <div id="rent-detail">
    <footer class="rent-detail__footer">
      <div class="show-total van-ellipsis">
        {{ $t('totalRent', [rent.rentPeriod, rent.totalAmount] )}}
      </div>
      <van-button
        class="my-button pay-btn"
        type="default"
        bottom-action
        @click="onPayment"
      >{{ $t('payment') }}</van-button>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      serviceNo: '',
      rent: {
        rentPeriod: '10',
        totalAmount: '4999',
      },
    }
  },
  created () {
    console.log('$route', this.$route)
    this.serviceNo = this.$route.params.id
  },
  methods: {
    onPayment () {
      console.log('onPayment')
    },
  },
}
</script>

<style lang="less">
#rent-detail {
  margin-bottom: 50px;
  overflow: auto;

  .rent-detail__footer {
    width: 100%;
    height: 50px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;

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
