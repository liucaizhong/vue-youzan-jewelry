<template>
  <div id="bind">
    <h3>{{ $t('bindPhone') }}</h3>
    <div class="bind-container">
      <phone-input
        v-model="userName"
        @handleError="userNameErr = $event"
        :error="+userNameErr"
      />
      <verify-code
        v-model="verifyCode"
        @handleError="verifyCodeErr = $event"
        :error="+verifyCodeErr"
        :baseInfo="{
          phone: userName,
          phoneInvalid: userNameErr,
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
      userName: '',
      verifyCode: '',
      userNameErr: false,
      verifyCodeErr: false,
      bindLoading: false,
    }
  },
  created () {
    this.redirectUrl = this.$route.query.redirect || '/index'
  },
  methods: {
    bind () {
      if (this.userNameErr || this.verifyCodeErr ||
          !this.userName || !this.verifyCode) {
        this.userNameErr = this.userNameErr || !this.userName
        this.verifyCodeErr = this.verifyCodeErr || !this.verifyCode
      } else {
        this.bindLoading = true
        const url = '/client/bindphone/'
        this.$fetch(url, {
          data: {
            username: this.userName,
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
