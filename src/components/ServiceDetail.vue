<template>
  <div id="service-detail" class="scroll-fix">
    <div
      class="service-detail--timer"
      v-if="serviceInfo.serviceType !== '2'
        && serviceInfo.serviceStatus === '3'
        && servicePeriod"
    >
      <div class="content" :style="{ color: servicePeriod.color }">
        <div class="desc">{{ servicePeriod.desc }}</div>
        <div class="count">{{ servicePeriod.gap }}</div>
        <div class="day">{{ $t('day') }}</div>
      </div>
    </div>
    <div class="service-detail--content">
      <div class="row">
        {{ $t('serviceType') + ': ' + $t(`serviceType${serviceInfo.serviceType}`) }}
      </div>
      <div class="row">
        {{ $t('serviceNo') + ': ' + serviceInfo.serviceNo }}
      </div>
      <div class="row" v-show="serviceInfo.createDate">
        {{ $t('createDatetime') + ': ' + serviceInfo.createDate }}
      </div>
      <div class="row" v-show="serviceInfo.finishDate">
        {{ $t('endDatetime') + ': ' + serviceInfo.finishDate }}
      </div>
      <div class="row" v-show="serviceInfo.rentStartDate">
        {{ $t('rentStartDate') + ': ' + serviceInfo.rentStartDate }}
      </div>
      <div class="row" v-show="serviceInfo.rentDueDate">
        {{ $t('rentDueDate') + ': ' + serviceInfo.rentDueDate }}
      </div>
      <div class="row" v-show="+serviceInfo.rentPeriod">
        {{ $t('rentPeriodTitle') + ': ' + serviceInfo.rentPeriod + $t('day')}}
      </div>
      <div class="row" v-show="serviceInfo.serviceType === '1'">
        {{ $t('packageTitle') + ': ' + (serviceInfo.packageshot && serviceInfo.packageshot.title) }}
      </div>
      <div class="row" v-show="serviceInfo.serviceType === '1'">
        {{ $t('packagePrice') + ': ' + $n(serviceInfo.packageshot && serviceInfo.packageshot.price || '0', 'currency') }}
      </div>
      <div class="row" v-show="serviceInfo.serviceType === '1'">
        {{ composePackageProductDomain(serviceInfo.packageshot) }}
      </div>
      <div
        class="row"
        v-show="serviceInfo.serviceType === '2' && +serviceInfo.sellingPrice"
      >
        {{ $t('amount') + ': ' + $n(serviceInfo.sellingPrice, 'currency') }}
      </div>
      <div class="row" v-show="serviceInfo.serviceType === '0' && +serviceInfo.initialRent">
        {{ $t('rentPrice') + ': ' + $n(serviceInfo.initialRent, 'currency') }}
      </div>
      <div class="row" v-show="+serviceInfo.initialDeposit">
        {{ $t('initialDeposit') + ': ' + $n(serviceInfo.initialDeposit, 'currency') }}
      </div>
      <div class="row" v-show="+serviceInfo.residualDeposit">
        {{ $t('residualDeposit') + ': ' + $n(serviceInfo.residualDeposit, 'currency') }}
      </div>
      <div class="row" v-show="serviceInfo.serviceType !== '2'">
        {{ $t('creditStatus') + ': ' + $t(`creditStatus${serviceInfo.creditStatus}`) }}
      </div>
      <van-button
        v-show="serviceInfo.serviceType === '1' &&
          (serviceInfo.serviceStatus === '2' || serviceInfo.serviceStatus === '3') &&
          !serviceInfo.reservedProduct"
        class="my-button"
        bottom-action
        type="default"
        @click="changeProduct"
      >{{ $t('selectProduct') }}</van-button>
      <div class="tip" v-show="showOvertimeTip">
        {{ $t('overtimeTip' )}}
      </div>
    </div>

    <div
      class="reserved-product"
      v-if="reservedProductShow"
    >
      <header>{{ $t(serviceInfo.serviceType === '2' ? 'saleProduct' : 'reservedProduct') }}</header>
      <div class="product-info">
        <img
          class="thumb"
          v-lazy="serviceInfo.reservedProduct.mainimage"
        >
        <div class="desc">
          <div class="row van-ellipsis">{{ productTitle(serviceInfo.reservedProduct) }}</div>
          <div class="category">{{ productCategory(serviceInfo.reservedProduct) }}</div>
        </div>
        <van-button
          v-show="serviceInfo.serviceType === '1'"
          class="my-button"
          bottom-action
          type="default"
          @click="changeProduct"
        >{{ $t('changeProduct') }}</van-button>
      </div>
      <van-collapse v-model="deliveryInfo" class="delivery-info">
        <van-collapse-item>
          <div class="header" slot="title">
            <div class="title van-ellipsis">{{ $t('deliveryInfo') }}</div>
          </div>
          <div v-if="serviceInfo.deliveryMode === '0'" class="content">
            <div class="row">
              {{ $t('deliveryMode') + ': ' + $t(`deliveryMode${serviceInfo.deliveryMode}`) }}
            </div>
            <div class="row" v-show="serviceInfo.receiverName">
              {{ $t('receiverName') + ": " + serviceInfo.receiverName }}
            </div>
            <div class="row" v-show="serviceInfo.receiverPhone">
              {{ $t('receiverPhone') + ": " + serviceInfo.receiverPhone }}
            </div>
            <div class="row" v-show="serviceInfo.address">
              {{ $t('receiverAddress') + ": " + serviceInfo.address }}
            </div>
            <div class="row">
              {{ $t('logisticsCompany') + ": " + serviceInfo.logisticsCompany }}
            </div>
            <div class="row">
              {{ $t('trackingNumber') + ": " + serviceInfo.trackingNumber }}
            </div>
          </div>
          <div v-else-if="serviceInfo.deliveryMode === '1'" class="content">
            <div class="row">
              {{ $t('deliveryMode') + ': ' + $t(`deliveryMode${serviceInfo.deliveryMode}`) }}
            </div>
            <div class="row">
              {{ $t('deliveryStore') + ': ' + serviceInfo.deliveryStore }}
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div
      class="current-product"
      v-if="serviceInfo.product"
    >
      <header>
        {{ $t(serviceInfo.serviceType === '2' ? 'saleProduct' : 'rentingProduct') }}
      </header>
      <div class="product-period" v-show="serviceInfo.serviceType !== '2'">
        {{ productRentPeriod(serviceInfo) }}
      </div>
      <div class="product-info">
        <img
          class="thumb"
          v-lazy="serviceInfo.product.mainimage"
        >
        <div class="desc">
          <div class="row van-ellipsis">{{ productTitle(serviceInfo.product) }}</div>
          <div class="row van-ellipsis" v-show="serviceInfo.product.serialNumber">
            {{ productSerialNumber(serviceInfo.product) }}
          </div>
          <div class="category">{{ productCategory(serviceInfo.product) }}</div>
        </div>
        <van-button
          v-show="serviceInfo.serviceType === '0' && serviceInfo.serviceStatus === '3'"
          class="my-button"
          bottom-action
          type="default"
          @click="buyProduct(serviceInfo.productid)"
        >{{ $t('justBuyHere') }}</van-button>
      </div>
      <van-collapse v-model="deliveryInfo" class="delivery-info">
        <van-collapse-item>
          <div class="header" slot="title">
            <div class="title van-ellipsis">{{ $t('deliveryInfo') }}</div>
          </div>
          <div v-if="serviceInfo.deliveryMode === '0'" class="content">
            <div class="row">
              {{ $t('deliveryMode') + ': ' + $t(`deliveryMode${serviceInfo.deliveryMode}`) }}
            </div>
            <div class="row" v-show="serviceInfo.receiverName">
              {{ $t('receiverName') + ": " + serviceInfo.receiverName }}
            </div>
            <div class="row" v-show="serviceInfo.receiverPhone">
              {{ $t('receiverPhone') + ": " + serviceInfo.receiverPhone }}
            </div>
            <div class="row" v-show="serviceInfo.address">
              {{ $t('receiverAddress') + ": " + serviceInfo.address }}
            </div>
            <div class="row">
              {{ $t('logisticsCompany') + ": " + serviceInfo.logisticsCompany }}
            </div>
            <div class="row">
              {{ $t('trackingNumber') + ": " + serviceInfo.trackingNumber }}
            </div>
          </div>
          <div v-else-if="serviceInfo.deliveryMode === '1'" class="content">
            <div class="row">
              {{ $t('deliveryMode') + ': ' + $t(`deliveryMode${serviceInfo.deliveryMode}`) }}
            </div>
            <div class="row">
              {{ $t('deliveryStore') + ': ' + serviceInfo.deliveryStore }}
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div
      class="product-changelist"
      v-if="serviceInfo.changelist && serviceInfo.changelist.length"
    >
      <header>
        {{ $t('historyProduct') }}
      </header>
      <div
        v-for="(log, i) in serviceInfo.changelist"
        :key="i"
      >
        <div class="product-header">
          <div class="product-period">
            {{ historyProductRentPeriod(log) }}
          </div>
          <div class="product-leaseholdstatus">
            {{ productLeaseholdStatus(log.leaseholdStatus) }}
          </div>
        </div>
        <div
          class="product-info"
        >
          <img
            class="thumb"
            v-lazy="log.product.mainimage"
          >
          <div class="desc">
            <div class="row van-ellipsis">{{ productTitle(log.product) }}</div>
            <div class="row van-ellipsis" v-show="log.serialNumber">
              {{ productSerialNumber(log) }}
            </div>
            <!-- <div class="category">{{ productCategory(log.product) }}</div> -->
            <div class="row van-ellipsis" v-show="log.compensation">
              {{ $t('compensationAmount') + ': ' + $n(log.compensation, 'currency') }}
            </div>
          </div>
        </div>
        <van-collapse v-model="deliveryInfo" class="delivery-info">
          <van-collapse-item>
            <div class="header" slot="title">
              <div class="title van-ellipsis">{{ $t('deliveryInfo') }}</div>
            </div>
            <div v-if="log.receiverName" class="content">
              <div class="row">
                {{ $t('deliveryMode') + ': ' + $t(`deliveryMode0`) }}
              </div>
              <div class="row" v-show="log.receiverName">
                {{ $t('receiverName') + ": " + log.receiverName }}
              </div>
              <div class="row" v-show="log.receiverPhone">
                {{ $t('receiverPhone') + ": " + log.receiverPhone }}
              </div>
              <div class="row" v-show="log.address">
                {{ $t('receiverAddress') + ": " + log.address }}
              </div>
              <div class="row">
                {{ $t('logisticsCompany') + ": " + log.logisticsCompany }}
              </div>
              <div class="row">
                {{ $t('trackingNumber') + ": " + log.trackingNumber }}
              </div>
            </div>
            <div v-else class="content">
              <div class="row">
                {{ $t('deliveryMode') + ': ' + $t(`deliveryMode1`) }}
              </div>
              <div class="row">
                {{ $t('deliveryStore') + ': ' + log.deliveryStore }}
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { CATEGORYOFPRODUCT, LEASEHOLDSTATUS } from '@/constant'

