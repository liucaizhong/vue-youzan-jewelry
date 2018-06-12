<template>
  <div id="filter-panel">
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
  },
  data () {
    return {
      productCategory: PRODUCTCATEGORY,
      goldType: GOLDTYPE,
      categorySelected: [],
      goldTypeSelected: [],
    }
  },
  created () {
    this.categorySelected = []
    const idx = this.productCategory.findIndex(cur => {
      return cur.key.join`,` === this.category
    })
    console.log('idx', idx)
    if (idx !== -1) {
      this.categorySelected[idx] = true
    }
    this.$forceUpdate()
  },
  watch: {
    category: {
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
    }
  },
  methods: {
    onReset () {
      this.categorySelected = []
      this.goldTypeSelected = []
      this.$emit('on-reset', {
        category: [],
        goldType: [],
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
  overflow-y: auto;

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
