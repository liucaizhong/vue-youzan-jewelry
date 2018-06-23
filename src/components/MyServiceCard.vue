<template>
  <div class="my-service-card">
    <header class="my-service-card__header">
      <div class="service-title van-ellipsis">{{ serviceTitle }}</div>
      <div v-if="tab === 2" v-html="servicePeriod"></div>
      <router-link
        :to="'/service-detail/'+serviceInfo.serviceNo"
        class="service-detail"
      >
        {{ this.$t('detail') }}
      </router-link>
    </header>
    <section class="my-service-card__section">
      <header
        v-if="tab && serviceInfo.serviceType !== '2'"
        class="my-service-card__section-header"
      >
        {{ serviceContentHeader }}
      </header>
      <header
        v-if="serviceInfo.serviceType === '1' && serviceInfo.product"
        class="my-service-card__section-subheader"
      >
        {{ $t('currentProduct') }}
      </header>
      <section class="my-service-card__section-body">
        <div v-if="checked" class="check-part">
          <van-checkbox
            class="my-checkbox"
            v-model="selected"
            @change="onCheck"
          ></van-checkbox>
        </div>
        <div class="service-content">
          <van-card
            v-if="serviceInfo.product"
            class="my-card"
            :title="productTitle"
            :desc="productDesc"
          >
            <img v-lazy="serviceInfo.product.mainimage" slot="thumb">
          </van-card>
          <div
            v-if="!tab && serviceInfo.serviceType === '2' && serviceInfo.product"
            class="product-price"
          >{{ productPrice }}</div>
          <div v-if="!serviceInfo.product" class="has-no-product">{{ $t('hasNoProduct') }}</div>
          <van-button
            class="my-button"
            v-if="tab === 2 && serviceInfo.serviceType !== '2' && serviceInfo.product"
            bottom-action
            type="default"
            @click="buyProduct"
          >{{ $t('justBuyHere') }}</van-button>
        </div>
      </section>
      <footer
        v-if="!tab && serviceInfo.serviceType !== '2'"
        class="my-service-card__section-footer"
      >
        <div v-if="checked" class="check-part"></div>
        <div class="my-service-card__section-footer--content">
          <div class="row">
            <div class="left">{{ serviceContentHeader }}</div>
            <div class="right">{{ rentOrPackageAmount }}</div>
          </div>
          <div class="row">
            <div class="left">{{ $t('deposit', ['']) }}</div>
            <div class="right">{{ $n(serviceInfo.initialDeposit, 'currency') }}</div>
          </div>
          <div class="row" v-if="balanceDeduction">
            <div class="left">{{ $t('balanceDeduction') }}</div>
            <div class="right">{{ '-'+$n(balanceDeduction, 'currency') }}</div>
          </div>
          <div class="row total">
            <div class="left">{{ $t('totalAmount') }}</div>
            <div class="right">{{ $n(serviceInfo.totalAmount, 'currency') }}</div>
          </div>
        </div>
      </footer>
    </section>
    <slot></slot>
  </div>
</template>

