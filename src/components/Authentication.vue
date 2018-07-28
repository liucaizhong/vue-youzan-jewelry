<template>
  <div id="authentication" class="scroll-fix" :style="{ height: height + 'px'}">
    <h3>{{ $t('authentication') }}</h3>
    <div class="authentication-container">
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
    </div>
    <van-radio-group
      v-model="selectPrivacy"
    >
      <my-radio
        :radioType="selectPrivacy"
        radioName="1"
        radioClass="my-radio-square"
      >
        <template slot="title">
          <div class="privacy" v-html="$t('privacyTerm', { path: '/privacy'})"></div>
        </template>
      </my-radio>
    </van-radio-group>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="onAuth"
      :loading="authLoading"
    >{{ $t('commit') }}</van-button>
  </div>
</template>

<script>
import MyPicker from './MyPicker'
import MyRadio from './MyRadio'
import { IDTYPE } from '@/constant'

export default {
  components: {
    MyPicker,
    MyRadio,
  },
  data () {
    return {
      realName: '',
      realNameErr: false,
      idType: '',
      idTypeErr: false,
      idNo: '',
      idNoErr: false,
      authLoading: false,
      idTypes: IDTYPE,
      selectPrivacy: '0',
      height: 0,
    }
  },
  watch: {
    idType: function (val, oldVal) {
      this.idTypeErr = !val
    },
  },
  mounted () {
    const app = document.getElementById('app')
    this.height = app.clientHeight
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
    onAuth () {
      if (this.realNameErr || this.idTypeErr || this.idNoErr ||
         !this.realName || !this.idType || !this.idNo) {
        this.realNameErr = this.realNameErr || !this.realName
        this.idTypeErr = this.idTypeErr || !this.idType
        this.idNoErr = this.idNoErr || !this.idNo
      } else {
        if (this.selectPrivacy === '0') {
          this.$message({
            content: this.$t('privacyNotSelected'),
          })
          return
        }
        this.authLoading = true
        const url = '/client/user/perfectinfo/'
        this.$fetch(url, {
          data: {
            realName: this.realName,
            idType: this.idType,
            idNo: this.idNo,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          // const bindInfo = Object.assign({}, resp.data)
          // this.$store.commit('userbind', bindInfo)
          this.authLoading = false
          this.$message({
            content: this.$t('authenticationSuccess'),
          })
          this.$router.replace('/user-info')
        }).catch(err => {
          console.log(err)
          this.authLoading = false
          this.$message({
            content: this.$t('authenticationFail'),
          })
        })
      }
    },
    validateRealName (val) {
      console.log('validate', val)
      this.realNameErr = !val
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
      this.idNoErr = pattern && !pattern.test(val)
    },
  },
}
</script>

<style lang="less">
#authentication {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 142px 24px 0;
  padding: 36px 38px 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  h3 {
    // line-height: 16px;
    text-align: center;
    font-size: 18px;
    margin: 0;
    margin-bottom: 30px;
  }

  .authentication-container {
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

  .privacy {
    font-size: 12px;
    color: #777777;

    a {
      color: #777777;
      text-decoration: underline;
    }
  }
}
</style>
