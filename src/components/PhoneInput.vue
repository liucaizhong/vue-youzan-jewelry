<template>
  <van-field
    class="my-field"
    :value="value"
    @input="handleInput($event)"
    type="tel"
    :placeholder="$t('phoneNo')"
    :error="!!err"
    :error-message="errMsg"
    @blur="validation($event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: String,
    error: Number,
  },
  data () {
    return {
      err: 0,
    }
  },
  watch: {
    error: {
      handler (val, oldVal) {
        this.err = val
      }
    },
  },
  computed: {
    errMsg: function () {
      const code = this.err
      return code ? this.$t('invalidPhoneNo') : ''
    },
  },
  methods: {
    handleInput (val) {
      this.$emit('input', val)
      this.validation(val)
    },
    validation (val) {
      const pattern = /^1[3|5|7|8]\d{9}$/gi
      if (!pattern.test(val)) {
        this.err = 1
        this.$emit('handleError', true)
      } else {
        this.err = 0
        this.$emit('handleError', false)
      }
    },
  },
}
</script>
