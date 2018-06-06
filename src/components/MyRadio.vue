<template>
  <van-radio
    :name="radioName"
    :class="['my-radio', radioClass, { checked: type === radioName }]"
  >
    <slot name="title"></slot>
    <slot name="content"></slot>
  </van-radio>
</template>

<script>
export default {
  props: {
    radioType: String,
    radioName: String,
    radioClass: {
      type: String,
      default: 'my-radio-square',
    },
  },
  data () {
    return {
      type: '',
    }
  },
  created () {
    this.type = this.radioType
  },
  watch: {
    radioType: function (val, oldVal) {
      this.type = val
    },
  },
}
</script>

<style lang="less">
.my-radio {
  display: flex;
  margin-bottom: 20px;

  .van-radio__input {
    width: 20px;
    height: 20px;
    border: 1px solid #B5B5B5;

    .van-icon {
      width: 10px;
      height: 10px;
      margin: 4px;

      &::before {
        content: none;
      }

      &.van-icon-checked {
        color: #000000;
        background: #000000;
      }
    }
  }

  .van-radio__label {
    width: 100%;
  }

  &.checked {
    > .van-radio__input {
      border: 1px solid #000000;
    }
  }
}

.my-radio-square {

  .van-radio__label {
    font-size: 16px;
    color: #000000;
    text-align: left;
    line-height: 20px;
  }
}

.my-radio-circle {
  .van-radio__input {
    border-radius: 50%;

    .van-icon {
      border-radius: 50%;
    }
  }

  .van-radio__label {
    font-size: 14px;
    color: #000000;
    text-align: left;
    line-height: 20px;
  }
}
</style>
