<template>
  <div id="change-email">
    <van-field
      class="my-field"
      :value="email"
      :placeholder="$t('email')"
      :error="emailErr"
      :error-message="$t('emailInvalid')"
      @input="onInputEmail($event)"
      autofocus
    />
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="update"
      :loading="udpateLoading"
    >{{ $t('confirmUpdate') }}</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      email: '',
      emailErr: false,
      udpateLoading: false,
    }
  },
  created () {
    this.email = this.userInfo.email
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  },
  methods: {
    onInputEmail (val) {
      this.email = val
      this.validateEmail(val)
    },
    validateEmail (val) {
      const pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g
      this.emailErr = val && !pattern.test(val)
    },
    update () {
      if (this.emailErr || !this.email) {
        this.emailErr = this.emailErr || !this.email
      } else {
        this.udpateLoading = true
        const url = '/client/user/perfectinfo/'
        this.$fetch(url, {
          data: {
            email: this.email,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          // const bindInfo = Object.assign({}, resp.data)
          // this.$store.commit('userbind', bindInfo)
          this.udpateLoading = false
          this.$message({
            content: this.$t('udpateSuccess'),
          })
          this.$router.push('/user-info')
        }).catch(err => {
          console.log(err)
          this.udpateLoading = false
          this.$message({
            content: this.$t('udpateFail'),
          })
        })
      }
    },
  }
}
</script>

<style lang="less">
#change-email {
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 30px 18px 0;
}
</style>
