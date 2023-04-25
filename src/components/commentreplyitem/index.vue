<template>
  <div class="attentionfanitem">
    <div class="attentionfanitem-content">
        <p>{{item.content}}</p>
        <p>{{item.releaseTime}}-{{item.username}}-{{item.replyCount}}条回复-{{item.suki}}个赞-{{item.title}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props:{
    item:{
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
}
</style>