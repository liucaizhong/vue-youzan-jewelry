<template>
  <div id="login" :style="{ height: height + 'px'}" class="scroll-fix">
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
      class="my-button"
      type="default"
      bottom-action
      @click="login"
      :loading="loginLoading"
    >{{ $t('loginBtn') }}</van-button>
    <a href="#" class="wechat-login">
      <img src="../assets/img/wechat.png" />
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
      height: 0,
    }
  },
  created () {
    this.redirectUrl = this.$route.query.redirect || '/index'
    const app = document.getElementById('app')
    this.height = app.clientHeight
  },
  mounted () {
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
          // const loginInfo = Object.assign({}, resp.data)
          // this.$store.commit('userLogin', loginInfo)
          this.loginLoading = false
          this.$message({
            content: this.$t('loginSuccess'),
          })
          this.$router.push(this.redirectUrl)
        }).catch(err => {
          console.log(err)
          this.loginLoading = false
          this.$message({
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
  // padding: 142px 24px 0;
  padding: 80px 24px 0;
  width: 100vw;
  // height: 100vh;
  background: #fff;
  min-height: 500px;

  h3 {
    // line-height: 16px;
    text-align: center;
    font-size: 18px;
    margin: 0;
    margin-bottom: 30px;
  }

  .login-container {
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

  .wechat-login {
    font-size: 14px;
    color: #545454;
    text-align: center;
    position: relative;
    top: 100px;
    // position: absolute;
    // bottom: 70px;
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
