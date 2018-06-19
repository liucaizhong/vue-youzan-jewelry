<template>
  <div id="products">
    <div
      class="mask"
      :style="{ display: expand ? 'block' : 'none'}"
      @click="onClickMask"
    />
    <van-collapse
      :class="['collapse', { 'after-search': searchCond.keyword }]"
      v-model="toggleFilter"
    >
      <van-collapse-item name="1">
        <div class="title" slot="title">
          <div
            :class="['left', { expand: expand }]"
          >
            {{ filterTitle }}
          </div>
          <div class="right">
            <a
              :class="['filter-btn0', { selected: searchCond.newSelected}]"
              href="javascript:void(0)"
              @click.stop.prevent="selectNew"
            >
              {{ $t('latestProduct') }}
            </a>
            <a
              :class="['filter-btn1', {
                up: searchCond.orderByPrice === 1,
                down: searchCond.orderByPrice === -1,
              }]"
              href="javascript:void(0)"
              @click.stop.prevent="orderByPrice"
            >
              <span>{{ $t('price') }}</span>
              <div class="order-btn">
                <div class="top" />
                <div class="bottom" />
              </div>
            </a>
          </div>
        </div>
        <!-- <keep-alive> -->
        <filter-panel
          @on-reset="resetSearchCond"
          @on-confirm="getProductList"
          :category="categoryFromRoute"
        />
        <!-- </keep-alive> -->
      </van-collapse-item>
    </van-collapse>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="product-list"
        v-model="loading"
        :finished="finished"
        @load="onLoadmore"
        :loading-text="$t('loadMore')"
        :immediate-check="false"
      >
        <product-item
          v-for="(item, i) in imgList"
          :key="i"
          :img="item"
        />

        <footer class="products-footer">
          <load-complete v-if="finished" />
          <a v-else-if="searchCond.keyword" class="check-all" href="javascript:void(0)" @click="onCheckAll">
            {{ $t('checkAllProducts') }}
          </a>
        </footer>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import FilterPanel from './FilterPanel'
import ProductItem from './ProductItem'
import LoadComplete from './LoadComplete'

export default {
  components: {
    FilterPanel,
    ProductItem,
    LoadComplete,
  },
  // props: {
  //   params: Object,
  // },
  data () {
    return {
      toggleFilter: [],
      keywordCount: 0,
      refreshing: false,
      loading: false,
      finished: false,
      imgList: [],
      categoryFromRoute: '',
      searchCond: {
        newSelected: false,
        orderByPrice: 0, // up: 1, down: -1, 0:not selected
        keyword: '',
        category: [],
        goldType: [],
        limit: 50,
        offset: 0,
      },
    }
  },
  // created () {
  //   const { keyword = '', category } = this.$route.query
  //   this.searchCond.keyword = keyword
  //   this.searchCond.category = (category && category.split`,`) || []
  //   this.categoryFromRoute = category
  //   this.requestProductList(true)
  // },
  activated () {
    console.log('activated', this.$route)
    const { keyword = '', category } = this.$route.query
    this.searchCond.keyword = keyword
    this.searchCond.category = (category && category.split`,`) || []
    this.categoryFromRoute = category
    this.requestProductList(true)
  },
  // watch: {
  //   params: function (val, oldVal) {
  //     console.log('params', val)
  //     const { keyword = '', category } = val
  //     this.searchCond.keyword = keyword
  //     this.searchCond.category = (category && category.split`,`) || []
  //     this.categoryFromRoute = category
  //     this.requestProductList(true)
  //   },
  // },
  computed: {
    expand: function () {
      return this.toggleFilter.length
    },
    filterTitle: function () {
      return this.searchCond.keyword
        ? this.$t('searchProductResult', [this.keywordCount])
        : this.$t('filter')
    },
  },
  methods: {
    onClickMask () {
      console.log('onClickMask')
      this.toggleFilter = []
    },
    selectNew () {
      console.log('new selected')
      this.searchCond.newSelected = true
      this.searchCond.orderByPrice = 0
    },
    orderByPrice () {
      console.log('order by price')
      this.searchCond.newSelected && (this.searchCond.newSelected = false)
      this.searchCond.orderByPrice = -this.searchCond.orderByPrice
      this.searchCond.orderByPrice || (this.searchCond.orderByPrice = 1)
      this.requestProductList(true)
    },
    getProductList (cond = {}, toggle = true) {
      console.log('cond', cond)
      this.searchCond = Object.assign({}, this.searchCond, cond)
      toggle && (this.toggleFilter = [])
      this.requestProductList(true)
    },
    resetSearchCond (cond = {}, toggle = true) {
      console.log('cond', cond)
      this.searchCond = Object.assign({}, this.searchCond, cond)
      toggle && (this.toggleFilter = [])
      this.requestProductList(true)
    },
    formSearchParams (cond = {}) {
      return Object.keys(cond).reduce((cum, key) => {
        if (cond[key]) {
          if (Array.isArray(cond[key])) {
            cond[key].length && (cum[key] = cond[key])
          } else {
            cum[key] = cond[key]
          }
        }
        return cum
      }, {})
    },
    requestProductList (loading) {
      // todo: axios
      this.$nextTick(function () {
        const url = '/client/product/'
        const condParams = this.formSearchParams(this.searchCond)
        console.log('condParams', condParams)
        this.$fetch(url, {
          params: {
            offset: 0,
            limit: 50,
            ...condParams,
          },
        }, loading).then(resp => {
          console.log('resp', resp)
          const results = resp.data.results
          this.imgList = results
          this.keywordCount = resp.count
          this.loading = false
          this.refreshing = false
          if (results.length < this.searchCond.limit) {
            this.finished = true
          }
        }).catch(err => {
          console.log(err)
          this.loading = false
          this.refreshing = false
        })
      })
    },
    onRefresh () {
      this.searchCond.offset = 0
      this.refreshing = true
      this.requestProductList()
    },
    onLoadmore () {
      this.searchCond.offset++
      this.loading = true
      this.requestProductList()
    },
    onCheckAll () {
      this.$router.push('/index#products')
    },
  },
}
</script>

