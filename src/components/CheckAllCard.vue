<template>
  <div class="checkall-card">
    <div class="checkall-card__header">
      <div class="checkall-card__header-title">
        <div class="rhombus" />
        <span>{{ title }}</span>
        <div class="rhombus" />
      </div>
      <div class="checkall-card__header-btn">
        <router-link :to="url">{{ $t('checkAll') }}</router-link>
      </div>
    </div>
    <div class="checkall-card__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    url: {
      type: String,
      default: '#',
    },
  },
}
</script>

<style lang="less">
.checkall-card {
  background: #fff;

  .checkall-card__header {
    display: flex;
    justify-content: space-between;
    padding: 24px 16px;

    .checkall-card__header-title {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 16px;
        color: #000000;
        text-align: center;
        line-height: 16px;
        padding: 0 5px;
      }
    }

    .checkall-card__header-btn {
      a {
        font-size: 14px;
        color: #CCB8A3;
        text-align: center;
        line-height: 14px;
      }
    }
  }
}
</style>
