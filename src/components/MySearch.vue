<template>
  <div :class="['my-search', { focus: focused }]">
    <van-search
      :value="value"
      @input="handleInput($event)"
      :placeholder="placeholder || $t('search')"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter="handleEnter"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: String,
  },
  data () {
    return {
      focused: false,
    }
  },
  methods: {
    handleEnter (e) {
      this.$emit('on-enter', e.target.value)
    },
    handleFocus () {
      this.focused = true
      this.toggleIcon(this.value)
      this.$emit('on-focus', true)
    },
    handleBlur () {
      this.focused = false
      this.$emit('on-focus', false)
    },
    handleInput (val) {
      this.$emit('input', val)
      this.toggleIcon(val)
    },
    toggleIcon (val) {
      const searchIcon = document.querySelector('.my-search .van-icon.van-icon-search')
      // console.dir(searchIcon)
      if (val) {
        searchIcon.style.display = 'none'
      } else {
        searchIcon.style.display = 'inline-block'
      }
    },
  },
}
</script>
