<template>
  <div class="product-item">
    <router-link :to="`/product/${img.productid}`">
      <img
        class="thumb"
        v-lazy="img.mainimage"
      >
      <div class="desc">
        <p v-if="img.series || img.title" class="name van-ellipsis">{{ productName }}</p>
        <p v-if="img.sellingPrice" class="price">{{ $n(img.sellingPrice, 'currency') }}</p>
        <p v-if="img.rent" class="rent">
          {{ $n(img.rent, 'currency') + '/' + $t('day') }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: Object,
      required: true,
    }
  },
  computed: {
    productName: function () {
      return (this.img.series && this.img.series + '-') + this.img.title
    },
  },
}
</script>

<style lang="less">
@imgSize: 120px;

.product-item {
  width: 100%;
  // height: 180px;

  a {
    display: block;
    width: 100%;
    height: 100%;
  }

  .thumb {
    width: @imgSize;
    height: @imgSize;
    border: 2px solid #CCB8A3;
  }

  .desc {
    width: @imgSize;
    padding: 5px 2px;

    p {
      margin: 0;
      margin-bottom: 8px;
    }

    .name {
      font-size: 14px;
      color: #000000;
      // line-height: 14px;
    }

    .price {
      font-size: 14px;
      color: #333333;
      // line-height: 14px;
    }

    .rent {
      font-size: 12px;
      color: #B99F85;
      // line-height: 12px;
    }
  }
}
</style>
