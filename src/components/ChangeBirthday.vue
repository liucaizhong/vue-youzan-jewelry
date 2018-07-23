<template>
  <div id="change-birthday">
    <my-datetime-picker
      :initialValue="initialDate"
      :confirmBtnText="$t('complete')"
      :cancelBtnText="$t('close')"
      :placeholder="$t('birthday')"
      @confirm="confirmBirthday"
      :error="birthdayErr"
      :errMsg="$t('birthdayInvalid')"
      :min-date="new Date(1960, 0, 1)"
      :max-date="new Date()"
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
import MyDatetimePicker from './MyDatetimePicker'
import { mapState } from 'vuex'

export default {
  components: {
    MyDatetimePicker,
  },
  data () {
    return {
      birthday: '',
      birthdayErr: false,
      udpateLoading: false,
    }
  },
  created () {
    this.birthday = this.userInfo.birthday
    const [y, m, d] = this.birthday.split`-`
    this.initialDate = (this.birthday && new Date(y, m - 1, d)) || null
    // this.initialDate = null
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  },
  methods: {
    confirmBirthday (val) {
      this.birthday = val
    },
    update () {
      if (this.birthdayErr || !this.birthday) {
        this.birthdayErr = this.birthdayErr || !this.birthday
      } else {
        this.udpateLoading = true
        const url = '/client/user/perfectinfo/'
        this.$fetch(url, {
          data: {
            birthday: this.birthday,
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
#change-birthday {
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 30px 18px 0;

  .my-datetime-picker {
    width: 100%;
    position: relative;
    margin-bottom: 24px;

    .picker-btn {
      color: #919191;
      font-size: 14px;
      height: 44px;
      line-height: 44px;
      padding: 0 15px;
      border-color: #000000;
    }
  }
}
</style>
