<template>
    <AcTabs v-model="activeName" type="title">
        <AcTabPane v-for="item in arr" :key="item.name" :label="item.label" :name="item.name">
        </AcTabPane>
    </AcTabs>
    <CommentReplyItem v-for="item in list" :key="item.cid" :item="item"></CommentReplyItem>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserinfoStore } from '../../store'
import CommentReplyItem from "../commentreplyitem/index.vue"
import {reqUserComment,reqUserCommentReceive} from "./req.js"
export default defineComponent ({
    components:{
        CommentReplyItem
    },
    setup(){
        const useUserinfo = useUserinfoStore()
        let activeName = ref('发布的评论')
        let arr = reactive([
            {
                label: "发布的评论",
                name: "发布的评论",
            },
            {
                label: "收到的评论",
                name: "收到的评论",
            }
        ])
        const list = ref([])

        const route = useRoute()
        onMounted(()=>{
            reqUserComment({email:useUserinfo.getemail,username:route.query.author?route.query.author:useUserinfo.username,type:'suki',sort:'DESC',page:0},{},list)
        })
        watch(activeName, (newValue, oldValue) => {
            list.value = []
            if(newValue=='发布的评论'){
                reqUserComment({email:useUserinfo.getemail,username:route.query.author?route.query.author:useUserinfo.username,type:'suki',sort:'DESC',page:0},{},list)
            }else{
                reqUserCommentReceive({email:useUserinfo.getemail,username:route.query.author?route.query.author:useUserinfo.username,type:'suki',sort:'DESC',page:0},{},list)
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