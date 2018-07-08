<template>
  <div class="my-datetime-picker">
    <div :class="['picker-trigger', { error: error }]">
      <div
        class="picker-btn"
        @click="togglePopup"
      >
        {{ valueText }}
      </div>
      <div v-if="error && errMsg" class="picker-err">
        {{ errMsg }}
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
      <van-datetime-picker
        ref="myPicker"
        type="date"
        :value="initialValue"
        :title="title"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
        :confirm-button-text="confirmBtnText"
        :cancel-button-text="cancelBtnText"
        :visible-item-count="visibleItemCount"
        :min-date="minDate"
        :max-date="maxDate"
        :min-hour="minHour"
        :max-hour="maxHour"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: Date,
      default: function () {
        return new Date()
      },
    },
    placeholder: String,
    title: String,
    confirmBtnText: String,
    cancelBtnText: String,
    visibleItemCount: {
      type: Number,
      default: 8,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errMsg: String,
    minDate: Date,
    maxDate: Date,
    minHour: Number,
    maxHour: Number,
  },
  data () {
    return {
      show: false,
      value: '',
    }
  },
  created () {
    this.value = this.composeDate(this.initialValue)
  },
  computed: {
    valueText: function () {
      return this.value || this.placeholder
    },
  },
  methods: {
    togglePopup () {
      this.show = !this.show
    },
    onChange (picker) {
      // console.log('change val', val, idx)
      // this.value = val[0]
      this.$emit('change', picker)
    },
    onConfirm (val) {
      this.show = false
      this.value = this.composeDate(val)
      this.$emit('confirm', this.value)
    },
    onCancel () {
      this.show = false
      this.$emit('cancel')
    },
    composeDate (date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      return `${year}-${month}-${day}`
    },
  }
}
</script>

<style lang="less">
.my-datetime-picker {
  .van-picker-column {
    font-size: 14px;
  }

  &.required::before {
    content: '*';
    position: absolute;
    color: #B99F85;
    font-size: 18px;
    top: 14px;
    left: 3px;
  }

  .picker-trigger {
    .picker-btn {
      border: 1px solid #D6D6D6;
      font-size: 14px;
      color: #919191;
      letter-spacing: 0.58px;
      // line-height: 14px;
      padding: 15px 12px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 3px);
        right: 12px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #8A8A8A;
      }
    }

    &.error {
      .picker-btn {
        border-color: #B99F85 !important;
        color: #B99F85 !important;

        &::after {
          border-top-color: #B99F85 !important;
        }
      }
    }

    .picker-err {
      width: 100%;
      height: 30px;
      font-size: 14px;
      color: #B99F85;
      line-height: 44px;
    }
  }

  .van-picker__toolbar {
    &[class*=van-hairline]::after {
      content: none;
    }
  }

  .van-picker__cancel {
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 40px;
  }

  .van-picker__confirm {
    font-size: 14px;
    color: #B99F85;
    text-align: center;
    line-height: 40px;
  }
}
</style>
