<template>
  <div id="app">
    <div v-show="loading" class="loading-container">
      <van-loading
        class="global-loading"
        color="black"
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['loading']),
  }
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;

  .loading-container {
    width: 100%;
    height: 100%;
    background: transparent;
    position: absolute;
    z-index: 999;
  }

  .global-loading {
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .5);
    width: 50px;
    height: 50px;
    position: relative;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
  }
}
</style>
