<template>
  <div id="change-phone">
    <div class="cur-phone">{{ $t('bindedPhone') + ' ' + userInfo.phone }}</div>
    <verify-code
      v-model="verifyCode"
      @handleError="verifyCodeErr = $event"
      :error="+verifyCodeErr"
      :baseInfo="{
        phone: userInfo.phone,
        phoneInvalid: false,
      }"
    />
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="onNext"
      :loading="verifyLoading"
    >{{ $t('nextStep') }}</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VerifyCode from './VerifyCode'

export default {
  components: {
    VerifyCode,
  },
  data () {
    return {
      verifyCode: '',
      verifyCodeErr: false,
      verifyLoading: false,
    }
  },
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  methods: {
    onNext () {
      if (this.verifyCode) {
        this.verifyLoading = true
        const url = '/client/verifyphone'
        this.$fetch(url, {
          data: {
            verifyCode: this.verifyCode,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          // const bindInfo = Object.assign({}, resp.data)
          // this.$store.commit('userbind', bindInfo)
          this.verifyLoading = false
          this.$router.push('/new-phone')
        }).catch(err => {
          console.log(err)
          this.verifyLoading = false
          this.$message({
            content: this.$t('invalidVerifyCode'),
          })
        })
      } else {
        this.verifyCodeErr = true
      }
    },
  },
}
</script>

<style lang="less">
#change-phone {
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 38px 18px 0;

  .cur-phone {
    font-size: 14px;
    margin-bottom: 30px;
  }
}
</style>
