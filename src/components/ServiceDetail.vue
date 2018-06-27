<template>
  <div id="service-detail" class="scroll-fix">
    <div
      class="service-detail--timer"
      v-if="serviceInfo.serviceType !== '2'
        && serviceInfo.serviceStatus === '3'
        && servicePeriod"
    >
      <div class="content" :style="{ color: servicePeriod.color }">
        <div class="desc">{{ servicePeriod.desc }}</div>
        <div class="count">{{ servicePeriod.gap }}</div>
        <div class="day">{{ $t('day') }}</div>
      </div>
    </div>
    <div class="service-detail--content">
      <div class="row">
        {{ $t('serviceType') + ': ' + $t(`serviceType${serviceInfo.serviceType}`) }}
      </div>
      <div class="row">
        {{ $t('serviceNo') + ': ' + serviceInfo.serviceNo }}
      </div>
      <div class="row" v-if="serviceInfo.createDate">
        {{ $t('createDatetime') + ': ' + serviceInfo.createDate }}
      </div>
      <div class="row" v-if="serviceInfo.finishDate">
        {{ $t('endDatetime') + ': ' + serviceInfo.finishDate }}
      </div>
      <div class="row"  v-if="serviceInfo.rentStartDate">
        {{ $t('rentStartDate') + ': ' + serviceInfo.rentStartDate }}
      </div>
      <div class="row" v-if="serviceInfo.rentDueDate">
        {{ $t('rentDueDate') + ': ' + serviceInfo.rentDueDate }}
      </div>
      <div class="row" v-if="serviceInfo.rentPeriod">
        {{ $t('rentPeriodTitle') + ': ' + serviceInfo.rentPeriod + $t('day')}}
      </div>
      <div class="row" v-if="serviceInfo.packageTitle">
        {{ $t('packageTitle') + ': ' + serviceInfo.packageTitle }}
      </div>
      <div class="row" v-if="+serviceInfo.packagePrice">
        {{ $t('packagePrice') + ': ' + $n(serviceInfo.packagePrice, 'currency') }}
      </div>
      <div
        class="row"
        v-if="serviceInfo.serviceType === '2' && +serviceInfo.current_payamount"
      >
        {{ $t('amount') + ': ' + $n(serviceInfo.current_payamount, 'currency') }}
      </div>
      <div class="row" v-if="+serviceInfo.initialRent">
        {{ $t('rentPrice') + ': ' + $n(serviceInfo.initialRent, 'currency') }}
      </div>
      <div class="row" v-if="+serviceInfo.initialDeposit">
        {{ $t('initialDeposit') + ': ' + $n(serviceInfo.initialDeposit, 'currency') }}
      </div>
      <div class="row" v-if="+serviceInfo.residualDeposit">
        {{ $t('residualDeposit') + ': ' + $n(serviceInfo.residualDeposit, 'currency') }}
      </div>
      <div class="row">
        {{ $t('creditStatus') + ': ' + $t(`creditStatus${serviceInfo.creditStatus}`) }}
      </div>
      <div class="tip" v-if="serviceInfo.creditStatus === '1'">
        {{ $t('overtimeTip' )}}
      </div>
    </div>
  </div>
</template>

<script>
// 套餐名称，
// 套餐时间，租金，初始押金，剩余押金，信用状态
export default {
  data () {
    return {
      type: '0',
      // timeShow: {
      //   color: '',
      //   desc: '',
      // },
      serviceInfo: {},
    }
  },
  created () {
    this.serviceInfo.serviceNo = this.$route.params.id
    this.type = this.$route.query.type || '0'

    const url = this.type === '0' ? '/client/RentalService/'
      : (this.type === '1' ? '/client/ComboService/' : '')

    this.$fetch(url, {
      params: {
        serviceNo: this.serviceInfo.serviceNo,
      },
    }, true).then(resp => {
      console.log('resp', resp)
      const serviceInfo = resp.data.results[0]
      this.serviceInfo = {
        ...serviceInfo,
      }
    }).catch(err => {
      console.log(err)
    })
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
  computed: {
    servicePeriod: function () {
      const { rentStartDate, rentDueDate, rentPeriod } = this.serviceInfo
      if (rentDueDate && rentStartDate) {
        const range = (new Date(...rentDueDate.split`-`)).valueOf() -
                (new Date(...rentStartDate.split`-`)).valueOf()
        const gap = rentPeriod - (range / (24 * 60 * 60 * 1000) + 1)
        return {
          color: gap < 0 ? '#B99F85' : '#D0021B',
          gap: Math.abs(gap),
          desc: gap < 0 ? this.$t('rentRemainingDays') : this.$t('rentOvertime'),
        }
      } else {
        return null
      }
    },
  },
}
</script>

<style lang="less">
#service-detail {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .service-detail--timer {
    width: 100%;
    height: 188px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .content {
      width: 140px;
      height: 140px;
      border: 1px solid;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 28px 0;

      .desc {
        font-size: 14px;
      }

      .count {
        font-size: 50px;
        line-height: 50px;
        font-weight: 400;
        flex: 1;
      }

      .day {
        font-size: 18px;
      }
    }
  }

  .service-detail--content {
    font-size: 14px;
    background: #fff;
    padding: 30px 18px;

    .row {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .tip {
      padding-top: 10px;
      font-size: 12px;
      color: #666666;
    }
  }
}
</style>
