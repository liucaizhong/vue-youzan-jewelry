<template>
  <div id="perfect-info">
    <h3>{{ $t('perfectInfo') }}</h3>
    <div class="perfect-info-container">
      <van-field
        class="my-field required"
        :value="realName"
        :placeholder="$t('realName')"
        :error="realNameErr"
        :error-message="realNameErrMsg"
        @input="onInputRealName($event)"
        @blur="validateRealName($event.target.value)"
        autofocus
      />
      <my-picker
        class="required"
        :confirmBtnText="$t('complete')"
        :cancelBtnText="$t('close')"
        :placeholder="$t('identityType')"
        :columns="idTypes.map(cur => $t(cur.name))"
        showToolbar
        @confirm="confirmIdType"
      />
      <van-field
        class="my-field required"
        :value="idNo"
        :placeholder="$t('realName')"
        :error="idNoErr"
        :error-message="idNoErrMsg"
        @input="onInputIdNo($event)"
        @blur="validateIdNo($event.target.value)"
        autofocus
      />
    </div>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="onPerfect"
      :loading="perfectLoading"
    >{{ $t('commit') }}</van-button>
  </div>
</template>

<script>
import MyPicker from './MyPicker'
import { IDTYPE } from '@/constant'

export default {
  components: {
    MyPicker,
  },
  data () {
    return {
      realName: '',
      realNameErr: false,
      realNameErrMsg: '',
      idType: '',
      idNo: '',
      idNoErr: false,
      idNoErrMsg: '',
      perfectLoading: false,
      idTypes: IDTYPE,
    }
  },
  created () {
    this.redirectUrl = this.$route.query.redirect || '/index'
  },
  methods: {
    onPerfect () {
      if (this.userNameErr || this.verifyCodeErr ||
          !this.userName || !this.verifyCode) {
        this.userNameErr = this.userNameErr || !this.userName
        this.verifyCodeErr = this.verifyCodeErr || !this.verifyCode
      } else {
        this.perfectLoading = true
        const url = '/client/perfectinfo/'
        this.$fetch(url, {
          data: {
            username: this.userName,
            verifycode: this.verifyCode,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          // const bindInfo = Object.assign({}, resp.data)
          // this.$store.commit('userbind', bindInfo)
          this.perfectLoading = false
          this.$message({
            content: this.$t('perfectInfoSuccess'),
          })
          this.$router.push(this.redirectUrl)
        }).catch(err => {
          console.log(err)
          this.perfectLoading = false
          this.$message({
            content: this.$t('perfectInfoFail'),
          })
        })
      }
    },
    validateRealName (val) {
      console.log('validate', val)
      if (val) {
        this.realNameErr = false
        this.realNameErrMsg = ''
      } else {
        this.realNameErr = true
        this.realNameErrMsg = this.$t('realNameInvalid')
      }
    },
    confirmIdType (val, idx) {
      console.log(idx)
      this.idType = `${idx}`
    },
    onInputRealName (val) {
      console.log('onchangerealname')
      this.realName = val
      this.validateRealName(val)
    },
  },
}
</script>

<style lang="less">
#perfect-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 142px 24px 0;
  padding: 36px 38px 0;
  width: 100vw;
  height: 100vh;
  background: #fff;

  h3 {
    // line-height: 16px;
    text-align: center;
    font-size: 18px;
    margin: 0;
    margin-bottom: 30px;
  }

  .perfect-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;

    .required::before {
      content: '*';
      position: absolute;
      color: #B99F85;
      font-size: 18px;
      top: 12px;
      left: 3px;
    }

    .my-field {
      .van-field__control {
        color: #919191;
      }
    }

    .my-picker {
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
}
</style>
