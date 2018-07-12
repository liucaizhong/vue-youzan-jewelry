<template>
  <div id="new-phone">
    <h3>{{ $t('newPhone') }}</h3>
    <div class="new-phone-container">
      <phone-input
        v-model="newPhone"
        @handleError="newPhoneErr = $event"
        :error="+newPhoneErr"
        :placeholder="$t('inputNewPhone')"
      />
      <verify-code
        v-model="verifyCode"
        @handleError="verifyCodeErr = $event"
        :error="+verifyCodeErr"
        :baseInfo="{
          phone: newPhone,
          phoneInvalid: newPhoneErr,
        }"
      />
    </div>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="bind"
      :loading="bindLoading"
    >{{ $t('confirmUpdate') }}</van-button>
  </div>
</template>

<script>
import PhoneInput from './PhoneInput'
import VerifyCode from './VerifyCode'

export default {
  components: {
    PhoneInput,
    VerifyCode,
  },
  data () {
    return {
      newPhone: '',
      newPhoneErr: false,
      verifyCode: '',
      verifyCodeErr: false,
      bindLoading: false,
    }
  },
  methods: {
    bind () {
      if (this.newPhoneErr || this.verifyCodeErr ||
          !this.newPhone || !this.verifyCode) {
        this.newPhoneErr = this.newPhoneErr || !this.newPhone
        this.verifyCodeErr = this.verifyCodeErr || !this.verifyCode
      } else {
        this.bindLoading = true
        const url = '/client/bindphone/'
        this.$fetch(url, {
          data: {
            // phone: this.newPhone,
            verifycode: this.verifyCode,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          // const bindInfo = Object.assign({}, resp.data)
          // this.$store.commit('userbind', bindInfo)
          this.bindLoading = false
          this.$message({
            content: this.$t('bindPhoneSuccess'),
          })
          this.$router.push('/user-info')
        }).catch(err => {
          console.log(err)
          this.bindLoading = false
          this.$message({
            content: this.$t('bindPhoneFail'),
          })
        })
      }
    },
  },
}
</script>

<style lang="less">
#new-phone {
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 38px 24px 0;

  h3 {
    font-size: 18px;
    text-align: center;
    margin: 0;
    margin-bottom: 28px;
  }
}
</style>
