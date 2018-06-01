<template>
  <div class="enum-selector">
    <span
      class="enum-selector__item"
      v-for="(item, i) in items"
      :key="i"
      :class="{ active: selected[i] }"
    >
      <input
        type="checkbox"
        :checked="selectedItem[i]"
        @change="changeSelected($event.target.checked, i)"
      >
      {{ $t(item.name) }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Array,
      default: function () {
        return []
      },
    },
    items: {
      type: Array,
      default: function () {
        return []
      },
    },
    single: {
      type: Boolean,
      default: true,
    }
  },
  data () {
    return {
      selectedItem: [...this.selected],
    }
  },
  watch: {
    selected: {
      deep: true,
      handler: function (val, oldVal) {
        this.selectedItem = [...val]
      },
    }
  },
  methods: {
    changeSelected (b, i) {
      if (this.single) {
        this.selected.fill(false)
      }
      this.selected[i] = b
      this.$forceUpdate()
    },
  },
}
</script>

<style lang="less">
.enum-selector {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  // justify-content: space-between;

  .enum-selector__item {
    position: relative;
    text-align: center;
    font-size: 14px;
    color: #999999;
    line-height: 14px;
    padding-bottom: 5px;
    border-bottom: 1.3px solid transparent;

    &:not(:last-child) {
      margin-right: 30px;
    }

    &.active {
      border-bottom-color: #B99F85;
      color: #B99F85;
    }

    > input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
