<template>
  <div id="payment-service">payment-service</div>
</template>

<script>
export default {
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