<style lang="less">
@imgSize--large: 160px;
@imgSize--small: 140px;

#products {
  width: 100vw;
  height: 100vh;
  background: #fff;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;

  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.50);
    z-index: 999;
    display: none;
  }

  .collapse {
    z-index: 1000;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    .van-icon-arrow {
      position: absolute;
      margin-left: 0;
      // top: 0;
      left: 50px;
      color: #999999;
    }

    &.after-search {
      .van-icon-arrow {
        display: none;
      }
    }

    .van-cell:not(:last-child)::after {
      left: 0;
    }

    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: nowrap;
      font-size: 14px;
      color: #999999;
      text-align: center;

      .left {
        &.expand {
          color: #000000;
        }
      }

      .right {
        display: inline-flex;
        justify-content: space-between;

        a {
          display: block;
          font-size: 14px;
          color: #999999;
          text-align: center;

          &.filter-btn0 {
            margin-right: 30px;
            display: none; // temporarily unused

            &.selected {
              color: #B99F85;
            }
          }

          &.filter-btn1 {
            display: flex;
            flex-direction: row;
            align-items: center;

            span {
              font-size: 14px;
              color: #999999;
              text-align: center;
              margin-right: 4px;
            }

            .order-btn {
              position: relative;

              .top {
                border-left: 2.5px solid transparent;
                border-right: 2.5px solid transparent;
                border-bottom: 4px solid #CCCCCC;
                margin-bottom: 4px;
              }

              .bottom {
                border-left: 2.5px solid transparent;
                border-right: 2.5px solid transparent;
                border-top: 4px solid #CCCCCC;
              }
            }

            &.up {
              span {
                color: #B99F85;
              }

              .top {
                border-bottom-color: #B99F85;
              }
            }

            &.down {
              span {
                color: #B99F85;
              }

              .bottom {
                border-top-color: #B99F85;
              }
            }
          }
        }
      }
    }

    .van-collapse-item__content {
      padding: 0;
    }
  }

  .van-pull-refresh {
    margin-top: 44px;
    // padding-bottom: 50px;

    .product-list {
      // overflow: auto;
      height: auto;
      min-height: calc(100vh - 44px);
      padding: 24px 18px 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: flex-start;
      background: #fff;

      .products-footer {
        width: 100%;
        display: flex;
        justify-content: space-around;

        #load-complete {
          background: transparent;
          padding: 22px 0;
          max-height: 50px;
        }

        .check-all {
          display: block;
          font-size: 14px;
          color: #000000;
          text-align: center;
          text-decoration: underline;
        }
      }

      .van-list__loading {
        width: 100%;
        max-height: 50px;
      }

      .product-item {
        width: @imgSize--large;

        a {
          .thumb {
            width: @imgSize--large;
            height: @imgSize--large;
            border: none;
          }
        }

        .desc {
          width: @imgSize--large;
        }
      }

      @media screen and (max-width: 375px) {
        .product-item {
          width: @imgSize--small;

          a {
            .thumb {
              width: @imgSize--small;
              height: @imgSize--small;
            }
          }

          .desc {
            width: @imgSize--small;
          }
        }
      }
    }
  }
}
</style>
