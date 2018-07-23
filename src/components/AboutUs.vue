<template>
  <div id="about-us" class="scroll-fix">
    <img :src="url" alt="about-us">
  </div>
</template>

<script>
import { ABOUTUSIMAGES } from '@/constant'

export default {
  data () {
    return {
      url: ABOUTUSIMAGES.url,
    }
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
}
</script>

<style lang="less">
#about-us {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
