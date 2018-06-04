<template>
  <div id="mine-page">
    <header class="user-info">
      <span class="username">{{ userName }}</span>
      <a href="javascript:void(0)" @click="onUser">{{ userBtnText }}</a>
    </header>
  </div>
</template>

<script>
export default {
  // props: {
  //   logged: Boolean,
  // },
  // watch: {
  //   logged: function (val, oldVal) {
  //     console.log('logged', val)
  //   },
  // },
  data () {
    return {
      logged: false,
    }
  },
  activated () {
    this.logged = this.$getCookie('logged') === '0'
  },
  computed: {
    userName: function () {
      return this.logged ? '137XXXX1111' : this.$t('notLoggedIn')
    },
    userBtnText: function () {
      return this.logged ? `${this.$t('detail')} >` : `${this.$t('loginBtn')} >`
    },
  },
  methods: {
    onUser () {
      console.log('onUser')
      if (this.logged) {
        // todo: show detail
      } else {
        // todo: login
      }
    },
  },
}
</script>

<style lang="less">
#mine-page {
  width: 100vw;
  height: 100vh;
  background: #F5F5F5;
  overflow: auto;

  .user-info {
    width: 100%;
    height: 140px;
    background: #FAFAFA;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 47px 0 32px;

    .username {
      font-size: 24px;
      color: #333333;
      text-align: center;
      line-height: 20px;
    }

    a {
      font-size: 14px;
      color: #B99F85;
      text-align: left;
      line-height: 16px;
    }
  }
}
</style>
