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
          class="my-field"
          :value="form.lastName"
          :error="error.lastName"
          :error-message="$t('lastNameInvalid')"
          @input="handleInput('lastName', $event)"
          @blur="validationInput('lastName', $event.target.value)"
        />
      </div>
      <div class="name-part">
        <label class="required">{{ $t('firstName') }}</label>
        <van-field
          class="my-field"
          v-model="form.firstName"
          :error="error.firstName"
          :error-message="$t('firstNameInvalid')"
          @input="handleInput('firstName', $event)"
          @blur="validationInput('firstName', $event.target.value)"
        />
      </div>
    </div>
    <div class="edit-receiver__phone">
      <label class="required">{{ $t('cellPhone') }}</label>
      <van-field
        class="my-field"
        v-model="form.phone"
        :error="error.phone"
        :error-message="$t('invalidPhoneNo')"
        @input="handleInput('phone', $event)"
        @blur="validationInput('phone', $event.target.value)"
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
        :error="error.area"
        :errMsg="$t('areaInvalid')"
      />
    </div>
    <div class="edit-receiver__address">
      <label class="required">{{ $t('address') }}</label>
      <van-field
        class="my-field"
        v-model="form.address"
        :error="error.address"
        :error-message="$t('addressInvalid')"
        @input="handleInput('address', $event)"
        @blur="validationInput('address', $event.target.value)"
      />
    </div>
    <div class="edit-receiver__remark">
      <label>{{ $t('addRemark') }}</label>
      <van-field
        class="my-field"
        v-model="form.remark"
        type="textarea"
      />
    </div>
  </div>
</template>

<script>
import MyRadio from './MyRadio'
import MyAreaPicker from './MyAreaPicker'
import bus from '@/eventBus'

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
      error: {
        lastName: false,
        firstName: false,
        phone: false,
        area: false,
        address: false,
      },
      formValid: false,
    }
  },
  created () {
    const that = this
    bus.$on('receiverValidation', function () {
      that.validForm()
      console.log('error', that.error)
      const keys = Object.keys(that.error)
      that.formValid = keys.every(
        key => !that.error[key]
      )
      if (!that.formValid) {
        that.$message({
          content: that.$t('shippingInvalid'),
        })
      }
    })
  },
  beforeDestroy () {
    bus.$off('receiverValidation')
  },
  watch: {
    'form.area': function (val, old) {
      console.log('area', val)
      this.error.area = val.some(val => {
        return val.code === '-1'
      })
    },
    formValid: function (val, oldVal) {
      console.log('formValid', val)
      bus.$emit('receiverValidationResult', val)
    },
  },
  methods: {
    validForm () {
      const form = this.form
      for (let key in form) {
        if (form.hasOwnProperty(key) && key !== 'remark') {
          if (typeof form[key] === 'object') {
            !form[key].length && (this.error[key] = true)
          } else {
            !form[key] && (this.error[key] = true)
          }
        }
      }
    },
    confirmArea (val) {
      // console.log('area', val)
      this.form.area = val
      for (let i = val.length - 1; i >= 0; --i) {
        if (val[i].code !== '-1') {
          this.defaultAreaCode = val[i].code
          break
        }
      }
    },
    handleInput (key, val) {
      this.form[key] = val
      this.validationInput(key, val)
    },
    validationInput (key, val) {
      console.log('validationInput', key, val)
      if (key === 'phone') {
        const pattern = /^\d{11}$/gi
        this.error[key] = !pattern.test(val)
      } else {
        this.error[key] = !val
      }
    },
  },
}
</script>

<style lang="less">
.edit-receiver {
  // > div:not(:last-of-type) {
  //   margin-bottom: 20px;
  // }

  // > div.mode-group {
  //   margin-bottom: 0;
  // }

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

  .my-field {
    margin-top: 15px;
    // width: 100%;
    // height: 44px;
    // border: 1px solid #333333;
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
      // width: 100%;
      // height: 44px;
      // border: 1px solid #333333;
    }
  }

  .edit-receiver__remark {
    .my-field {
      // height: 100px;
      .van-cell__value {
        height: 100px !important;

        textarea {
          height: 100%;
          padding: 5px 8px;
        }
      }
    }
  }
}
</style>