export default {
  data () {
    return {
      type: '0',
      productCategorys: CATEGORYOFPRODUCT,
      leaseholdStatuss: LEASEHOLDSTATUS,
      serviceInfo: {},
      deliveryInfo: [],
    }
  },
  mounted () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )

    this.serviceInfo.serviceNo = this.$route.params.id
    this.type = this.$route.query.type || '0'

    const url = this.type === '0' ? '/client/RentalService/'
      : (this.type === '1' ? '/client/ComboService/' : '/client/SellService/')

    this.$fetch(url, {
      params: {
        serviceNo: this.serviceInfo.serviceNo,
      },
    }, true).then(resp => {
      console.log('resp', resp)
      const serviceInfo = resp.data.results[0]
      this.serviceInfo = {
        ...serviceInfo,
        serviceType: this.type,
      }
      this.$forceUpdate()
    }).catch(err => {
      console.log(err)
    })
  },
  // mounted () {
  //   Array.prototype.forEach.call(
  //     document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
  //   )
  // },
  beforeDestroy () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
  computed: {
    showOvertimeTip: function () {
      const { creditStatus, serviceStatus, serviceType } = this.serviceInfo
      let show = creditStatus === '1'
      switch (serviceType) {
        case '0':
          return show && (serviceStatus === '5' || serviceStatus === '6')
        case '1':
          return show && (serviceStatus === '4' || serviceStatus === '5')
        case '2':
          return show && serviceStatus === '3'
      }
      return show
    },
    servicePeriod: function () {
      const { rentDueDate } = this.serviceInfo
      if (rentDueDate) {
        const [y, m, d] = rentDueDate.split`-`
        const range = Date.now() -
          (new Date(y, m - 1, d)).valueOf()
        const gap = Math.ceil(range / (24 * 60 * 60 * 1000))
        return {
          color: gap <= 0 ? '#B99F85' : '#D0021B',
          gap: Math.abs(gap),
          desc: gap <= 0 ? this.$t('rentRemainingDays') : this.$t('rentOvertime'),
        }
      } else {
        return null
      }
    },
    reservedProductShow: function () {
      const { serviceStatus, reservedProduct, serviceType } = this.serviceInfo
      if (serviceType === '1') {
        return !!reservedProduct
      } else {
        return +serviceStatus < 3 && reservedProduct
      }
    },
  },
  methods: {
    composePackageProductDomain (packageshot) {
      if (packageshot) {
        const { lowerLimit, upperLimit } = packageshot
        return this.$t('packageProductDomain') + ': ' + this.$n(lowerLimit, 'currency') +
          (upperLimit ? '～' + this.$n(upperLimit, 'currency') : '')
      }
      return ''
    },
    productTitle (product) {
      const { series, title } = product
      return (series ? series + '-' : '') + title
    },
    productCategory (product) {
      const category = this.productCategorys.find(cur => {
        return cur.key === product.category
      })

      return (category && this.$t(category.name)) || ''
    },
    productSerialNumber (product) {
      return this.$t('serialNumber') + ': ' + product.serialNumber
    },
    changeProduct () {
      const { lowerLimit, upperLimit } = this.serviceInfo.packageshot
      let url = '/index'
      if (lowerLimit || upperLimit) {
        url += '?'
        lowerLimit && (url += `minSellingPrice=${lowerLimit}&`)
        upperLimit && (url += `maxSellingPrice=${upperLimit}`)
        const len = url.length
        if (url[len - 1] === '&') {
          url = url.slice(0, len - 1)
        }
      }
      url += '#products'
      console.log('url', url)
      this.$router.push(url)
    },
    buyProduct (productid) {
      // this.$router.push(`/payment/${productid}?type=2`)
      this.$router.push(`/payment/${this.serviceInfo.serviceNo}/?type=0&orderType=7`)
    },
    productRentPeriod (service) {
      const { rentStartDate, rentDueDate } = service
      return this.$t('rentPeriodTitle') + ': ' + rentStartDate +
        (rentDueDate ? ' ~ ' + rentDueDate : '')
    },
    historyProductRentPeriod (log) {
      const { startDate, endDate } = log
      return this.$t('rentPeriodTitle') + ': ' + startDate +
        (endDate ? ' ~ ' + endDate : '')
    },
    productLeaseholdStatus (leaseholdStatus) {
      const status = this.leaseholdStatuss.find(cur => {
        return cur.key === leaseholdStatus
      })

      return (status && this.$t(status.name)) || ''
    },
  }
}
</script>

