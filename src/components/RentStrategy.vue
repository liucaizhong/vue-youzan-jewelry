<template>
  <div id="rent-strategy" class="scroll-fix">
    <img :src="url" alt="rent-strategy">
  </div>
</template>

<script>
import { STRATEGYIMAGES } from '@/constant'

export default {
  data () {
    return {
      url: STRATEGYIMAGES.url,
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
#rent-strategy {
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
