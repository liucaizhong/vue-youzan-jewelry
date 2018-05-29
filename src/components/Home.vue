<template>
  <div id="home">
    <header class="header">
      <van-search
        v-model="searchValue"
        :placeholder="$t('search')"
      />
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
    }
  },
}
</script>
