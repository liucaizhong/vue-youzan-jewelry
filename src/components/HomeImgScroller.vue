<template>
  <div id="h-lazyload">
    <div
      class="content"
      v-for="(img, i) in imgList"
      :key="i"
    >
      <img
        class="thumb"
        v-lazy="img.src"
      >
      <div class="desc">
        <p v-if="img.name" class="name van-ellipsis">{{ img.name }}</p>
        <p v-if="img.price" class="price">{{ '￥' + img.price }}</p>
        <p v-if="img.rent" class="rent">
          {{ '￥' + img.rent + '/' + $t('day') }}
        </p>
      </div>
    </div>
    <div class="placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      default: function () {
        // return []
        return [{
          src: 'https://www.baidu.com/img/bd_logo1.png',
          name: 'aadfdfsdfsdfsdfsdf',
          price: '777777',
          rent: '123',
        }, {
          src: 'https://www.baidu.com/img/bd_logo1.png1',
          name: 'dfsdfasdfsdf',
          price: '44444',
          rent: '121',
        }, {
          src: 'https://www.baidu.com/img/bd_logo1.png',
          name: 'dfsdfasdfsdf',
          price: '44444',
          rent: '121',
        }, {
          src: 'https://www.baidu.com/img/bd_logo1.png1',
          name: 'dfsdfasdfsdf',
          price: '44444',
          rent: '121',
        }, {
          src: 'https://www.baidu.com/img/bd_logo1.png',
          name: 'dfsdfasdfsdf',
          price: '44444',
          rent: '121',
        }]
      },
    },
  },
}
</script>

<style lang="less">
#h-lazyload {
  position: relative;
  width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
  padding: 5px 0 20px;

  .content {
    width: 130px;
    // height: 180px;

    &:first-child {
      margin-left: 18px;
    }

    &:not(:nth-last-child(2)) {
      margin-right: 10px;
    }

    .thumb {
      width: 120px;
      height: 120px;
      border: 2px solid #CCB8A3;
    }

    .desc {
      width: 120px;
      padding: 5px 2px;

      p {
        margin: 0;
        margin-bottom: 8px;
      }

      .name {
        font-size: 14px;
        color: #000000;
        line-height: 14px;
      }

      .price {
        font-size: 14px;
        color: #333333;
        line-height: 14px;
      }

      .rent {
        font-size: 12px;
        color: #B99F85;
        line-height: 12px;
      }
    }
  }

  .placeholder {
    min-width: 20px;
    min-height: 100%;
  }
}
</style>
