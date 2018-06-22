<template>
  <div class="no-service">
    <my-svg
      :render="icon"
    />
    <div class="desc">
      <div class="title">{{ $t('hasNoService') }}</div>
      <router-link class="sub-title" to="/index#products">
        {{ $t('selectProduct') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import MySvg from './MySvg'

export default {
  components: {
    MySvg,
  },
  data () {
    return {
      icon: () => import('@/assets/svg/nonebill.svg'),
    }
  },
}
</script>

<style lang="less">
.no-service {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 160px;

  .my-svg {
    width: 90px;
    height: 50px;
  }

  .desc {
    margin-top: 45px;

    .title {
      font-size: 16px;
      color: #999999;
      text-align: center;
    }

    .sub-title {
      margin-top: 5px;
      display: block;
      text-align: center;
      font-size: 14px;
      color: #B99F85;
      text-decoration: underline;
    }
  }
}
</style>
