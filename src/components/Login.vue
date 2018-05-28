<template>
  <div id="login">
    <h3>{{ $t('loginByPhone') }}</h3>
    <div class="login-container">
      <van-field
        v-model="userName"
        type="tel"
        :placeholder="$t('phoneNo')"
        :error="!!userNameErr"
        :error-message="userNameErrMsg"
        @blur="validUserName"
      />
      <van-field
        v-model="verifyCode"
        :placeholder="$t('verifyCode')"
        :error="!!verifyCodeErr"
        :error-message="verifyCodeErrMsg"
        @blur="validVerifyCode"
      >
        <van-button
          slot="button"
          size="small"
          type="default"
        >
          {{ $t('getVerifyCode') }}
        </van-button>
      </van-field>
      <p v-html="$t('loginTerm', { path: '/terms' })"></p>
    </div>
    <van-button type="default" bottom-action>{{ $t('loginBtn') }}</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      verifyCode: '',
      userNameErr: 0,
      verifyCodeErr: 0,
    }
  },
  watch: {
    userName: function (val, oldVal) {
      this.validUserName(val)
    }
  },
  computed: {
    userNameErrMsg: function () {
      const code = this.userNameErr
      return code ? this.$t('invalidPhoneNo') : ''
    },
    verifyCodeErrMsg: function () {
      const code = this.verifyCodeErr
      return code ? this.$t('invalidVerifyCode') : ''
    },
  },
  methods: {
    validUserName () {
      const pattern = /^1[3|5|7|8]\d{9}$/gi
      if (!pattern.test(this.userName)) {
        this.userNameErr = 1
      } else {
        this.userNameErr = 0
      }
    },
    validVerifyCode () {
      if (this.verifyCode) {
        this.verifyCodeErr = 0
      } else {
        this.verifyCodeErr = 1
      }
    },
  },
}
</script>

<style lang="less">
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 75px 0 100px;
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
      }
    }
  }
}
</style>
