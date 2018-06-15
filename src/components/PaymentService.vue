<template>
  <div id="payment-service">payment-service</div>
</template>

<script>
import MyServiceCard from './MyServiceCard'

export default {
  components: {
    MyServiceCard,
  },
  data () {
    return {
      api: '',
    }
  },
  created () {
    console.log('this.$attrs', this.$attrs)
    this.api = this.$attrs.api
  },
}
</script>

<style lang="less">

</style>
