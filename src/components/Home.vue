<template>
  <div id="home">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <section class="show-section">
        <van-search
          v-model="searchValue"
          :placeholder="$t('search')"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          :class="{ focus: searchFocused }"
        />
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(img, i) in swiperImgs" :key="i">
            <img v-lazy="img" :alt="`img${i}`" />
          </van-swipe-item>
        </van-swipe>
        <div class="show-section__portal">
          <div class="left">
            <router-link to="/book">
              <p>{{ $t('book') }}</p>
              <p>{{ $t('bookDesc') }}</p>
            </router-link>
          </div>
          <div class="right">
            <router-link to="/package">
              <p>{{ $t('package') }}</p>
              <p>{{ $t('packageDesc') }}</p>
            </router-link>
          </div>
        </div>
      </section>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      swiperImgs: [],
      refreshing: false,
      searchFocused: false,
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.refreshing = false
      }, 1000)
    },
  },
}
</script>

<style lang="less">
#home {
  width: 100%;
  height: 100vh;

  .van-pull-refresh {
    height: 100%;

    .van-pull-refresh__track {
      height: 100%;

      .show-section {
        width: 100%;
        height: 462px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #F5F5F5;

        .van-search {
          width: 339px;
          height: 36px;
          background: transparent !important;
          padding: 0;
          margin: 12px 0;

          .van-icon-search {
            color: #979797;
            font-size: 14px;
            left: calc(50% - 32.5px);
            top: 15px;
          }

          .van-field {
            padding: 8px 10px;
            height: 36px;
            border-radius: 8px;

            .van-field__control {
              font-size: 14px;
              color: #999999;
              text-align: center;
              padding: 0 20px;
              height: 20px;
            }
          }

          &.focus {
            .van-icon-search {
              left: 10px;
            }

            .van-field {
              .van-field__control {
                text-align: left;
              }
            }
          }
        }

        .van-swipe {
          width: 291px;
          height: 291px;
        }

        .show-section__portal {

        }
      }
    }
  }
}
</style>
