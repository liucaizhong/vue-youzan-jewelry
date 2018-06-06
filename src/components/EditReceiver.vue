<template>
  <div class="edit-receiver">
    <van-radio-group
      class="mode-group"
      v-model="form.gender"
    >
      <my-radio
        :radioType="form.gender"
        radioName="0"
        radioClass="my-radio-circle"
      >
        <template slot="title">{{ $t('male') }}</template>
      </my-radio>
      <my-radio
        :radioType="form.gender"
        radioName="1"
        radioClass="my-radio-circle"
      >
        <template slot="title">{{ $t('female') }}</template>
      </my-radio>
    </van-radio-group>
    <div class="edit-receiver__name">
      <div class="name-part">
        <label class="required">{{ $t('lastName') }}</label>
        <van-field
          v-model="form.lastName"
        />
      </div>
      <div class="name-part">
        <label class="required">{{ $t('firstName') }}</label>
        <van-field
          v-model="form.firstName"
        />
      </div>
    </div>
    <div class="edit-receiver__phone">
      <label class="required">{{ $t('cellPhone') }}</label>
      <van-field
        v-model="form.phone"
      />
    </div>
    <div class="edit-receiver__area">
      <label class="required">{{ $t('area') }}</label>
      <!-- <van-field
        v-model="form.area"
      /> -->
      <my-area-picker
        class="edit-receiver__area-picker"
        :defaultValue="defaultAreaCode"
        @confirm="confirmArea"
      />
    </div>
    <div class="edit-receiver__address">
      <label class="required">{{ $t('address') }}</label>
      <van-field
        v-model="form.address"
      />
    </div>
    <div class="edit-receiver__remark">
      <label>{{ $t('addRemark') }}</label>
      <van-field
        v-model="form.remark"
        type="textarea"
      />
    </div>
  </div>
</template>

<script>
import MyRadio from './MyRadio'
import MyAreaPicker from './MyAreaPicker'

export default {
  components: {
    MyRadio,
    MyAreaPicker,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      defaultAreaCode: '',
    }
  },
  methods: {
    confirmArea (val) {
      console.log('area', val)
      this.form.area = val
      for (let i = val.length - 1; i >= 0; --i) {
        if (val[i].code !== '-1') {
          this.defaultAreaCode = val[i].code
          break
        }
      }
    },
  },
}
</script>

<style lang="less">
.edit-receiver {
  > div:not(:last-of-type) {
    margin-bottom: 20px;
  }

  > div.mode-group {
    margin-bottom: 0;
  }

  label {
    font-size: 14px;
    color: #000000;
    text-align: left;
    line-height: 16px;
    padding-right: 10px;
    position: relative;

    &.required {
      &::before {
        content: '*';
        position: absolute;
        right: 0;
        top: 4px;
        font-size: 0.875rem;
        color: #f44;
      }
    }
  }

  .van-field {
    margin-top: 15px;
    width: 100%;
    height: 44px;
    border: 1px solid #333333;
  }

  .mode-group {
    display: flex;
    justify-content: space-between;

    .my-radio {
      flex: 1;

      span {
        font-size: 14px;
        color: #000000;
        line-height: 20px;
      }
    }
  }

  .edit-receiver__name {
    display: flex;

    .name-part {
      flex: 1;

      &:not(:last-of-type) {
        padding-right: 10px;
      }
    }
  }

  .edit-receiver__area {
    .edit-receiver__area-picker {
      margin-top: 15px;
      width: 100%;
      height: 44px;
      border: 1px solid #333333;
    }
  }

  .edit-receiver__remark {
    .van-field {
      height: 100px;

      textarea {
        height: 100%;
      }
    }
  }
}
</style>
