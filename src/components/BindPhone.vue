<template>
  <div id="bind" :style="{ height: height + 'px'}" class="scroll-fix">
    <h3>{{ $t('bindPhone') }}</h3>
    <div class="bind-container">
      <phone-input
        v-model="phone"
        @handleError="phoneErr = $event"
        :error="+phoneErr"
      />
      <verify-code
        v-model="verifyCode"
        @handleError="verifyCodeErr = $event"
        :error="+verifyCodeErr"
        :baseInfo="{
          phone: phone,
          phoneInvalid: phoneErr,
        }"
      />
    </div>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="bind"
      :loading="bindLoading"
    >{{ $t('bindPhoneBtn') }}</van-button>
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
      phone: '',
      verifyCode: '',
      phoneErr: false,
      verifyCodeErr: false,
      bindLoading: false,
      height: 0,
    }
  },
  created () {
    this.redirectUrl = this.$route.query.redirect || '/index'
  },
  mounted () {
    const app = document.getElementById('app')
    this.height = app.clientHeight
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )
  },
  beforeDestroy () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
  methods: {
    bind () {
      if (this.phoneErr || this.verifyCodeErr ||
          !this.phone || !this.verifyCode) {
        this.phoneErr = this.phoneErr || !this.phone
        this.verifyCodeErr = this.verifyCodeErr || !this.verifyCode
      } else {
        this.bindLoading = true
        const url = '/client/bindphone/'
        this.$fetch(url, {
          data: {
            phone: this.phone,
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
          this.$router.push(this.redirectUrl)
        }).catch(err => {
          console.log(err)
          this.bindLoading = false
          this.$message({
            content: this.$t('bindPhoneFail'),
          })
        })
      }
    }
  },
}
</script>

<style lang="less">
#bind {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 142px 24px 0;
  padding: 80px 24px 0;
  width: 100vw;
  height: 100vh;
  background: #fff;

  h3 {
    // line-height: 16px;
    text-align: center;
    font-size: 18px;
    margin: 0;
    margin-bottom: 30px;
  }

  .bind-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    p {
      // width: 327px;
      width: 100%;
      font-size: 12px;
      color: #AFAFAF;
      text-align: left;
      // line-height: 12px;
      margin: 0;
      margin-bottom: 24px;

      a {
        color: #AFAFAF;
        text-decoration: underline;
      }
    }
  }
}
</style>