<style lang="less">
#service-detail {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 20px;

  .service-detail--timer {
    width: 100%;
    height: 188px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .content {
      width: 140px;
      height: 140px;
      border: 1px solid;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 28px 0;

      .desc {
        font-size: 14px;
      }

      .count {
        font-size: 50px;
        line-height: 50px;
        font-weight: 400;
        flex: 1;
      }

      .day {
        font-size: 18px;
      }
    }
  }

  .service-detail--content {
    font-size: 14px;
    background: #fff;
    padding: 30px 18px;

    .row {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .tip {
      padding-top: 10px;
      font-size: 12px;
      color: #666666;
    }
  }

  .product-period {
    font-size: 14px;
    padding-top: 12px;
  }

  .product-info {
    position: relative;
    padding: 22px 0;
    display: flex;

    .thumb {
      width: 80px;
      height: 80px;
    }

    .desc {
      flex: 1;
      padding-left: 18px;
      max-width: calc(100% - 195px);

      > div:not(:last-child) {
        margin-bottom: 8px;
      }

      .row {
        font-size: 14px;
      }

      .category {
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .my-button {
    position: relative;
    width: 115px !important;
    height: 40px;
    align-self: flex-end;
  }

  .reserved-product {
    background: #fff;
    margin-top: 12px;
    padding: 0 18px;

    header {
      padding: 18px 0;
      font-size: 14px;
      border-bottom: .5px solid #e5e5e5;
    }
  }

  .current-product {
    background: #fff;
    margin-top: 12px;
    padding: 0 18px;
    padding-bottom: 15px;

    header {
      padding: 18px 0;
      font-size: 14px;
      border-bottom: .5px solid #e5e5e5;
    }
  }

  .delivery-info {
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
        }
      }
    }
  }

  .product-changelist {
    background: #fff;
    margin-top: 12px;
    padding: 0 18px;
    padding-bottom: 15px;

    header {
      padding: 18px 0;
      font-size: 14px;
      border-bottom: .5px solid #e5e5e5;
    }

    .product-header {
      display: flex;
      justify-content: space-between;

      .product-leaseholdstatus {
        font-size: 14px;
        padding-top: 12px;
      }
    }

    .desc {
      max-width: none;
    }
  }
}
</style>
