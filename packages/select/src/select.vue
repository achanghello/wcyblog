<template>
  <div class="ac-select" tabindex="0" @focus.capture="openSelect(true)" @blur.capture="openSelect(false)">
    <input class="ac-select__inner" placeholder="请选择" :value="currentValue&&currentValue.label" readonly >
    <span class="ac-select__suffix">
      <svg :class="['triangle', { 'rotate': showOptions }]" viewBox="64 64 896 896" data-icon="down"
        aria-hidden="true" focusable="false">
        <path
          d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
        </path>
      </svg>
    </span>
    <ul class="dropdown-menu" v-show="showOptions">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  name: 'AcSelect',
  props: {
    modelValue: {
      type: String,
      default:''
    }
  },
  provide() {
    return {
      select: this,
    };
  },
  emit:['update:modelValue'],
  setup(props,{emit}){
    let showOptions = ref(false)
    const openSelect=(val,flag=false,value='')=>{
      // alert(123)
      // console.log("------------", showOptions.value);
      showOptions.value = val
      // if(showOptions.value)
      if(flag){
        emit('update:modelValue',value)
      }
    }
    let arr = ref([])
    const arrAdd=(val)=>{
      arr.value.push(val)
    }

    let currentValue = computed(()=>{
      return arr.value.find((item)=>item.value===props.modelValue) 
    })
    
    return {
      showOptions,
      openSelect,
      arr,
      arrAdd,
      currentValue
    }
  }
})
</script>

<style lang="scss" scoped>
.ac-select {
  width: 180px;
  position: relative;
  font-size: 14px;
  display: inline-block;

  .ac-select__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.ac-select--suffix {
  .ac-select__inner {
    padding-right: 30px;
  }

  .ac-select__suffix {
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    z-index: 900;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color .2s cubic-bezier(.645, .045, .355, 1);
    }

    .ac-icon-yanjing-active {
      color: #409eff;
    }
  }
}

.triangle {
  position: absolute;
  top: 20px;
  right: 12px;
  width: 12px;
  height: 12px;
  fill: rgba(0, 0, 0, .25);
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transition: all 0.3s ease-in-out;
  pointer-events: none;
}

.rotate {
  transform: translateY(-50%) rotate(180deg);
  -webkit-transform: translateY(-50%) rotate(180deg);
}

.dropdown-menu {
  z-index: 20;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 3px 8px 1px rgba(29, 20, 5, 0.22);
  position: absolute;
  width: 180px;
  font-size: 14px;
  list-style-type: none;
  background-color: #fff;
  margin-top: 20px;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 40px;
    border-bottom: 10px solid white;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
  }

  /*li {
    width: 100%;
    color: #79889e;

    // background-color: blue;
    &:hover {
      color: #c99748;
      font-size: 16px;
    }
  }*/

}</style>
