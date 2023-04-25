<template>
    <AttentionFanItem v-for="attention in fanlist" :key="attention.username" :attention="attention"></AttentionFanItem>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useUserinfoStore } from '../../store'
import AttentionFanItem from "../attentionfanitem/index.vue"
import { reqFanlist } from "./req.js"
export default defineComponent ({
    components:{
        AttentionFanItem
    },
    setup(){
        const useUserinfo = useUserinfoStore()
        const fanlist = ref([])
        onMounted(()=>{
            reqFanlist({username:useUserinfo.username,page:0},{},fanlist)
        })
        return {
            fanlist    
        }
    }
})
</script>

<style></style>