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
            :productDetail="productDetail"
          />
          <rent-one-detail
            v-else
            :productDetail="productDetail"
          />
        </keep-alive>
      </section>
    </section>
  </div>
</template>

<script>
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
      productDetail: {
        rent: '10',
        deposit: '2000',
        rentcycle: '10',
        productid: '',
      },
    }
  },
  created () {
    console.log('$route', this.$route)
    this.productDetail.productid = this.$route.params.id
    // get product detail
    // todo...
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
  background: #F5F5F5;
  width: 100vw;
  height: 100vh;

  .product-info {
    width: 100%;
    height: 128px;
    background: #fff;
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
  }
}
</style>
