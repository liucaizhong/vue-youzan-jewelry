<template>
  <van-radio
    :name="radioName"
    :class="['my-radio', radioClass, { checked: type === radioName }]"
  >
    <slot name="title"></slot>
    <slot name="content"></slot>
  </van-radio>
</template>

<script>
export default {
  props: {
    radioType: String,
    radioName: String,
    radioClass: {
      type: String,
      default: 'my-radio-square',
    },
  },
  data () {
    return {
      type: '',
    }
  },
  created () {
    this.type = this.radioType
  },
  watch: {
    radioType: function (val, oldVal) {
      this.type = val
    },
  },
}
</script>
