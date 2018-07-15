<template>
  <div id="home-news">
    <div class="dummy" />
    <div class="content">
      <div class="left">
        <router-link v-if="imgList[0]" :to="imgList[0].link">
          <img v-lazy="imgList[0].avatar || imgList[0].url" >
        </router-link>
      </div>
      <div class="van-hairline--right" />
      <div class="right">
        <div class="right-part">
          <router-link v-if="imgList[1]" :to="imgList[1].link">
            <img v-lazy="imgList[1].avatar || imgList[1].url" >
          </router-link>
        </div>
        <div class="van-hairline--bottom" />
        <div class="right-part">
          <router-link v-if="imgList[2]" :to="imgList[2].link">
            <img v-lazy="imgList[2].avatar || imgList[2].url" >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
}
</script>

<style lang="less">
#home-news {
  position: relative;
  width: 100vw;
  background: #fff;
  overflow: hidden;

  .dummy {
    margin-top: 100vw;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: stretch;

    a {
      display: block;
      width: 100%;
      height: 100%;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .left {
      max-width: 50%;
      flex: 1;
    }

    .right {
      max-width: 50%;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;

      .right-part {
        flex: 1;
        max-height: 50%;
      }
    }
  }
}
</style>
