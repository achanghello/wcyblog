<template>
    <AcTabs v-model="activeName" type="title">
        <AcTabPane v-for="item in arr" :key="item.name" :label="item.label" :name="item.name">
        </AcTabPane>
    </AcTabs>
    <CommentReplyItem v-for="item in list" :key="item.rid" :item="item"></CommentReplyItem>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useUserinfoStore } from '../../store'
import CommentReplyItem from "../commentreplyitem/index.vue"
import {reqUserReply,reqUserReplyReceive} from "./req.js"
export default defineComponent ({
    components:{
        CommentReplyItem
    },
    setup(){
        const useUserinfo = useUserinfoStore()
        let activeName = ref('发布的回复')
        let arr = reactive([
            {
                label: "发布的回复",
                name: "发布的回复",
            },
            {
                label: "收到的回复",
                name: "收到的回复",
            }
        ])
        const list = ref([])
        onMounted(()=>{
            reqUserReply({email:useUserinfo.getemail,username:useUserinfo.username,type:'suki',sort:'DESC',page:0},{},list)
        })
        watch(activeName, (newValue, oldValue) => {
            list.value = []
            if(newValue=='发布的回复'){
                reqUserReply({email:useUserinfo.getemail,username:useUserinfo.username,type:'suki',sort:'DESC',page:0},{},list)
            }else{
                reqUserReplyReceive({email:useUserinfo.getemail,username:useUserinfo.username,type:'suki',sort:'DESC',page:0},{},list)
            }
        })
        return {
            arr,
            activeName,
            list  
        }
    }
})
</script>

<style></style>