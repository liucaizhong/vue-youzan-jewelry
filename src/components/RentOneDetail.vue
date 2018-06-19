<template>
  <div class="rent-one-service">
    <my-picker
      :confirmBtnText="$t('complete')"
      :cancelBtnText="$t('close')"
      :placeholder="$t('chooseRentPeriod')"
      :columns="rentAmountColumns"
      :defaultIndex="defaultIndex"
      showToolbar
      @confirm="confirmRentPeriod"
      @change="changeRentPeriod"
      :error="rentPeriodErr"
      :errMsg="$t('rentPeriodInvalid')"
    />
    <p class="deposit">{{ $t('deposit', [$n(productDetail.deposit, 'currency')]) }}</p>
    <footer class="rent-detail__footer">
      <div class="show-total van-ellipsis">
        {{ showTotalText }}
      </div>
      <van-button
        class="my-button pay-btn"
        type="default"
        bottom-action
        @click="onPayment"
        :loading="paymentLoading"
      >{{ $t('payment') }}</van-button>
    </footer>
  </div>
</template>

<script>
import MyPicker from './MyPicker'

export default {
  components: {
    MyPicker,
  },
  props: {
    product: Object,
  },
  data () {
    return {
      rentDetail: {
        rentPeriod: '',
        totalAmount: '0',
      },
      rentAmountColumns: [],
      countPerTurn: 100,
      defaultIndex: 0,
      paymentLoading: false,
      rentPeriodErr: false,
      productDetail: {},
    }
  },
  computed: {
    showTotalText: function () {
      return this.$t('totalRent', [this.rentDetail.rentPeriod, this.$n(this.rentDetail.totalAmount, 'currency')])
    },
  },
  watch: {
    'rentDetail.rentPeriod': function (val, oldVal) {
      this.rentPeriodErr = !val
    },
    product: {
      deep: true,
      handler: function (val, oldVal) {
        // console.log('product', val)
        this.productDetail = { ...val }
        this.rentAmountColumns = this.rentAmountColumns.concat(this.mockrentAmountColumns())
      },
    }
  },
  activated () {
    console.log('activated')
    // this.rentAmountColumns = this.rentAmountColumns.concat(this.mockrentAmountColumns())
    // const match = this.getPeriodRentFromPicker(this.rentAmountColumns[this.curPickerIndex])
    // this.rentDetail.rentPeriod = match[0]
    // this.rentDetail.totalAmount = `${+this.productDetail.deposit + +match[1]}`
  },
  methods: {
    onPayment () {
      if (this.rentPeriodErr || !this.rentDetail.rentPeriod) {
        // this.$message({
        //   content: this.$t('rentPeriodInvalid'),
        // })
        this.rentPeriodErr = this.rentPeriodErr ||
          !this.rentDetail.rentPeriod
      } else {
        this.paymentLoading = true
        const url = '/client/RentalService/'
        this.$fetch(url, {
          data: {
            reservedProductid: this.productDetail.productid,
            rentPeriod: this.rentDetail.rentPeriod,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          this.paymentLoading = false
          this.$router.replace(`/payment/${resp.data.serviceNo}?type=0`)
        }).catch(err => {
          console.log(err)
          this.paymentLoading = false
          this.$message({
            content: this.$t('paymentFail'),
          })
        })
      }
    },
    mockrentAmountColumns () {
      const count = this.rentAmountColumns.length
      const firstValue = (count &&
        +this.getPeriodRentFromPicker(this.rentAmountColumns[count - 1])[0]) ||
        +this.productDetail.rentcycle
      console.log('rentcycle', firstValue)
      console.log('rentcycle2', this.productDetail.rentcycle)
      const resArr = []
      for (let i = 0; i < this.countPerTurn;) {
        ++i
        resArr.push(this.$t('rentPickerValue', [
          firstValue + i,
          this.$n((firstValue + i) * (+this.productDetail.rent), 'currency'),
        ]))
      }
      return resArr
    },
    getPeriodRentFromPicker (val) {
      const match = val.match(/(\d+)/g)
      // console.log('match', match)
      return match
    },
    confirmRentPeriod (val, idx) {
      // console.log('confirmRentPeriod', val, idx)
      const match = this.getPeriodRentFromPicker(val)
      this.rentDetail.rentPeriod = match[0]
      this.rentDetail.totalAmount = `${+this.productDetail.deposit + +match[1]}`
      this.defaultIndex = idx
    },
    changeRentPeriod (picker, val, idx) {
      // console.log('rentonedetail change val', val, idx)
      const count = this.rentAmountColumns.length
      if (idx === count - 1) {
        this.rentAmountColumns = this.rentAmountColumns.concat(this.mockrentAmountColumns())
        this.defaultIndex = idx
      }
    },
  },
}
</script>

<style lang="less">
.rent-one-service {
  .deposit {
    margin-top: 15px;
    font-size: 12px;
    color: #999999;
    line-height: 14px;
  }
  .rent-detail__footer {
    width: 100%;
    height: 50px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;

    .show-total {
      flex: 1;
      background: #FFFFFF;
      font-size: 16px;
      color: #B99F85;
      border-top: .5px solid #e5e5e5;
      text-align: left;
      line-height: 50px;
      padding-left: 18px;
    }

    .pay-btn {
      max-width: 120px;
    }
  }
}
</style>
