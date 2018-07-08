<template>
  <div id="bank-info" class="scroll-fix">
    <h3>{{ $t('bankInfo') }}</h3>
    <div class="bank-info-container">
      <van-field
        class="my-field required"
        :value="realName"
        :placeholder="$t('realName')"
        :error="realNameErr"
        :error-message="$t('realNameInvalid')"
        @input="onInputField($event, 'realName')"
        @blur="validateField($event.target.value, 'realName')"
        autofocus
      />
      <van-field
        class="my-field required"
        :value="bankName"
        :placeholder="$t('bankName')"
        :error="bankNameErr"
        :error-message="$t('bankNameInvalid')"
        @input="onInputField($event, 'bankName')"
        @blur="validateField($event.target.value, 'bankName')"
      />
      <van-field
        class="my-field required"
        :value="bankCardNo"
        :placeholder="$t('bankCardNo')"
        :error="bankCardNoErr"
        :error-message="$t('bankCardNoInvalid')"
        @input="onInputField($event, 'bankCardNo')"
        @blur="validateField($event.target.value, 'bankCardNo')"
      />
      <van-field
        class="my-field required"
        :value="openingBankName"
        :placeholder="$t('openingBankName')"
        :error="openingBankNameErr"
        :error-message="$t('openingBankNameInvalid')"
        @input="onInputField($event, 'openingBankName')"
        @blur="validateField($event.target.value, 'openingBankName')"
      />
    </div>
    <p class="tips">{{ $t('withdrawBankTips') }}</p>
    <van-button
      class="my-button"
      type="default"
      bottom-action
      @click="commitWithdraw"
      :loading="commitWithdrawLoading"
    >{{ $t('commit') }}</van-button>
    <van-dialog
      class="my-dialog"
      v-model="showConfirmWithdraw"
      show-cancel-button
      :title="$t('confirmWithdraw')"
      :message="$t('withdrawTips')"
      :confirmButtonText="$t('confirm')"
      :cancelButtonText="$t('cancelPayBtnText')"
      @confirm="confirmWithdraw"
    >
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commitWithdrawLoading: false,
      realName: '',
      realNameErr: false,
      bankName: '',
      bankNameErr: false,
      bankCardNo: '',
      bankCardNoErr: false,
      openingBankName: '',
      openingBankNameErr: false,
      showConfirmWithdraw: false,
    }
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
    commitWithdraw () {
      if (this.realNameErr || this.bankNameErr || this.bankCardNoErr ||
          this.openingBankNameErr || !this.realName || !this.bankName ||
          !this.bankCardNo || !this.openingBankName) {
        this.realNameErr = this.realNameErr || !this.realName
        this.bankNameErr = this.bankNameErr || !this.bankName
        this.bankCardNoErr = this.bankCardNoErr || !this.bankCardNo
        this.openingBankNameErr = this.openingBankNameErr || !this.openingBankName
      } else {
        this.showConfirmWithdraw = true
      }
    },
    confirmWithdraw () {
      this.commitWithdrawLoading = true
      const { realName, bankName, bankCardNo, openingBankName } = this.$data
      const url = '/client/withdraw/'
      this.$fetch(url, {
        data: {
          realName,
          bankName,
          bankCardNo,
          openingBankName,
        },
        method: 'post',
      }).then(resp => {
        console.log(resp)
        // const bindInfo = Object.assign({}, resp.data)
        // this.$store.commit('userbind', bindInfo)
        this.commitWithdrawLoading = false
        this.$message({
          content: this.$t('withdrawSuccess'),
        })
        this.$router.push('/my-wallet')
      }).catch(err => {
        console.log(err)
        this.commitWithdrawLoading = false
        this.$message({
          content: this.$t('withdrawFail'),
        })
      })
    },
    onInputField (val, field) {
      this[field] = val
      this.validateField(val, field)
    },
    validateField (val, field) {
      this[`${field}Err`] = !val
    },
  },
}
</script>

<style lang="less">
#bank-info {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 46px 38px 0;
  background: #fff;

  h3 {
    font-size: 18px;
    text-align: center;
    margin-bottom: 30px;
  }

  .tips {
    font-size: 12px;
    color: #777777;
    margin: 0;
    margin-bottom: 42px;
  }
}
</style>
