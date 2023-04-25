<template>
    <AttentionFanItem v-for="attention in attentionlist" :key="attention.username" :attention="attention"></AttentionFanItem>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useUserinfoStore } from '../../store'
import AttentionFanItem from "../attentionfanitem/index.vue"
import { reqAttentionlist } from "./req.js"
export default defineComponent ({
    components:{
        AttentionFanItem
    },
    setup(){
        const useUserinfo = useUserinfoStore()
        const attentionlist = ref([])
        onMounted(()=>{
            reqAttentionlist({username:useUserinfo.username,page:0},{},attentionlist)
        })
        return {
            attentionlist    
        }
    }
})
</script>

<style></style>