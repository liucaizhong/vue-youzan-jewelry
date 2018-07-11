<template>
  <div v-if="serviceData.length" id="completed-service">
    <van-list
      class="completed-service-list"
      v-model="loading"
      :finished="finished"
      @load="onLoadmore"
      :loading-text="$t('loadMore')"
      :immediate-check="false"
    >
      <my-service-card
        v-for="(info, i) in serviceData"
        :key="i"
        :tab="3"
        :serviceInfo="info"
      >
        <my-order-card
          :orders="info.order"
        />
      </my-service-card>
    </van-list>
  </div>
  <has-no-service v-else />
</template>

<script>
import HasNoService from './HasNoService'
import MyServiceCard from './MyServiceCard'
import MyOrderCard from './MyOrderCard'

export default {
  components: {
    HasNoService,
    MyServiceCard,
    MyOrderCard,
  },
  data () {
    return {
      api: '',
      loading: false,
      finished: false,
      offset: 0,
      limit: 15,
      serviceData: [],
    }
  },
  watch: {
    '$attrs.active': {
      immediate: true,
      handler: function (val, oldVal) {
        if (val) {
          !this.api && (this.api = this.$attrs.api)
          this.offset = 0
          this.getService(this.api, true)
        }
      }
    },
  },
  methods: {
    onLoadmore () {
      this.loading = true
      this.getService(this.api)
    },
    getService (url, loading = false) {
      const { offset, limit } = this.$data
      this.$fetch(url, {
        params: {
          offset: offset * limit,
          limit,
        },
      }, loading).then(resp => {
        console.log('resp', resp)
        ++this.offset
        const results = resp.data.results
        this.serviceData = this.serviceData.concat(results)
        this.loading = false
        if (results.length < this.limit) {
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
  }
}
</script>

<style lang="less">
#completed-service {
  width: 100%;
  // height: 100%;
  position: relative;
}
</style>
