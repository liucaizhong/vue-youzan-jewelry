<template>
  <div class="my-area-picker">
    <div
      class="picker-btn"
      @click="togglePopup"
    >
      {{ valueText }}
    </div>
    <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
      <van-area
        :area-list="areaList"
        :value="defaultValue"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from '@/area'

export default {
  props: {
    defaultValue: String,
  },
  data () {
    return {
      show: false,
      value: [],
      areaList: AreaList,
    }
  },
  computed: {
    valueText: function () {
      return this.value.reduce((cum, cur) => {
        return cum + (cur.code !== '-1' ? cur.name + ' ' : '')
      }, '')
    },
  },
  methods: {
    togglePopup () {
      this.show = !this.show
    },
    onChange (picker, val, idx) {
      this.$emit('change', picker, val, idx)
    },
    onConfirm (val) {
      this.show = false
      this.value = val
      this.$emit('confirm', val)
    },
    onCancel () {
      this.show = false
      this.$emit('cancel')
    },
  },
}
</script>

<style lang="less">
.my-area-picker {
  .van-picker-column {
    font-size: 14px;
  }

  .picker-btn {
    // border: 1px solid #D6D6D6;
    font-size: 14px;
    color: #919191;
    letter-spacing: 0.58px;
    line-height: 14px;
    padding: 15px 12px;
    height: 100%;
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
