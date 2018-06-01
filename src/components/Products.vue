<template>
  <div id="products">
    <div class="mask" :style="{ display: expand ? 'block' : 'none'}" />
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
                up: searchCond.orderOfPrice === -1,
                down: searchCond.orderOfPrice === 1,
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
        <keep-alive>
          <filter-panel
            @on-reset="resetSearchCond"
            @on-confirm="getProductList"
          />
        </keep-alive>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import FilterPanel from './FilterPanel'

export default {
  components: {
    FilterPanel,
  },
  data () {
    return {
      toggleFilter: [],
      keywordCount: 0,
      searchCond: {
        newSelected: false,
        orderOfPrice: 0, // up: 1, down: -1, 0:not selected
        keyword: '',
        category: [],
        goldType: [],
      },
    }
  },
  created () {
    console.log('products', this.$route.query)
    const { keyword = '' } = this.$route.query
    this.searchCond.keyword = keyword
  },
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
    selectNew () {
      console.log('new selected')
      this.searchCond.newSelected = true
      this.searchCond.orderOfPrice = 0
    },
    orderByPrice () {
      console.log('order by price')
      this.searchCond.newSelected && (this.searchCond.newSelected = false)
      this.searchCond.orderOfPrice = -this.searchCond.orderOfPrice
      this.searchCond.orderOfPrice || (this.searchCond.orderOfPrice = 1)
    },
    getProductList (cond = {}) {
      console.log('cond', cond)
      this.searchCond = Object.assign({}, this.searchCond, cond)
    },
    resetSearchCond (cond = {}) {
      console.log('cond', cond)
      this.searchCond = Object.assign({}, this.searchCond, cond)
    },
    requestProductList () {
      // todo: axios
    },
  },
}
</script>

<style lang="less">
#products {
  width: 100vw;
  height: 100vh;

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
}
</style>
