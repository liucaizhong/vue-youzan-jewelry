<template>
  <div id="rent-detail">
    <section class="product-info">
      <van-card
        class="my-card"
        :title="productTitle"
        :desc="productDesc"
        :price="productDetail.sellingPrice"
      >
        <img v-lazy="productDetail.MainImage0 && productDetail.MainImage0.avatar" slot="thumb">
      </van-card>
      <div class="product-info--rent">{{ productRent }}</div>
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
          <p class="desc">{{ $t('moneyPerDay', [$n(productDetail.rent, 'currency')]) }}</p>
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
          <rent-package-detail
            v-if="serviceType"
            :product="productDetail"
          />
          <rent-one-detail
            v-else
            :product="productDetail"
          />
        </keep-alive>
      </section>
    </section>
  </div>
</template>

<script>
import { CATEGORYOFPRODUCT } from '@/constant'
import RentOneDetail from './RentOneDetail'
import RentPackageDetail from './RentPackageDetail'

export default {
  components: {
    RentOneDetail,
    RentPackageDetail,
  },
  data () {
    return {
      serviceType: 0, // 0: rental, 1: package
      productCategory: CATEGORYOFPRODUCT,
      productDetail: {
        rent: '',
        deposit: '',
        rentcycle: '',
        productid: '',
      },
    }
  },
  created () {
    console.log('$route', this.$route)
    this.productDetail.productid = this.$route.params.id
    // get product detail
    const url = '/client/ProductDetail/'
    this.$fetch(url, {
      params: {
        productid: this.productDetail.productid,
      },
    }, true).then(resp => {
      console.log('resp', resp)
      const data = resp.data.results[0]
      this.productDetail = { ...data }
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    productTitle: function () {
      return (this.productDetail.series ? this.productDetail.series + '-' : '') +
        this.productDetail.title
    },
    productDesc: function () {
      const category = this.productCategory.find(cur => {
        return cur.key === this.productDetail.category
      })

      return (category && this.$t(category.name)) || ''
    },
    productRent: function () {
      return this.$t('rentPrice') +
        this.$t('moneyPerDay', [this.$n(this.productDetail.rent, 'currency')])
    },
  },
  methods: {
    changeServiceType (type) {
      this.serviceType = type
    },
  },
}
</script>

<style lang="less">
#rent-detail {
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #F5F5F5;
  width: 100vw;
  height: 100vh;

  .product-info {
    width: 100%;
    height: 128px;
    background: #fff;
    position: relative;

    .product-info--rent {
      position: absolute;
      bottom: 34px;
      left: 116px;
      font-size: 14px;
    }
  }

  .rent-selection {
    margin-top: 12px;
    width: 100%;
    height: calc(100% - 140px);
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
        // line-height: 14px;
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
          // line-height: 14px;
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
  }
}
</style>
