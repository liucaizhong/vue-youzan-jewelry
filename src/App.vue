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
  width: 100%;
  height: 100vh;

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
      height: 36px;
    }
  }

  .custom-field {
    &.van-field {
      width: 327px;
      height: 44px;
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

  .custom-button {
    &.van-button--bottom-action {
      width: 327px;
      height: 44px;
      background-color: #000000;
      line-height: 44px;

      .van-button__text {
        font-size: 14px;
        color: #CCB8A3;
        text-align: center;
      }
    }
  }
}
</style>
