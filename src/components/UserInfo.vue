<template>
  <div id="user-info" class="scroll-fix">
    <van-cell-group class="user-info__meta">
      <van-cell
        class="my-field"
        :title="$t('phoneNo')"
        is-link
        to="/change-phone"
        :value="userInfo.phone"
      />
      <van-cell
        v-if="!isAuth"
        class="my-field"
        :title="$t('authentication')"
        is-link
        to="/authentication"
        :value="$t('authenticateImmediately')"
      />
      <van-cell v-if="isAuth" class="my-field" :title="$t('realName')" :value="userInfo.name" />
      <van-cell v-if="isAuth" class="my-field" :title="$t('myIdentity')" :value="myIdInfo" />
    </van-cell-group>
    <van-cell-group class="user-info__other">
      <van-cell
        class="my-field"
        :title="$t('email')"
        is-link
        to="/change-email"
        :value="userInfo.email ? $t('hasPerfected') : $t('toPerfect')"
      />
      <van-cell
        class="my-field"
        :title="$t('address')"
        is-link
        to="/change-address"
        :value="userInfo.address ? $t('hasPerfected') : $t('toPerfect')"
      />
      <van-cell
        class="my-field"
        :title="$t('birthday')"
        is-link
        to="/change-birthday"
        :value="userInfo.birthday ? $t('hasPerfected') : $t('toPerfect')"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { IDTYPE } from '@/constant'

export default {
  data () {
    return {
      isAuth: false,
      idTypes: IDTYPE,
    }
  },
  created () {
    this.isAuth = this.$getCookie('isAuthenticated') === '0'
  },
  mounted () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixInit
    )
  },
  beforeDestroy () {
    Array.prototype.forEach.call(
      document.getElementsByClassName('scroll-fix'), this.$scrollFixDestory
    )
  },
  computed: {
    myIdInfo: function () {
      const { idType, idNo } = this.userInfo
      const idTypeText = this.idTypes.find(cur => cur.key === idType)
      return (idTypeText ? this.$t(idTypeText.name) : '') + ' ' + idNo
    },
    ...mapState([
      'userInfo',
    ])
  },
}
</script>

<style lang="less">
#user-info {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  .my-field {
    .van-cell__title {
      span {
        color: #000;
      }
    }

    .van-cell__value {
      span {
        color: #999999;
      }
    }
  }

  .user-info__meta {
    margin-bottom: 10px;
  }
}
</style>
