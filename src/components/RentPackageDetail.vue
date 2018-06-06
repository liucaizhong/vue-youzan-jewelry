<template>
  <div class="rent-package-detail">
    <keep-alive>
      <van-radio-group
        v-model="packageType"
      >
        <my-radio
          :radioType="packageType"
          :radioName="'0'"
        >
          <template slot="title">{{ $t('useCurrentPackage') }}</template>
          <div v-show="packageType === '0'" slot="content" class="radio0-content">
            content0
          </div>
        </my-radio>
        <my-radio
          :radioType="packageType"
          :radioName="'1'"
        >
          <template slot="title">{{ $t('buyNewPackage') }}</template>
          <div v-show="packageType === '1'" slot="content" class="radio1-content">
            <van-radio-group
              class="sub-radio-group"
              v-model="newPackageSelect"
            >
              <my-radio
                :radioType="newPackageSelect"
                :radioName="'0'"
                radioClass="my-radio-circle"
              >
                <template slot="title">1个月/30天随心换套餐 ￥1000</template>
              </my-radio>
              <my-radio
                :radioType="newPackageSelect"
                :radioName="'1'"
                radioClass="my-radio-circle"
              >
                <template slot="title">2个月/60天随心换套餐 ￥1800</template>
              </my-radio>
            </van-radio-group>
            <p class="deposit">
              {{ $t('package') + $t('deposit', [productDetail.deposit]) }}
            </p>
          </div>
        </my-radio>
      </van-radio-group>
    </keep-alive>
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
import MyRadio from './MyRadio'

export default {
  components: {
    MyRadio,
  },
  props: {
    productDetail: Object,
  },
  data () {
    return {
      rentDetail: {
        totalAmount: '0',
      },
      packageType: '0', // 0: use current, 1: buy new
      curPackageSelect: '0',
      newPackageSelect: '0',
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
  .sub-radio-group {
    margin-top: 25px;
  }

  .deposit {
    margin: 0;
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
