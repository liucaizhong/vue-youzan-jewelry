<template>
  <van-field
    class="my-field"
    :value="value"
    @input="handleInput($event)"
    type="tel"
    :placeholder="placeholder"
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
    placeholder: {
      type: String,
      default: function () {
        return this.$t('phoneNo')
      }
    }
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
      const pattern = /^\d{11}$/gi
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
