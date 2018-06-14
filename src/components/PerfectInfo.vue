<template>
  <div id="perfect-info">
    <h3>{{ $t('perfectInfo') }}</h3>
    <div class="perfect-info-container">
      <van-field
        class="my-field required"
        :value="realName"
        :placeholder="$t('realName')"
        :error="realNameErr"
        :error-message="$t('realNameInvalid')"
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
        :error="idTypeErr"
        :errMsg="$t('identityTypeInvalid')"
      />
      <van-field
        class="my-field required"
        :value="idNo"
        :placeholder="$t('identityNo')"
        :error="idNoErr"
        :error-message="$t('idNoInvalid')"
        @input="onInputIdNo($event)"
        @blur="validateIdNo($event.target.value)"
      />
      <van-field
        class="my-field"
        :value="email"
        :placeholder="$t('email')"
        :error="emailErr"
        :error-message="$t('emailInvalid')"
        @input="onInputEmail($event)"
      />
      <van-field
        class="my-field"
        :value="address"
        :placeholder="$t('address')"
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
      idType: '',
      idTypeErr: false,
      idNo: '',
      idNoErr: false,
      email: '',
      emailErr: false,
      address: '',
      perfectLoading: false,
      idTypes: IDTYPE,
    }
  },
  created () {
    this.redirectUrl = this.$route.query.redirect || '/index'
  },
  watch: {
    idType: function (val, oldVal) {
      if (!val) {
        this.idTypeErr = true
      } else {
        this.idTypeErr = false
      }
    },
  },
  methods: {
    onPerfect () {
      if (this.realNameErr || this.idTypeErr || this.idNoErr ||
          this.emailErr || !this.realName || !this.idType ||
          !this.idNo) {
        this.realNameErr = this.realNameErr || !this.realName
        this.idTypeErr = this.idTypeErr || !this.idType
        this.idNoErr = this.idNoErr || !this.idNo
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
      } else {
        this.realNameErr = true
      }
    },
    onInputRealName (val) {
      console.log('onchangerealname')
      this.realName = val
      this.validateRealName(val)
    },
    confirmIdType (val, idx) {
      console.log(idx)
      this.idType = `${idx}`
    },
    onInputIdNo (val) {
      this.idNo = val
      this.validateIdNo(val)
    },
    validateIdNo (val) {
      console.log('val', val)
      let pattern
      if (this.idType === '0') {
        pattern = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/g
      }
      if (pattern && !pattern.test(val)) {
        this.idNoErr = true
      } else {
        this.idNoErr = false
      }
    },
    onInputEmail (val) {
      this.email = val
      this.validateEmail(val)
    },
    validateEmail (val) {
      const pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g
      if (val && !pattern.test(val)) {
        this.emailErr = true
      } else {
        this.emailErr = false
      }
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
