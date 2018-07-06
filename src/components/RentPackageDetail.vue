<template>
  <div class="rent-package-detail">
    <keep-alive>
      <van-radio-group
        v-model="packageType"
      >
        <my-radio
          :radioType="packageType"
          :radioName="'0'"
          v-if="myPackages && myPackages.length"
        >
          <template slot="title">{{ $t('useCurrentPackage') }}</template>
          <div v-show="packageType === '0'" slot="content" class="radio0-content">
            <van-radio-group
              class="sub-radio-group"
              v-model="myPackageSelect"
            >
              <van-list
                class="my-package-list"
                v-model="myPackageCond.loading"
                :finished="myPackageCond.finished"
                @load="onLoadMyPackageCond"
                :loading-text="$t('loadMore')"
                :immediate-check="false"
              >
                <my-radio
                  v-for="(item, i) in myPackages"
                  :key="i"
                  :radioType="myPackageSelect"
                  :radioName="`${i}`"
                  radioClass="my-radio-circle"
                >
                  <template slot="title">
                    <div class="title">
                      <div class="desc">
                        {{ composeMyPackageTitle(item) }}
                      </div>
                      <router-link :to="`/service-detail/${item.serviceNo}/?type=1`">
                        {{ $t('detail') }}
                      </router-link>
                    </div>
                  </template>
                </my-radio>
              </van-list>
            </van-radio-group>
            <!-- <div v-else class="no-package">{{ $t('hasNoPackage') }}</div> -->
          </div>
        </my-radio>
        <my-radio
          :radioType="packageType"
          :radioName="'1'"
          v-if="newPackages && newPackages.length"
        >
          <template slot="title">{{ $t('buyNewPackage') }}</template>
          <div v-show="packageType === '1'" slot="content" class="radio1-content">
            <van-radio-group
              class="sub-radio-group"
              v-model="newPackageSelect"
            >
              <van-list
                class="new-package-list"
                v-model="newPackageCond.loading"
                :finished="newPackageCond.finished"
                @load="onLoadNewPackageCond"
                :loading-text="$t('loadMore')"
                :immediate-check="false"
              >
                <my-radio
                  v-for="(item, i) in newPackages"
                  :key="i"
                  :radioType="newPackageSelect"
                  :radioName="`${i}`"
                  radioClass="my-radio-circle"
                >
                  <template slot="title">
                    <div class="title">
                      <div class="desc">
                        {{ composeNewPackageTitle(item) }}
                      </div>
                      <router-link to="/package-list">
                        {{ $t('detail') }}
                      </router-link>
                    </div>
                  </template>
                </my-radio>
              </van-list>
            </van-radio-group>
            <!-- <div v-else class="no-package">{{ $t('hasNoNewPackage') }}</div> -->
            <!-- <p class="deposit">
              {{ $t('package') + $t('deposit', [$n(productDetail.deposit, 'currency')]) }}
            </p> -->
          </div>
        </my-radio>
      </van-radio-group>
    </keep-alive>
    <footer class="rent-detail__footer">
      <div class="show-total van-ellipsis">
        {{ showTotalText }}
      </div>
      <van-button
        class="my-button pay-btn"
        type="default"
        bottom-action
        :loading="paymentLoading"
        @click="onPayment"
      >{{ rentPackagePayment }}</van-button>
    </footer>
    <van-dialog
      class="my-dialog"
      v-model="showConfirmChangeProduct"
      show-cancel-button
      :title="$t('changeProductTip')"
      :message="productTitle"
      :confirmButtonText="$t('confirmChange')"
      :cancelButtonText="$t('cancelPayBtnText')"
      @confirm="confirmChangeProduct"
    >
    </van-dialog>
  </div>
</template>

<script>
import MyRadio from './MyRadio'

