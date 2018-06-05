<template>
  <div class="rent-package-detail">
    <van-radio-group
      v-model="packageType"
    >
      <van-radio
        name="0"
        :class="['my-radio-square', { checked: packageType === '0' }]"
      >
        {{ $t('useCurrentPackage') }}
        <div class="radio0-content" v-show="packageType === '0'">
        </div>
      </van-radio>
      <van-radio
        name="1"
        :class="['my-radio-square', { checked: packageType === '1' }]"
      >
        {{ $t('buyNewPackage') }}
        <div class="radio1-content" v-show="packageType === '1'">
          <p class="deposit">
            {{ $t('package') + $t('deposit', [productDetail.deposit]) }}
          </p>
        </div>
      </van-radio>
    </van-radio-group>
    <footer class="rent-detail__footer">
      <div class="show-total van-ellipsis">
        {{ showTotalText }}
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
  props: {
    productDetail: Object,
  },
  data () {
    return {
      rentDetail: {
        totalAmount: '0',
      },
      packageType: '0', // 0: use current, 1: buy new
    }
  },
  computed: {
    showTotalText: function () {
      return this.$t('totalPackage', [this.rentDetail.totalAmount])
    },
  },
  methods: {
    onPayment () {
      console.log('onPayment')
      this.$router.push(`/payment-rent/${'serviceNo'}`)
    },
  },
}
</script>

<style lang="less">
.rent-package-detail {
  .deposit {
    margin-top: 15px;
    font-size: 12px;
    color: #999999;
    line-height: 14px;
  }
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
