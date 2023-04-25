<template>
    <div>
        <AcTabs v-model="activeName" @tab-click="handleClick" type="title">
            <AcTabPane v-for="item in arr" :key="item.name" :label="item.label" :name="item.name">{{item.label}}</AcTabPane>
        </AcTabs>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent,h, reactive, ref } from "vue";
export default defineComponent({
  setup() {
      
    let arr = reactive([
        {
            label:"首页",
            name:"first",
        },
        {
            label:"博客",
            name:"second",
        },
        {
            label:"留言",
            name:"third",
        },
        {
            label:"日记",
            name:"fourth",
        },
        {
            label:"甲乙",
            name:"fifth",
        }
    ])
    let activeName = ref('second')
    const handleClick = (tab, event) => {
        console.log('------------', tab, event);
        // arr.pop()
    }
    return {
        activeName,
        handleClick,
        arr
    }
  }
});
</script>