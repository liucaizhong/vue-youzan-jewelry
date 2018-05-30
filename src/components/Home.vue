<template>
  <div id="home">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <section class="show-section">
        <my-search
          v-model="searchValue"
        />
        <div class="show-section__swiper">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(img, i) in swiperImgs" :key="i">
              <img v-lazy="img" :alt="`img${i}`" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="show-section__portal">
          <div class="show-section__portal-content">
            <router-link to="/book">
              <p class="title">{{ $t('book') }}</p>
              <p class="subtitle">{{ $t('bookDesc') }}</p>
            </router-link>
          </div>
          <div class="show-section__portal-content">
            <router-link to="/package">
              <p class="title">{{ $t('package') }}</p>
              <p class="subtitle">{{ $t('packageDesc') }}</p>
            </router-link>
          </div>
        </div>
      </section>
      <checkall-card
        :title="$t('productCategory')"
      />
      <div class="van-hairline--top" />
    </van-pull-refresh>
  </div>
</template>

<script>
import MySearch from './MySearch'
import CheckallCard from './CheckAllCard'

export default {
  components: {
    MySearch,
    CheckallCard,
  },
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
  width: 100vw;
  height: 100vh;

  .van-pull-refresh {
    height: 100%;

    .van-pull-refresh__track {
      height: 100%;

      .show-section {
        width: 100%;
        // min-height: 462px;
        padding-bottom: 34px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #F5F5F5;

        .show-section__swiper {
          width: 100%;
          padding: 13px 42px 26px;

          .van-swipe {
            width: 100%;
            height: 0;
            padding-top: 100%;
            position: relative;

            img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          }
        }

        .show-section__portal {
          width: 100%;
          padding: 0 42px;
          display: flex;
          flex-wrap: nowrap;
          position: relative;

          .b-l {
            content: '';
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;
            border-left: 3px solid #000000;
          }

          &::after {
            .b-l;
            left: auto;
            right: 42px;
          }

          .show-section__portal-content {
            flex: 1 1 50%;
            position: relative;

            &::before {
              .b-l;
            }

            p {
              margin: 0;

              &.title {
                font-weight: bold;
                font-size: 16px;
                color: #000000;
                text-align: center;
                line-height: 20px;
              }

              &.subtitle {
                font-size: 12px;
                color: #333333;
                text-align: center;
                line-height: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
