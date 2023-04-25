<template>
  <div class="attentionfanitem">
    <div class="attentionfanitem-avatar">
        <img src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF" style="width: 100%;height: 100%;border-radius: 50%;" alt="">
    </div>
    <div class="attentionfanitem-content">
        <p>用户名:</p>
        <p>{{attention&&attention.username}}</p>
    </div>
    <div class="attentionfanitem-btn">
        <ac-button round> 已关注 </ac-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props:{
        attention:{
            type:Object
        }
    }
})
</script>

<style lang="scss" scoped>
.attentionfanitem {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #f0f0f2;
    align-items: center;
    .attentionfanitem-avatar {
        width: 60px;
        height: 60px;
        background-color: yellow;
        margin-right: 20px;
        border-radius: 30px;
    }
    .attentionfanitem-btn {
        position: absolute;
        right: 20px;
    }
}
</style>