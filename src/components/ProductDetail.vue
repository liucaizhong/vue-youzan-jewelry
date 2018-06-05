<template>
  <div id="product-detail">
    <footer class="product-detail__footer">
      <van-button
        class="my-button rent-btn"
        type="default"
        bottom-action
        @click="onConfirmRent"
      >{{ $t('rentProduct', [product.rent]) }}</van-button>
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
export default {
  data () {
    return {
      product: {
        productid: '',
        rent: '499',
      },
    }
  },
  created () {
    console.log('$route', this.$route)
    this.product.productid = this.$route.params.id
  },
  methods: {
    onConfirmRent () {
      console.log('onConfirmRent')
      this.$router.push(`/rent/${this.product.productid}`)
    },
    onConfirmBuy () {
      console.log('onConfirmBuy')
      this.$router.push(`/payment-buy/${this.product.productid}`)
    },
  },
}
</script>

<style lang="less">
#product-detail {
  margin-bottom: 50px;
  overflow: auto;

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
