<template>
  <div id="filter-panel" :style="{ height: height + 'px'}" class="scroll-fix">
    <div class="content">
      <div class="content-item">
        <h3>{{ $t('category') }}</h3>
        <enum-selector
          :items="productCategory"
          :single="false"
          :selected.sync="categorySelected"
          @on-change="changeSelection"
        />
      </div>
      <div class="content-item">
        <h3>{{ $t('texture') }}</h3>
        <enum-selector
          :items="goldType"
          :single="false"
          :selected.sync="goldTypeSelected"
          @on-change="changeSelection"
        />
      </div>
      <div class="content-item">
        <h3>{{ $t('sellingPrice') }}</h3>
        <div class="price-group">
          <van-field
            class="price-input"
            v-model="sellingPrices[0]"
            :placeholder="$t('lowestPrice')"
            type="number"
          />
          <div class="slash">—</div>
          <van-field
            class="price-input"
            v-model="sellingPrices[1]"
            :placeholder="$t('highestPrice')"
            type="number"
          />
        </div>
      </div>
      <div class="content-item">
        <h3>{{ $t('rentPricePerDay') }}</h3>
        <div class="price-group">
          <van-field
            class="price-input"
            v-model="rentPrices[0]"
            :placeholder="$t('lowestPrice')"
            type="number"
          />
          <div class="slash">—</div>
          <van-field
            class="price-input"
            v-model="rentPrices[1]"
            :placeholder="$t('highestPrice')"
            type="number"
          />
        </div>
      </div>
    </div>
    <div class="van-hairline--top" />
    <div class="footer">
      <a href="javascript:void(0)" @click="onReset">
        {{ $t('resetSelection') }}
      </a>

      <van-button
        class="my-button filter-panel__btn"
        type="default"
        bottom-action
        @click="onConfirm"
      >{{ $t('confirm') }}</van-button>
    </div>
  </div>
</template>

<script>
import { PRODUCTCATEGORY, GOLDTYPE } from '@/constant'
import EnumSelector from './EnumSelector'

export default {
  components: {
    EnumSelector,
  },
  props: {
    category: {
      type: String,
    },
    sellingPriceDomain: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data () {
    return {
      productCategory: PRODUCTCATEGORY,
      goldType: GOLDTYPE,
      categorySelected: [],
      goldTypeSelected: [],
      sellingPrices: [],
      rentPrices: [],
      height: 0,
    }
  },
  // created () {
  //   this.categorySelected = []
  //   const idx = this.productCategory.findIndex(cur => {
  //     return cur.key.join`,` === this.category
  //   })
  //   console.log('idx', idx)
  //   if (idx !== -1) {
  //     this.categorySelected[idx] = true
  //   }
  //   this.$forceUpdate()
  // },
  mounted () {
    const app = document.getElementById('filter-panel')
    this.height = app.clientHeight
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )
  },
  beforeDestroy () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
  watch: {
    category: {
      immediate: true,
      deep: true,
      handler: function (val, oldVal) {
        this.categorySelected = []
        const idx = this.productCategory.findIndex(cur => {
          return cur.key.join`,` === val
        })
        if (idx !== -1) {
          this.categorySelected[idx] = true
        }
        this.$forceUpdate()
      },
    },
    sellingPriceDomain: {
      immediate: true,
      deep: true,
      handler: function (val, oldVal) {
        this.sellingPrices = [...val]
      },
    },
  },
  methods: {
    onReset () {
      this.categorySelected = []
      this.goldTypeSelected = []
      this.sellingPrices = []
      this.rentPrices = []
      this.$emit('on-reset', {
        category: [],
        goldType: [],
        sellingPrices: [],
        rentPrices: [],
      })
    },
    onConfirm (toggle) {
      console.log('onconfirm')
      this.$emit('on-confirm', {
        category: this.categorySelected.reduce((cum, b, i) => {
          b && (cum = cum.concat(this.productCategory[i].key))
          return cum
        }, []),
        goldType: this.goldTypeSelected.reduce((cum, b, i) => {
          b && (cum = cum.concat(this.goldType[i].key))
          return cum
        }, []),
        sellingPrices: this.sellingPrices,
        rentPrices: this.rentPrices,
      }, toggle)
    },
    changeSelection () {
      // console.log('changeSelection', this.categorySelected)
      // console.log('changeSelection', this.goldTypeSelected)
      this.onConfirm(false)
    },
  },
}
</script>

<style lang="less">
#filter-panel {
  width: 100%;
  max-height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .content {
    padding-bottom: 20px;

    .content-item {
      padding: 20px 18px 0;

      h3 {
        font-size: 14px;
        color: #000000;
        // line-height: 14px;
        text-align: left;
        margin: 0;
        margin-bottom: 18px;
      }

      .price-group {
        display: flex;
        flex-wrap: nowrap;
        font-size: 14px;

        .slash {
          line-height: 44px;
          color: #CCCCCC;
          padding: 0 8px;
        }

        .price-input {
          width: 130px;
          background: #F5F5F5;

          input {
            text-align: center;
            background: #F5F5F5;
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 75px;
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: block;
      font-size: 14px;
      color: #000000;
      // line-height: 14px;
    }

    .filter-panel__btn {
      width: 129px;
      height: 44px;
    }
  }
}
</style>
