<template>
  <div id="change-address">
    <van-field
      class="my-field"
      :value="address"
      :placeholder="$t('address')"
      :error="addressErr"
      :error-message="$t('addressInvalid')"
      @input="onInputAddress($event)"
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
      address: '',
      addressErr: false,
      udpateLoading: false,
    }
  },
  created () {
    this.address = this.userInfo.address
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  },
  methods: {
    onInputAddress (val) {
      this.address = val
      this.validateAddress(val)
    },
    validateAddress (val) {
      this.addressErr = !val
    },
    update () {
      if (this.addressErr || !this.address) {
        this.addressErr = this.addressErr || !this.address
      } else {
        this.udpateLoading = true
        const url = '/client/user/perfectinfo/'
        this.$fetch(url, {
          data: {
            address: this.address,
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
#change-address {
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 30px 18px 0;
}
</style>