<script>
import { SERVICETYPE, CATEGORYOFPRODUCT } from '@/constant'
// v-if="tab === 2"
export default {
  props: {
    tab: {
      type: Number,
      default: 0,
    },
    serviceInfo: {
      type: Object,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    checkValue: {
      type: Boolean,
      // default: false,
    }
  },
  data () {
    return {
      serviceTypes: SERVICETYPE,
      productCategory: CATEGORYOFPRODUCT,
      selected: false,
    }
  },
  watch: {
    checkValue: {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        this.selected = val
      },
    },
  },
  computed: {
    balanceDeduction: function () {
      return (this.serviceInfo.orders && this.serviceInfo.orders[0].balanceDeduction) || ''
    },
    serviceTitle: function () {
      const serviceTypeText = this.$t(
        this.serviceTypes.find(type => type.key === this.serviceInfo.serviceType).name
      )
      return serviceTypeText + ': ' + this.serviceInfo.serviceNo
    },
    servicePeriod: function () {
      const { rentStartDate, rentDueDate, rentPeriod } = this.serviceInfo
      if (rentDueDate && rentStartDate) {
        const range = (new Date(...rentDueDate.split`-`)).valueOf() -
                (new Date(...rentStartDate.split`-`)).valueOf()
        const gap = rentPeriod - (range / (24 * 60 * 60 * 1000) + 1)
        const fontColor = `color: ${gap > 0 ? '#F01400' : '#000'}`
        return `<span style="${fontColor}">${this.$t(gap > 0 ? 'overtimeDays' : 'remainingDays', [Math.abs(gap)])}</span>`
      } else {
        return ''
      }
    },
    productTitle: function () {
      const { series, title } = this.serviceInfo.product
      return (series ? series + '-' : '') + title
    },
    productDesc: function () {
      const category = this.productCategory.find(cur => {
        return cur.key === this.serviceInfo.product.category
      })

      return (category && this.$t(category.name)) || ''
    },
    productPrice: function () {
      return this.$n(this.serviceInfo.product.sellingPrice, 'currency')
    },
    serviceContentHeader: function () {
      const { serviceType, packageTitle, rentPeriod } = this.serviceInfo
      if (serviceType === '0') {
        return this.$t('rentPeriod', [rentPeriod])
      }
      if (serviceType === '1') {
        return packageTitle
      }
    },
    rentOrPackageAmount: function () {
      const { serviceType, initialRent, packagePrice } = this.serviceInfo
      if (serviceType === '0') {
        return this.$n(initialRent, 'currency')
      }
      if (serviceType === '1') {
        return this.$n(packagePrice, 'currency')
      }
    },
  },
  methods: {
    onCheck (checked) {
      console.log('checked', checked)
      // this.checkValue = checked
      this.$emit('update:checkValue', checked)
    },
    buyProduct () {
      console.log('buy product', this.serviceInfo.product.productid)
    }
  },
}
</script>

<style lang="less">
.my-service-card {
  background: #fff;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  .my-service-card__header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 50px;
    padding: 0 18px;
    font-size: 14px;
    border-bottom: .5px solid #e5e5e5;

    .service-title {
      flex: 1;
      padding-right: 50px;
    }

    .service-detail {
      color: #CCB8A3;
      margin-left: 15px;
    }
  }

  .my-service-card__section {
    .my-service-card__section-header {
      padding: 15px 18px 0;
      font-size: 14px;
    }

    .my-service-card__section-subheader {
      padding: 11px 18px 0;
      font-size: 14px;
      color: #6C6C6C;
    }

    .my-service-card__section-body {
      // padding: 20px 0;
      display: flex;
      align-items: center;
      min-height: 120px;

      .check-part {
        width: 40px;
        height: 120px;

        .my-checkbox {
          padding: 50px 0 50px 19px;
        }
      }

      .service-content {
        position: relative;
        flex: 1;

        .product-price {
          position: absolute;
          bottom: 34px;
          right: 18px;
          font-size: 14px;
          color: #B99F85;
        }

        .has-no-product {
          font-size: 14px;
          color: #6C6C6C;
        }

        .my-button {
          position: absolute;
          width: 115px !important;
          height: 40px;
          right: 20px;
          bottom: 20px;
        }
      }
    }

    .my-service-card__section-footer {
      display: flex;
      align-items: center;
      padding: 0 18px 20px;

      .check-part {
        width: 40px;
        height: 100%;
      }

      .my-service-card__section-footer--content {
        flex: 1;
        font-size: 14px;

        .row {
          display: flex;
          justify-content: space-between;

          &:not(:last-child) {
            margin-bottom: 10px;
          }

          &.total {
            color: #B99F85;
          }
        }
      }
    }
  }
}
</style>
