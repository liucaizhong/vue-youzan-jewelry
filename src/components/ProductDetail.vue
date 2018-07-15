<template>
  <div id="product-detail" class="scroll-fix">
    <header class="banner">
      <van-swipe>
        <van-swipe-item v-for="i in 6" :key="i" v-if="i === 1 || productDetail[`MainImage${i-1}`]">
          <img v-lazy="productDetail[`MainImage${i-1}`] && productDetail[`MainImage${i-1}`].avatar" />
        </van-swipe-item>
      </van-swipe>
    </header>
    <section class="product-title">
      <div class="row">
        <div class="left van-ellipsis">{{ productName }}</div>
        <div class="right">
          {{ $n(productDetail.sellingPrice, 'currency') }}
        </div>
      </div>
      <div class="row">
        <div class="left van-ellipsis">{{ productDesc }}</div>
        <div class="right">
          {{ $t('moneyPerDay', [$n(productDetail.rent, 'currency')]) }}
        </div>
      </div>
    </section>
    <section class="product-spec">
      <div class="title">{{ $t('productSpec') }}</div>
      <div class="content">
        <div v-if="productDetail.diamondWeight" class="spec">
          {{ `- ${$t('diamondWeightDesc')}: ${$t('karat', [productDetail.diamondWeight])}` }}
        </div>
        <div
          v-if="productDetail.goldType || productDetail.goldPurity || productDetail.goldContent"
          class="spec"
        >
          {{ goldContentDesc }}
        </div>
        <div v-if="productDetail.size" class="spec">
          {{ `- ${$t('size') + ': ' + productDetail.size}` }}
        </div>
        <div v-if="productDetail.certificate && productDetail.certificate !== '0'" class="spec">
          {{ `- ${certificateDesc}` }}
        </div>
      </div>
      <div class="desc">{{ productDetail.desc }}</div>
    </section>
    <section class="product-tabs">
      <van-tabs v-model="activeTab" swipeable>
        <van-tab
          :title="$t('productDetail')"
        >
          <img
            class="product-tabs__img"
            v-lazy="productDetail.detailImages && productDetail.detailImages.url"
          >
        </van-tab>
        <van-tab
          :title="$t('rentStrategy')"
        >
          <img class="product-tabs__img" v-lazy="rentStrategy">
        </van-tab>
        <van-tab
          :title="$t('FAQ')"
        >
          <img class="product-tabs__img" v-lazy="faq">
        </van-tab>
      </van-tabs>
    </section>
    <section class="product-detail__notice">
      <img class="product-detail__notice-img" v-lazy="noticeImg">
    </section>
    <footer class="product-detail__footer">
      <van-button
        class="my-button rent-btn"
        type="default"
        bottom-action
        @click="onConfirmRent"
      >{{ $t('rentProduct', [$n(productDetail.rent, 'currency')]) }}</van-button>
      <van-button
        class="my-button buy-btn"
        type="default"
        bottom-action
        @click="onConfirmBuy"
      >{{ $t('buyImmediately') }}</van-button>
    </footer>
  </div>
</template>

<script>
import { GOLDPURITY, GOLDTYPE, CERTIFICATES,
  JEWELRYCAREIMAGES, FAQIMAGES, STRATEGYIMAGES } from '@/constant'

