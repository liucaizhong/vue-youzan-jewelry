<template>
  <router-link class="my-badge" :to="url">
    <div v-if="info" class="my-badge__info">{{ info }}</div>
    <slot class="my-badge__icon" name="icon"></slot>
    <div class="my-badge__title">{{ title }}</div>
  </router-link>
</template>

<script>
export default {
  props: {
    info: Number,
    // dot: {
    //   type: Boolean,
    //   default: false,
    // },
    icon: Function,
    title: String,
    url: String,
  }
}
</script>

<style lang="less">
.my-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 80px;
  height: 80px;
  justify-content: flex-end;
  padding: 26px 0 15px;

  div {
    font-size: 12px;
    color: #B99F85;
    line-height: 12px;
  }

  .my-badge__info {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #B99F85;
    color: #fff;
    text-align: center;
    line-height: 18px;
    top: 10px;
    right: 18px;
  }

  .my-badge__title {
    margin-top: 5px;
  }
}
</style>
