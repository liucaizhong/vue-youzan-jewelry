<template>
  <div id="category-tab">
    <router-link :to="url">
      <my-svg
        :render="icon"
      />
      <div class="title">
        <p>{{ $t(name) }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import MySvg from './MySvg'

export default {
  props: {
    url: String,
    name: String,
    icon: Function,
  },
  components: {
    MySvg,
  },
}
</script>

<style lang="less">
#category-tab {
  .b-l {
    content: '';
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    border-left: 2px solid #000000;
  }

  width: 80px;
  height: 80px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .my-svg {
      width: 70%;
      height: 70%;
    }

    .title {
      position: relative;
      width: 60px;
      height: 14px;

      &::before {
        .b-l;
      }

      &::after {
        .b-l;
        left: unset;
        right: 0;
      }

      p {
        margin: 0;
        font-size: 12px;
        color: #000000;
        text-align: center;
        // line-height: 12px;
      }
    }
  }
}
</style>
