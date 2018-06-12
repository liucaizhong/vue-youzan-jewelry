<template>
  <div id="mine-page">
    <header class="user-info">
      <span class="username">{{ userName }}</span>
      <a href="javascript:void(0)" @click="onUser">{{ userBtnText }}</a>
    </header>
    <!-- <div class="van-hairline--top"></div> -->
    <van-cell-group>
      <van-cell
        class="my-field"
        :title="$t('myService')"
        is-link
        to="/my-service"
      />
    </van-cell-group>
    <div class="service-tab">
      <my-badge
        v-for="(item, i) in myServiceTabs"
        :key="item.key"
        :url="item.url"
        :info="myServiceTabInfo[i]"
        :title="$t(item.title)"
      >
        <template slot="icon">
          <my-svg v-if="item.icon" :render="item.icon" />
        </template>
      </my-badge>
    </div>
    <van-cell-group class="other-info">
      <van-cell class="my-field" :title="$t('myWallet')" is-link to="/my-wallet" />
      <van-cell class="my-field" :title="$t('myReservation')" is-link to="/my-reservation" />
      <van-cell class="my-field" :title="$t('outlets')" is-link to="/outlets" />
      <van-cell class="my-field" :title="$t('FAQ')" is-link to="/FAQ" />
      <van-cell class="my-field" :title="$t('aboutUs')" is-link to="/about-us" />
    </van-cell-group>
  </div>
</template>

<script>
import MyBadge from './MyBadge'
import MySvg from './MySvg'
import { MYSERVICETABS } from '@/constant'
import { mapState } from 'vuex'

export default {
  components: {
    MyBadge,
    MySvg,
  },
  data () {
    return {
      logged: false,
      myServiceTabs: MYSERVICETABS,
      myServiceTabInfo: [10, 0, 5, 0],
    }
  },
  activated () {
    this.logged = this.$getCookie('logged') === '0'
    console.log('loading', this.loading)
    this.loading || this.$store.commit('updateGlobalLoading', false)
  },
  computed: {
    userName: function () {
      return this.logged ? '137XXXX1111' : this.$t('notLoggedIn')
    },
    userBtnText: function () {
      return this.logged ? `${this.$t('detail')}` : `${this.$t('loginBtn')}`
    },
    ...mapState([
      'loading',
    ]),
  },
  methods: {
    onUser () {
      console.log('onUser')
      if (this.logged) {
        // todo: show detail
      } else {
        // todo: login
        this.$router.push('/login')
      }
    },
    onServiceTab (key) {
      console.log('serviceTab', key)
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
  padding-bottom: 60px;

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
      // line-height: 20px;
    }

    a {
      font-size: 14px;
      color: #B99F85;
      text-align: left;
      line-height: 16px;
    }
  }

  .my-field {
    height: 50px;

    .van-cell__title {
      span {
        font-size: 14px;
        color: #B99F85;
        line-height: 30px;
      }
    }

    .van-icon {
      line-height: 30px;
    }
  }

  .service-tab {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    background: #fff;
    max-height: 80px;

    .my-svg {
      width: 30px;
      height: 30px;
    }
  }

  .other-info {
    margin-top: 12px;

    .my-field {
      .van-cell__title {
        span {
          color: #000;
        }
      }
    }
  }
}
</style>
