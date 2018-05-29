<template>
  <div id="login">
    <h3>{{ $t('loginByPhone') }}</h3>
    <div class="login-container">
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
      <p v-html="$t('loginTerm', { path: '/terms' })"></p>
    </div>
    <van-button
      class="custom-button"
      type="default"
      bottom-action
      @click="login"
      :loading="loginLoading"
    >{{ $t('loginBtn') }}</van-button>
    <a href="#" class="wechat-login">
      <img src="../assets/wechat.png" />
      <span>{{ $t('wechatLogin') }}</span>
    </a>
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
      loginLoading: false,
    }
  },
  methods: {
    login () {
      if (this.userNameErr || this.verifyCodeErr ||
          !this.userName || !this.verifyCode) {
        this.userNameErr = this.userNameErr || !this.userName
        this.verifyCodeErr = this.verifyCodeErr || !this.verifyCode
      } else {
        this.loginLoading = true
        const url = '/client/UserLogin/'
        this.$fetch(url, {
          data: {
            username: this.userName,
            verifycode: this.verifyCode,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          this.loginLoading = false
          this.$message({
            content: this.$t('loginSuccess'),
          })
        }).catch(err => {
          console.log(err)
          this.loginLoading = false
          this.$message.info({
            content: this.$t('loginFail'),
          })
        })
      }
    }
  },
}
</script>

<style lang="less">
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 142px 0 0;
  height: 100vh;

  h3 {
    line-height: 16px;
    text-align: center;
    font-size: 18px;
    margin: 0;
    margin-bottom: 30px;
  }

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      width: 327px;
      font-size: 12px;
      color: #AFAFAF;
      text-align: left;
      line-height: 12px;
      margin: 0;
      margin-bottom: 24px;

      a {
        color: #AFAFAF;
        text-decoration: underline;
      }
    }
  }

  .wechat-login {
    font-size: 14px;
    color: #545454;
    text-align: center;
    line-height: 14px;
    position: fixed;
    bottom: 70px;
    display: inline-flex;
    height: 19px;
    align-items: center;

    img {
      width: 23px;
      margin-right: 7px;
    }
  }
}
</style>