export default {
  data () {
    return {
      productid: '',
      productDetail: {},
      goldPurity: GOLDPURITY,
      goldType: GOLDTYPE,
      certificates: CERTIFICATES,
      activeTab: 0,
      rentStrategy: STRATEGYIMAGES.avatar || STRATEGYIMAGES.url,
      faq: FAQIMAGES.avatar || FAQIMAGES.url,
      noticeImg: JEWELRYCAREIMAGES.avatar || JEWELRYCAREIMAGES.url,
    }
  },
  created () {
    console.log('$route', this.$route)
    this.productid = this.$route.params.id
    const url = '/client/ProductDetail/'
    this.$fetch(url, {
      params: {
        productid: this.productid,
      },
    }, true).then(resp => {
      console.log('resp', resp)
      const data = resp.data.results[0]
      this.productDetail = { ...data }
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )
  },
  beforeDestroy () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
  computed: {
    productName: function () {
      const { series, title } = this.productDetail
      return (series && series + '-') + title
    },
    productDesc: function () {
      const { category, brand } = this.productDetail
      let categoryText = +category > 4
        ? this.$t(`productCategory5_${+category - 5}`)
        : this.$t(`productCategory${category}`)
      return categoryText + (brand && ` | ${brand}`)
    },
    goldContentDesc: function () {
      const { goldType, goldPurity, goldContent } = this.productDetail
      const goldTypeText = goldType &&
        this.$t(this.goldType.find(item => item.key === goldType).name)
      const goldPurityText = goldPurity &&
        this.goldPurity.find(item => item.key === goldPurity).value
      const goldContentText = goldContent && this.$t('gram', [goldContent])

      return '- ' + this.$t('texture') + ': ' + goldTypeText + goldPurityText + ', ' + goldContentText
    },
    certificateDesc: function () {
      const { certificate } = this.productDetail
      return certificate &&
        this.$t(this.certificates.find(item => item.key === certificate).name)
    },
  },
  methods: {
    onConfirmRent () {
      console.log('onConfirmRent')
      this.$router.push(`/rent/${this.productid}`)
    },
    onConfirmBuy () {
      console.log('onConfirmBuy')
      this.$router.push(`/payment/${this.productid}?type=2`)
    },
  },
}
</script>

<style lang="less">
#product-detail {
  width: 100vw;
  height: 100vh;
  margin-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;

  .banner {
    width: 100%;

    .van-swipe {
      width: 100%;
      height: 0;
      padding-top: 100%;
      position: relative;

      .van-swipe__indicators {
        bottom: 17px;

        .van-swipe__indicator {
          width: 8px;
          height: 8px;
          // background-color: #fff;
          opacity: .4;

          &.van-swipe__indicator--active {
            opacity: 1;
            background-color: #B99F85;
          }
        }
      }

      .van-swipe__track {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .product-title {
    width: 100%;
    height: 94px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 18px;

    .row {
      display: flex;
      justify-content: space-between;
      line-height: 100%;

      &:first-child {
        font-size: 16px;
        color: #000;
      }
      &:last-child {
        font-size: 14px;
        color: #999999;
      }

      .left, .right {
        padding: 1px 0;
      }
    }
  }

  .product-spec {
    width: 100%;
    padding: 24px 18px 0;
    // border-bottom: 1px solid #e5e5e5;

    .title {
      font-size: 14px;
      color: #000000;
      text-align: left;
    }

    .content {
      padding: 14px 0 20px;
      font-size: 14px;
      color: #999999;
    }

    .desc {
      padding-bottom: 20px;
      font-size: 14px;
      color: #999999;
    }
  }

  .product-tabs {
    width: 100%;
    border-bottom: 1px solid #e5e5e5;

    .van-tabs--line {
      padding-top: 64px;
    }

    .van-tabs__wrap {
      height: 64px;
      z-index: 0;

      &::after {
        border-bottom-width: 0;
      }

      .van-tabs__line {
        width: 17.5% !important;
        left: 8%;
        bottom: 25px;
        background-color: #B99F85;
      }

      .van-ellipsis {
        font-size: 16px;
        color: #999999;
        line-height: 64px;
      }

      .van-tab--active {
        .van-ellipsis {
          color: #B99F85;
        }
      }
    }

    .van-tabs__content {
      .product-tabs__img {
        width: 100%;
      }
    }
  }

  .product-detail__notice {
    width: 100%;

    .product-detail__notice-img {
      width: 100%;
    }
  }

  .product-detail__footer {
    width: 100%;
    height: 50px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;

    .rent-btn {
      flex: 1;
      background: #CCB8A3;

      span {
        color: #FFFFFF !important;
      }
    }

    .buy-btn {
      flex: 1;
    }
  }
}
</style>
