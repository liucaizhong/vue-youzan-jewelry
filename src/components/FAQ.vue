<template>
  <div id="faq" class="scroll-fix">
    <img :src="url" alt="faq">
  </div>
</template>

<script>
import { FAQIMAGES } from '@/constant'

export default {
  data () {
    return {
      url: FAQIMAGES.avatar || FAQIMAGES.url,
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
#faq {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
