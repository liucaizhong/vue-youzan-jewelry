<template>
  <div class="my-picker">
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
      <van-picker
        ref="myPicker"
        :show-toolbar="showToolbar"
        :title="title"
        :columns="showColumns"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
        :confirm-button-text="confirmBtnText"
        :cancel-button-text="cancelBtnText"
        :visible-item-count="visibleItemCount"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    showToolbar: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    title: String,
    columns: {
      type: Array,
      required: true,
    },
    confirmBtnText: String,
    cancelBtnText: String,
    visibleItemCount: {
      type: Number,
      default: 8,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errMsg: String,
  },
  data () {
    return {
      show: false,
      value: '',
      showColumns: [],
    }
  },
  watch: {
    columns: {
      // immediate: true,
      deep: true,
      handler: function (val, oldVal) {
        // console.log('columns', val)
        this.showColumns = [...val]
      }
    }
  },
  updated () {
    this.$refs.myPicker.setIndexes([this.defaultIndex])
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
    onChange (picker, val, idx) {
      // console.log('change val', val, idx)
      // this.value = val[0]
      this.$emit('change', picker, val, idx)
    },
    onConfirm (val, idx) {
      this.show = false
      this.value = val
      this.$emit('confirm', val, idx)
    },
    onCancel (val, idx) {
      this.show = false
      this.$refs.myPicker.setIndexes([this.defaultIndex])
      this.$emit('cancel', val, idx)
    },
  }
}
</script>

<style lang="less">
.my-picker {
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
