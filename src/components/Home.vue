<template>
  <div id="home">
    <my-search
      v-model="searchValue"
      @on-focus="onFocus"
      @on-enter="onSearch"
    />
    <div class="mask" :style="{ display: focused ? 'block' : 'none'}" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <section class="show-section">
        <div class="show-section__swiper">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(img, i) in spImages" :key="i">
              <router-link :to="img.link">
                <img v-lazy="img.avatar || img.url" />
              </router-link>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="show-section__portal">
          <div class="show-section__portal-content">
            <router-link to="/book">
              <p class="title">{{ $t('book') }}</p>
              <p class="subtitle">{{ $t('bookDesc') }}</p>
            </router-link>
          </div>
          <div class="show-section__portal-content">
            <!-- <router-link to="/package-list"> -->
            <div>
              <p class="title">{{ $t('package') }}</p>
              <p class="subtitle">{{ $t('packageDesc') }}</p>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
      </section>
      <checkall-card
        :title="$t('productCategory')"
        url="/index#products"
      >
        <div
          class="product-category"
          slot="content"
        >
          <category-tab
            v-for="item in productCategory"
            :key="item.name"
            :url="`/index?category=${item.key}#products`"
            :name="item.name"
            :icon="item.icon"
          />
        </div>
      </checkall-card>
      <div class="van-hairline--top" />
      <checkall-card
        :title="$t('productNew')"
        url="/index#products"
      >
        <home-img-scroller slot="content" :imgList="newProducts" />
      </checkall-card>
      <div class="van-hairline--top" />
      <checkall-card
        :title="$t('productRecommend')"
        url="/index#products"
      >
        <home-img-scroller slot="content" :imgList="recommendProducts" />
      </checkall-card>
      <home-news :imgList="advImages" />
      <footer class="home-footer">
        <load-complete />
      </footer>
    </van-pull-refresh>
  </div>
</template>

<script>
import MySearch from './MySearch'
import CheckallCard from './CheckAllCard'
import LoadComplete from './LoadComplete'
import HomeNews from './HomeNews'
import CategoryTab from './CategoryTab'
import HomeImgScroller from './HomeImgScroller'
import { PRODUCTCATEGORY } from '@/constant'

export default {
  name: 'Home',
  components: {
    MySearch,
    CheckallCard,
    LoadComplete,
    HomeNews,
    CategoryTab,
    HomeImgScroller,
  },
  data () {
    return {
      searchValue: '',
      spImages: [],
      advImages: [],
      newProducts: [],
      recommendProducts: [],
      refreshing: false,
      searchFocused: false,
      productCategory: PRODUCTCATEGORY,
      focused: false,
    }
  },
  created () {
    this.getIndexConf(true)
  },
  methods: {
    getIndexConf (loading) {
      this.refreshing = true
      const url = '/client/indexconf/'

      this.$fetch(url, {}, loading).then(resp => {
        console.log('resp', resp)
        // alert(JSON.stringify(resp))
        const { spImages, advImages, newProducts, recommendProducts } = resp.data
        this.spImages = [...spImages]
        this.advImages = [...advImages]
        this.newProducts = [...newProducts]
        this.recommendProducts = [...recommendProducts]
        this.$nextTick(() => {
          this.refreshing = false
        })
        // this.$forceUpdate()
      }).catch(err => {
        console.log(err)
        // alert(JSON.stringify(err))
        this.$nextTick(() => {
          this.refreshing = false
        })
      })
    },
    onRefresh () {
      this.getIndexConf()
    },
    onFocus (f) {
      // console.log(args)
      this.focused = f
    },
    onSearch (val) {
      console.log('Search value', val)
      if (val) {
        this.focused = false
        this.$router.push(`/index?keyword=${val}#products`)
      }
    },
  },
}
</script>

<style lang="less">
#home {
  width: 100vw;
  height: 100vh;
  // background: #F5F5F5;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  // .my-search {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: 999;
  //   background: #F5F5F5;
  // }

  .mask {
    position: fixed;
    display: none;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.50);
    z-index: 999;
  }

  // .van-pull-refresh {
  //   padding-top: 60px;
  // }

  .show-section {
    width: 100%;
    // min-height: 462px;
    padding-bottom: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;

    .show-section__swiper {
      width: 100%;
      padding: 13px 42px 26px;

      .van-swipe {
        width: 100%;
        height: 0;
        padding-top: 100%;
        position: relative;
        background: #fff;

        .van-swipe__indicators {
          display: none;
        }

        .van-swipe__track {
          position: absolute;
          top: 0;
          left: 0;
          // width: 100%;
          height: 100%;

          .van-swipe-item {
            width: 100%;
            // width: calc(100vw - 84px) !important;
            height: 100%;

            a {
              display: block;
              width: 100%;
              height: 100%;

              img {
                // position: absolute;
                // top: 0;
                // left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }

    .show-section__portal {
      width: 100%;
      padding: 0 42px;
      display: flex;
      flex-wrap: nowrap;
      position: relative;

      .b-l {
        content: '';
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        border-left: 3px solid #000000;
      }

      &::after {
        .b-l;
        left: auto;
        right: 42px;
      }

      .show-section__portal-content {
        flex: 1 1 50%;
        position: relative;

        &::before {
          .b-l;
        }

        p {
          margin: 0;

          &.title {
            font-weight: bold;
            font-size: 16px;
            color: #000000;
            text-align: center;
            line-height: 20px;
          }

          &.subtitle {
            font-size: 12px;
            color: #333333;
            text-align: center;
            line-height: 14px;
          }
        }
      }
    }
  }

  .product-category {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0 40px;
    align-content: space-between;
    // min-height: 60vw;
    height: 250px;

    #category-tab {
      flex: 1 0 33%;
    }
  }

  #home-news {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      transform: scale(.5);
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
  }

  .home-footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background: transparent;
    padding: 22px 0;
    margin-bottom: 50px;
  }

  .van-list__loading {
    width: 100%;
  }
}
</style>
