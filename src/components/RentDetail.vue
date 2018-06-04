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
        <div
          :class="['rent-selection__tabs-block', { active: serviceType === 0 }]"
          @click="changeServiceType(0)"
        >
          <p class="title">{{ $t('rentAProduct') }}</p>
          <p class="desc">{{ $t('moneyPerDay', [rentDetail.rent]) }}</p>
        </div>
        <div
          :class="['rent-selection__tabs-block', { active: serviceType === 1 }]"
          @click="changeServiceType(1)"
        >
          <p class="title">{{ $t('rentByPackage') }}</p>
          <p class="desc">{{ $t('changeInPackageFreely') }}</p>
        </div>
      </section>
      <section class="rent-selection__tabs-content">
        <keep-alive>
          <div v-if="serviceType" class="rent-package">
            package service
          </div>
          <div v-else class="rent-single">
            <my-picker
              :confirmBtnText="$t('complete')"
              :cancelBtnText="$t('close')"
              :placeholder="$t('chooseRentPeriod')"
              :columns="rentAmountColumns"
              showToolbar
              @confirm="confirmRentPeriod"
              @change="changeRentPeriod"
            />
          </div>
        </keep-alive>
        <p class="deposit">{{ $t('deposit', [rentDetail.deposit]) }}</p>
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
import MyPicker from './MyPicker'

export default {
  components: {
    MyPicker,
  },
  data () {
    return {
      productid: '',
      serviceType: 0, // 0: rental, 1: package
      rentDetail: {
        rent: '10',
        rentPeriod: '0',
        totalAmount: '0',
        deposit: '2000',
        rentcycle: '10',
      },
      rentAmountColumns: [],
      countPerTurn: 100,
    }
  },
  created () {
    console.log('$route', this.$route)
    this.productid = this.$route.params.id
    this.rentAmountColumns = this.rentAmountColumns.concat(this.mockrentAmountColumns())
  },
  computed: {
    showTotalText: function () {
      return this.serviceType
        ? this.$t('totalPackage', [this.rentDetail.totalAmount])
        : this.$t('totalRent', [this.rentDetail.rentPeriod, this.rentDetail.totalAmount])
    },
  },
  methods: {
    onPayment () {
      console.log('onPayment')
    },
    changeServiceType (type) {
      this.serviceType = type
    },
    mockrentAmountColumns () {
      const count = this.rentAmountColumns.length
      const firstValue = (count &&
        +this.getPeriodRentFromPicker(this.rentAmountColumns[count - 1])[0]) ||
        +this.rentDetail.rentPeriod
      const resArr = []
      for (let i = 0; i < this.countPerTurn;) {
        ++i
        resArr.push(this.$t('rentPickerValue', [
          firstValue + i,
          (firstValue + i) * this.rentDetail.rent,
        ]))
      }
      return resArr
    },
    getPeriodRentFromPicker (val) {
      const match = val.match(/(\d+)/g)
      console.log('match', match)
      return match
    },
    confirmRentPeriod (val, idx) {
      console.log('confirmRentPeriod', val)
      const match = this.getPeriodRentFromPicker(val)
      this.rentDetail.rentPeriod = match[0]
      this.rentDetail.totalAmount = `${+this.rentDetail.deposit + +match[1]}`
    },
    changeRentPeriod (val, idx) {
      const count = this.rentAmountColumns.length
      if (idx === count - 1) {
        this.rentAmountColumns = this.rentAmountColumns.concat(this.mockrentAmountColumns())
      }
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
    padding: 24px 18px 50px;

    header {
      width: 100%;
      // padding: 24px 18px;
      margin-bottom: 24px;
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
      // padding: 0 18px;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;

      .rent-selection__tabs-block {
        width: 160px;
        height: 80px;
        border: 1px solid #D6D6D6;

        .title {
          font-size: 16px;
          color: #000000;
          line-height: 14px;
          text-align: center;
        }

        .desc {
          font-size: 12px;
          text-align: center;
          line-height: 14px;
          color: #000000;
        }

        &.active {
          border-color: #B99F85;

          .title {
            color: #B99F85;
          }

          .desc {
            color: #B99F85;
          }
        }
      }
    }

    .rent-selection__tabs-content {
      .deposit {
        margin-top: 15px;
        font-size: 12px;
        color: #999999;
        line-height: 14px;
      }
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