export default {
  components: {
    MyRadio,
  },
  props: {
    product: Object,
  },
  data () {
    return {
      rentDetail: {
        totalAmount: 0,
      },
      packageType: '0', // 0: use current, 1: buy new
      myPackageSelect: '0',
      newPackageSelect: '0',
      productDetail: {},
      myPackages: [],
      myPackageCond: {
        limit: 15,
        offset: 0,
        loading: false,
        finished: false,
      },
      newPackages: [],
      newPackageCond: {
        limit: 15,
        offset: 0,
        loading: false,
        finished: false,
      },
      showConfirmChangeProduct: false,
      paymentLoading: false,
    }
  },
  watch: {
    product: {
      deep: true,
      immediate: true,
      handler: function (val, oldVal) {
        this.productDetail = { ...val }
        // get relevant package
        Promise.all([this.fetchNewPackages(true), this.fetchMyPackages(true)])
          .then(([data0, data1]) => {
            this.getNewPackagesSuccess(data0)
            this.getMyPackagesSuccess(data1)
            if (data0.results && data0.results.length) {
              this.packageType = '1'
            }
            if (data1.results && data1.results.length) {
              this.packageType = '0'
            }
          }).catch(([err0, err1]) => {
            this.getNewPackagesError(err0)
            this.getMyPackagesError(err1)
          })
      },
    },
    packageType: function (val, oldVal) {
      const { newPackageSelect } = this.$data
      if (val === '0') {
        this.rentDetail.totalAmount = 0
      } else {
        const { deposit, price } = this.newPackages[newPackageSelect]
        this.rentDetail.totalAmount = parseFloat(price) + parseFloat(deposit)
      }
    },
    newPackageSelect: function (val, oldVal) {
      const { deposit, price } = this.newPackages[val]
      this.rentDetail.totalAmount = parseFloat(price) + parseFloat(deposit)
    },
  },
  computed: {
    showTotalText: function () {
      return this.$t('totalPackage', [this.$n(this.rentDetail.totalAmount, 'currency')])
    },
    rentPackagePayment: function () {
      return this.packageType === '0' ? this.$t('change') : this.$t('payment')
    },
    productTitle: function () {
      return (this.productDetail.series ? this.productDetail.series + '-' : '') +
        this.productDetail.title
    },
  },
  methods: {
    composeNewPackageTitle (info) {
      const { title, price, deposit } = info
      const total = parseFloat(price) + parseFloat(deposit)
      return title + ' ' + this.$n(total, 'currency')
    },
    composeMyPackageTitle (info) {
      const { serviceNo } = info
      return this.$t('serviceType1') + ': ' + serviceNo
    },
    onPayment () {
      console.log('onPayment')
      if (this.packageType === '1') {
        this.paymentLoading = true
        const url = '/client/ComboService/'
        this.$fetch(url, {
          data: {
            reservedProductid: this.productDetail.productid,
            packageNo: this.newPackages[this.newPackageSelect].packageNo,
          },
          method: 'post',
        }).then(resp => {
          console.log(resp)
          this.paymentLoading = false
          this.$router.replace(`/payment/${resp.data.serviceNo}?type=1`)
        }).catch(err => {
          console.log(err)
          this.paymentLoading = false
          this.$message({
            content: this.$t('paymentFail'),
          })
        })
      } else {
        this.showConfirmChangeProduct = true
      }
    },
    confirmChangeProduct () {
      // change renting product
      this.paymentLoading = true
      const url = '/client/ComboService/swap/'
      this.$fetch(url, {
        data: {
          productid: this.productDetail.productid,
          serviceNo: this.myPackages[this.myPackageSelect].serviceNo,
        },
        method: 'post',
      }).then(resp => {
        console.log(resp)
        this.paymentLoading = false
        this.$router.replace('/payment-success/?type=1')
      }).catch(err => {
        console.log(err)
        this.paymentLoading = false
        this.$message({
          content: this.$t('paymentFail'),
        })
      })
    },
    onLoadNewPackageCond () {
      this.newPackageCond.loading = true
      this.getNewPackages()
    },
    async fetchNewPackages (loading = false) {
      const url = '/client/package/ListInfo/'
      const { limit, offset } = this.newPackageCond
      try {
        const { data } = await this.$fetch(url, {
          params: {
            offset: offset * limit,
            limit,
            productid: this.productDetail.productid,
          },
        }, loading)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    getNewPackages () {
      this.fetchNewPackages().then(data => {
        this.getNewPackagesSuccess(data)
      }).catch(err => {
        this.getNewPackagesError(err)
      })
    },
    getNewPackagesSuccess (data) {
      console.log('data', data)
      const results = data.results
      if (results && results.length) {
        ++this.newPackageCond.offset
        this.newPackages = [...results]
        this.newPackageCond.loading = false
        if (results.length < this.newPackageCond.limit) {
          this.newPackageCond.finished = true
        }
      }
    },
    getNewPackagesError (err) {
      console.log(err)
      this.newPackageCond.loading = false
    },
    onLoadMyPackageCond () {
      this.myPackageCond.loading = true
      this.getMyPackages()
    },
    async fetchMyPackages (loading = false) {
      const url = '/client/package/mine'
      const { limit, offset } = this.newPackageCond
      try {
        const { data } = await this.$fetch(url, {
          params: {
            offset: offset * limit,
            limit,
            productid: this.productDetail.productid,
          },
        }, loading)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    getMyPackages () {
      this.fetchMyPackages().then(data => {
        this.getMyPackagesSuccess(data)
      }).catch(err => {
        this.getMyPackagesError(err)
      })
    },
    getMyPackagesSuccess (data) {
      console.log('data', data)
      const results = data.results
      if (results && results.length) {
        ++this.myPackageCond.offset
        this.myPackages = [...results]
        this.myPackageCond.loading = false
        if (results.length < this.myPackageCond.limit) {
          this.myPackageCond.finished = true
        }
      }
    },
    getMyPackagesError (err) {
      console.log(err)
      this.myPackageCond.loading = false
    },
  },
}
</script>

<style lang="less">
.rent-package-detail {
  .sub-radio-group {
    margin-top: 25px;
  }

  .deposit {
    margin: 0;
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

  .title {
    display: flex;
    justify-content: space-between;

    .desc {
      font-size: 14px;
    }

    a {
      font-size: 14px;
      color: #CCB8A3;
    }
  }

  .no-package {
    font-size: 14px;
    color: #AFAFAF;
    margin-top: 20px;
  }

  .my-package-list, .new-package-list {
    max-height: 300px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
