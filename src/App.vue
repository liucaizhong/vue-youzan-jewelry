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
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState([
      'loading',
      'message',
    ]),
  },
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  font-family: PingFangSC-Regular;
  width: 100vw;
  height: 100vh;
  // background: #F5F5F5;

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
    z-index: 999;

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
      min-height: 44px;
      border: 1px solid #000000;
      margin-bottom: 24px;

      .van-field__control {
        font-size: 14px;
        color: #919191;
        letter-spacing: 0.58px;
        line-height: 14px;
      }

      .van-field__button {
        padding-left: 18px;
        border: none;
        border-left: 1px solid #DFDFDF;

        .van-button--default {
          border: none;
          font-size: 14px;
          color: #B99F85;
          letter-spacing: 0;
          line-height: 14px;
          height: 22px;
        }
      }

      &.van-field--error {
        border-color: #B99F85;
        margin-bottom: 54px;

        .van-field__control {
          color: #B99F85;
          &::placeholder {
            color: #B99F85;
          }
        }

        .van-field__error-message {
          position: fixed;
          margin-top: 33px;
          margin-left: -15px;
          font-size: 14px;
          color: #B99F85;
          letter-spacing: 0.58px;
          line-height: 14px;
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
      min-height: 36px;
      background: transparent !important;
      padding: 12px 18px;
      // margin: 12px 0;

      .van-icon-search {
        color: #979797;
        font-size: 14px;
        left: calc(50% - 32px);
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

    .mask {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.50);
      z-index: 999;
    }
  }
}
</style>
