<template>
  <label class="ac-radio" :class="{'is-checked': model === label}">
    <span class="ac-radio__input">
      <span class="ac-radio__inner"></span>
      <input
        class="ac-radio__original"
        type="radio"
        :value="label"
        :name="name"
        v-model="model"
       />
    </span>
    <span class="ac-radio__label">
        <slot></slot>
        <!-- 如果没有插槽内容，那么label就是内容 -->
        <template v-if="!$slots.default">{{label}}</template>
      </span>
  </label>
</template>

<script>
export default {
  name: 'AcRadio',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: null,
    name: {
      type: String,
      default: ''
    }
  },
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  computed: {
    model: {
      get () {
        return this.isGroup ? this.RadioGroup.value : this.modelValue
      },
      set (value) {
        // console.log('不想长大',value);
        this.isGroup ? this.RadioGroup.$emit('update:modelValue', value) : this.$emit('update:modelValue', value)
      }
    },
    // 判断包裹在group中
    isGroup () {
      return !!this.RadioGroup
    }
  }
}
</script>

<style lang="scss">
.ac-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    .ac-radio__input {
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
      .ac-radio__inner {
        border: 1px solid #dcdfe6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        &:after {
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%) scale(0);
          transition: transform .15s ease-in;
        }
      }
      .ac-radio__original {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0px;
        right: 0;
        bottom: 0;
        margin: 0;
      }
    }
    .ac-radio__label {
      font-size: 14px;
      padding-left: 10px;
    }
  }
  .ac-radio.is-checked {
    .ac-radio__input {
      .ac-radio__inner {
        border-color: #409eff;
        background: #409eff;
        &:after {
          transform: translate(-50%,-50%) scale(1);
        }
      }
    }
    .ac-radio__label {
      color: #409eff;
    }
  }
</style>
