<template>
  <div id="payment-success" class="scroll-fix">
    <header class="payment-success--header">
      <p class="main-title">{{ isPackage ? $t('changeSuccess') : $t('paymentSuccess') }}</p>
      <p
        class="content"
        v-for="i in 7"
        :key="i"
      >
        {{ $t(`paymentSuccessDescLine${i-1}`) }}
      </p>
    </header>
    <section class="payment-success--auth" v-if="!isAuth">
      <p class="auth-desc">{{ $t('perfectInfoTip') }}</p>
      <van-button
        class="my-button"
        bottom-action
        type="default"
        @click="perfectInfo"
      >{{ $t('perfectInfo') }}</van-button>
    </section>
    <section class="payment-success--footer">
      <div class="router-group">
        <router-link
          to="/index"
          replace
        >{{ $t('backToIndex') }}</router-link>
        |
        <router-link
          :to="`/my-service#${myServiceTab}`"
          replace
        >{{ $t('checkService') }}</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isAuth: false,
      isPackage: false,
    }
  },
  created () {
    this.isAuth = this.$getCookie('isAuthenticated') === '0'
    this.isPackage = this.$route.query.type === '1'
    this.myServiceTab = this.$route.query.serviceTab || '1'
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
    perfectInfo () {
      this.$router.push('/perfectinfo')
    },
  },
}
</script>

<style lang="less">
#payment-success {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  // background: #F5F5F5;

  .payment-success--header {
    width: 100%;
    min-height: 156px;
    padding: 32px 18px;
    background: #fff;

    p {
      margin: 0;
    }

    .main-title {
      font-size: 18px;
      margin-bottom: 20px;
    }

    .content {
      font-size: 14px;
      color: #999999;
    }
  }

  .payment-success--auth {
    padding: 25px 18px;
    background: #fff;
    margin-top: 12px;

    .auth-desc {
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 20px;
    }

    .my-button {
      width: 115px;
      height: 40px;
    }
  }

  .payment-success--footer {
    position: absolute;
    width: 100%;
    bottom: 28px;
    display: flex;
    justify-content: space-around;

    .router-group {
      color: #B99F85;

      a {
        font-size: 14px;
        color: #B99F85;
        text-decoration: underline;
      }
    }
  }
}
</style>
