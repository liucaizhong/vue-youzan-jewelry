<template>
  <div id="loadComplete">
    <div class="rhombus" />
    <span>{{ $t('loadComplete') }}</span>
    <div class="rhombus" />
  </div>
</template>

<style lang="less">
#loadComplete {
  display: inline-flex;
  align-items: center;

  .rhombus {
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    border-bottom: 3px solid #CCCCCC;

    &::before {
      left: -2px;
      top: 3px;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
      border-top: 3px solid #CCCCCC;
    }
  }

  span {
    font-size: 12px;
    color: #CCCCCC;
    text-align: center;
    padding: 0 5px;
  }
}
</style>
