<template>
  <div id="rent-detail">
    <section class="product-info">
    </section>
    <section class="rent-selection">
      <header>
        <span class="rent-selection__title">
          {{ $t('chooseRentType') }}
        </span>
        <router-link to="/how-to-rent">
          <span class="rent-selection__how-to-rent">
            {{ $t('howToRent') }}
          </span>
        </router-link>
      </header>
      <section class="rent-selection__tabs">

      </section>
    </section>
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
  data () {
    return {
      serviceNo: '',
      serviceType: 0, // 0: rental, 1: package
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
  computed: {
    showTotalText: function () {
      return this.serviceType
        ? this.$t('totalPackage', [this.rent.totalAmount])
        : this.$t('totalRent', [this.rent.rentPeriod, this.rent.totalAmount])
    },
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
  background: #F5F5F5;

  .product-info {
    width: 100%;
    height: 128px;
    background: #fff;
  }

  .rent-selection {
    margin-top: 12px;
    width: 100%;
    background: #fff;

    header {
      width: 100%;
      padding: 24px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .rent-selection__title {
        font-size: 16px;
        color: #000000;
        line-height: 14px;
      }

      .rent-selection__how-to-rent {
        font-size: 14px;
        color: #B99F85;
        text-align: left;
        text-decoration: underline;
      }
    }

    .rent-selection__tabs {
      width: 100%;
      padding: 0 18px;

    }
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
