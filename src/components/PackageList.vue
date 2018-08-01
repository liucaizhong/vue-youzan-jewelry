<template>
  <div id="package-list" class="scroll-fix">
    <van-list
      class="package-info-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadmore"
      :loading-text="$t('loadMore')"
      :immediate-check="false"
    >
      <div
        class="package-info-card"
        v-for="(item, i) in packages"
        :key="i"
      >
        <div class="left">
          <div class="title van-ellipsis">{{ item.title }}</div>
          <div class="desc">{{ $t('packagePrice') + ': ' + $n(item.price, 'currency') }}</div>
          <div class="desc">{{ $t('packageDeposit') + ': ' + $n(item.deposit, 'currency') }}</div>
          <div class="desc">{{ $t('packagePeriod') + ': ' + item.period + $t('day') }}</div>
          <div class="desc">{{ composePackageProductDomain(item.lowerLimit, item.upperLimit) }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <div class="right">
          <!-- <router-link :to="`/payment/${item.packageNo}?type=1&nopr=true`">
            {{ $t('buyImmediately') }}
          </router-link> -->
          <a href="javascript:void(0)" @click="buyPackage(item.packageNo)">{{ $t('buyImmediately') }}</a>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logged: false,
      loading: false,
      finished: false,
      offset: 0,
      limit: 15,
      packages: [],
    }
  },
  created () {
    this.logged = this.$getCookie('logged') === '0'
    this.getPackages(true)
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
    composePackageProductDomain (lower, upper) {
      return this.$t('packageProductDomain') + ': ' + this.$n(lower, 'currency') +
        (upper ? '～' + this.$n(upper, 'currency') : '')
    },
    onLoadmore () {
      this.loading = true
      this.getPackages()
    },
    getPackages (loading = false) {
      const url = '/client/package/'
      const { offset, limit } = this.$data
      this.$fetch(url, {
        params: {
          offset: offset * limit,
          limit,
        },
      }, loading).then(resp => {
        console.log('resp', resp)
        ++this.offset
        const results = resp.data.results
        this.packages = [...results]
        this.loading = false
        if (results.length < this.limit) {
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    buyPackage (packageNo) {
      if (this.logged) {
        const url = '/client/ComboService/'
        this.$fetch(url, {
          data: {
            packageNo,
          },
          method: 'post',
        }, true).then(resp => {
          console.log(resp)
          this.$router.push(`/payment/${resp.data.serviceNo}?type=1&nopr=true`)
        }).catch(err => {
          console.log(err)
          this.$message({
            content: this.$t('paymentFail'),
          })
        })
      } else {
        this.$router.replace({
          path: '/login',
          query: {
            redirect: '/package-list',
          },
        })
      }
    },
  }
}
</script>

<style lang="less">
#package-list {
  background: #fff;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .package-info-card {
    display: flex;
    width: 100%;
    align-items: flex-start;
    padding: 30px 18px 20px;
    border-bottom: .5px solid #F2F2F2;

    .left {
      flex: 1;

      .title {
        font-size: 16px;
        margin-bottom: 8px;
      }

      .desc {
        font-size: 14px;
        color: #AFAFAF;
        margin-bottom: 2px;
      }
    }

    .right {
      min-width: 65px;

      a {
        font-size: 16px;
        color: #B99F85;
        text-decoration: underline;
      }
    }
  }
}
</style>
