<template>
  <div id="app">
    <div v-show="loading" class="loading-container">
      <van-loading
        class="global-loading"
        color="black"
      />
    </div>
    <div class="global-message">
      <van-popup
        v-model="message.show"
        :position="message.position"
        :overlay="false"
      >
        {{ message.content }}
      </van-popup>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState([
      'loading',
      'message',
    ]),
  },
  created () {
    // getUserInfo
    this.$getCookie('logged') === '0' && this.getUserInfo()
  },
  methods: {
    ...mapActions([
      'getUserInfo',
    ]),
  },
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

body {
  overflow: hidden;
}

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  font-family: PingFangSC-Regular;
  width: 100vw;
  height: 100vh;
  // background: #fff;
  overflow: hidden;
  background: #F5F5F5;

  .rhombus {
    position: relative;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 4px solid #000;

    &::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: -3px;
      top: 4px;
      width: 0;
      height: 0;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 4px solid #000;
    }
  }

  .loading-container {
    width: 100%;
    height: 100%;
    background: transparent;
    position: absolute;
    z-index: 1999;

    .global-loading {
      padding: 10px;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, .5);
      width: 50px;
      height: 50px;
      position: relative;
      top: calc(50% - 25px);
      left: calc(50% - 25px);
    }
  }

  .global-message {
    font-size: 12px;
    position: fixed;
    z-index: 1010;
    width: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    line-height: 36px;

    .van-popup {
      background: rgba(0, 0, 0, .7);
      min-height: 36px;
    }
  }

  .my-field {
    &.van-field {
      // width: 327px;
      width: 100%;
      // min-height: 44px;
      // border: 1px solid #000000;
      // margin-bottom: 24px;
      padding: 0;
      padding-bottom: 24px;

      &.required::before {
        content: '*';
        position: absolute;
        color: #B99F85;
        font-size: 1.125rem;
        top: 14px;
        left: 3px;
      }

      &::after {
        content: none;
      }

      .van-cell__value {
        position: initial;
        border: 1px solid #000000;
        height: 44px;
        width: 100%;

        input {
          padding: 0 15px;
          height: 100%;
        }
      }

      .van-field__control {
        font-size: 14px;
        color: #919191;
        letter-spacing: 0.58px;
        line-height: 22px;
      }

      &.has-btn {
        .van-cell__value {
          input {
            padding-right: 139px;
          }
        }
      }

      .van-field__button {
        position: absolute;
        padding-left: 18px;
        border: none;
        border-left: 1px solid #DFDFDF;
        top: 10px;
        right: 19px;
        width: 105px;
        height: 24px;

        .van-button--default {
          border: none;
          font-size: 14px;
          color: #B99F85;
          letter-spacing: 0;
          line-height: 22px;
          height: 22px;
          width: 100%;
        }
      }

      &.van-field--error {
        // border-color: #B99F85;
        padding-bottom: 54px;

        .van-cell__value {
          border-color: #B99F85;
        }

        .van-field__control {
          color: #B99F85;
          &::placeholder {
            color: #B99F85;
          }
        }

        .van-field__error-message {
          // position: fixed;
          // margin-top: 33px;
          // margin-left: -15px;
          font-size: 14px;
          color: #B99F85;
          // letter-spacing: 0.58px;
          line-height: 14px;
          top: 59px;
          position: absolute;
          left: 0;
        }
      }
    }
  }

  .my-button {
    &.van-button--bottom-action {
      // width: 327px;
      width: 100%;
      min-height: 44px;
      background-color: #000000;
      line-height: 44px;

      .van-button__text {
        font-size: 14px;
        color: #CCB8A3;
        text-align: center;
      }
    }
  }

  .my-search {
    width: 100%;
    height: auto;

    .van-search {
      // width: 339px;
      width: 100%;
      // min-height: 36px;
      height: 60px;
      background: transparent !important;
      padding: 12px 18px;
      // margin: 12px 0;

      .van-icon-search {
        color: #979797;
        font-size: 14px;
        left: calc(50% - 32px);
        padding-left: 1px;
        // top: 15px;
      }

      .van-field {
        padding: 8px 10px;
        height: 100%;
        border-radius: 8px;

        .van-field__control {
          font-size: 14px;
          // color: #999999;
          color: #000000;
          text-align: center;
          padding: 0 20px;
          height: 20px;
          line-height: 20px;
          -webkit-appearance: none;
        }
      }
    }

    &.focus {
      .van-search {
        background: #fff !important;
        z-index: 1000;

        // .van-icon-search {
        //   left: 28px;
        // }

        .van-field {
          background: #F2F2F2;

          .van-field__control {
            // text-align: left;
            // color: #000000;
            background: #F2F2F2;
          }
        }
      }
    }
  }

  .my-card {
    background: #fff;
    padding: 20px 18px 20px 116px;
    width: 100%;
    height: 120px;

    .van-card__thumb {
      top: 20px;
      left: 18px;
      width: 80px;
      height: 80px;
    }

    .van-card__content {
      .van-card__row {
        margin-bottom: 12px;

        .van-card__title {
          padding-top: 1px;
          font-size: 14px;
          color: #000000;
        }

        .van-card__desc {
          font-size: 12px;
          color: #999999;
        }

        .van-card__price {
          font-size: 14px;
          color: #6C6C6C;
          text-align: right;
        }

        .van-card__num {
          font-size: 14px;
          color: #6C6C6C;
          text-align: right;
        }
      }
    }
  }

  .my-cell {
    width: 100%;
    height: 60px;

    .van-cell__title {
      span {
        font-size: 14px;
        color: #000000;
        text-align: left;
      }

      .subtitle {
        margin-left: 10px;
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .my-switch {
    width: 52px;
    font-size: 28px !important;

    &.van-switch--on {
      background-color: #B99F85;
      .van-switch__node {
        transform: translateX(24px);
      }
    }
  }

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

  .my-checkbox {
    .van-checkbox__icon {
      border: 1px solid #CCCCCC;
      font-size: 17px;

      &.van-checkbox--checked {
        border-color: #CCB8A3;
        background-color: #CCB8A3;
      }
    }
  }

  .my-dialog {
    border-radius: 0;

    .van-dialog__header {
      padding-top: 42px;
      font-size: 16px;
    }

    .van-dialog__message--withtitle {
      font-size: 24px;
      text-align: center;
      color: #000;
      padding: 10px 0 28px;
    }

    .van-button__text {
      font-size: 16px;
      color: #B99F85;
    }

    .van-dialog__confirm {
      background: #000000;
      border-radius: 0;
    }
  }
}
</style>
