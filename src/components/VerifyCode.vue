<template>
  <van-field
    class="my-field has-btn"
    :value="value"
    @input="handleInput($event)"
    :placeholder="$t('verifyCode')"
    :error="!!err"
    :error-message="errMsg"
    @blur="validation($event.target.value)"
  >
    <van-button
      slot="button"
      size="small"
      type="default"
      @click="handleClick"
    >
      {{ btnText }}
    </van-button>
  </van-field>
</template>

<script>
export default {
  props: {
    value: String,
    baseInfo: {
      required: true,
      type: Object,
    },
    error: Number,
  },
  data () {
    return {
      err: 0,
      getCoding: false,
      timerTip: 60,
      phone: '',
      phoneInvalid: false,
    }
  },
  watch: {
    baseInfo: {
      immediate: true,
      deep: true,
      handler (val, oldVal) {
        const { phone, phoneInvalid } = val
        this.phone = phone
        this.phoneInvalid = phoneInvalid
      },
    },
    error: {
      immediate: true,
      handler (val, oldVal) {
        this.err = val
      },
    },
  },
  computed: {
    errMsg: function () {
      const code = this.err
      return code ? this.$t('invalidVerifyCode') : ''
    },
    btnText: function () {
      return this.getCoding ? this.timerTip + 's' : this.$t('getVerifyCode')
    },
  },
  methods: {
    handleInput (val) {
      console.log('handleInput', val)
      this.$emit('input', val)
      this.validation(val)
    },
    validation (val) {
      if (val) {
        this.err = 0
        this.$emit('handleError', false)
      } else {
        this.err = 1
        this.$emit('handleError', true)
      }
    },
    handleClick () {
      if (!this.phoneInvalid && this.phone) {
        if (!this.getCoding) {
          this.getCoding = true
          const timer = setInterval(() => {
            if (this.timerTip) {
              --this.timerTip
            } else {
              this.getCoding = false
              this.timerTip = 60
              clearInterval(timer)
            }
          }, 1000)

          // fetch code
          const url = '/client/GetVerifyCode/'
          this.$fetch(url, {
            params: {
              phone: this.phone,
            },
          }).then(resp => {
            console.log('resp', resp)
            const code = resp.data.verifycode
            this.handleInput(code)
            this.$message({
              content: this.$t('verifyCodeSuccess'),
            })
          }).catch(err => {
            console.log(err)
            this.$message({
              content: this.$t('verifyCodeFail'),
            })
          })
        }
      }
    },
  },
}
</script>
