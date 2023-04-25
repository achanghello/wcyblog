<template>
    <AcComment :comment="comment" @closeShowReply="closeShowReply" @getReply="getReply"></AcComment>
    <AcReply v-for="reply in replylist" :key="reply" :reply="reply" @getReply="getReply"></AcReply>
    <div class="second-look-more" v-if="comment.replyCount!=0&&!isshowreply" @click="getReply">查看全部{{comment.replyCount}}条回复</div>
</template>

<script lang="ts">
import { defineComponent,ref,provide } from "vue"
import AcComment from "../../components/ac-comment/index.vue"
import AcReply from "../../components/ac-reply/index.vue"
import { reqCommentReply } from "./req.js"
import { useUserinfoStore } from "../../store";
export default {
    components:{
        AcComment,
        AcReply
    },
    props:{
        comment:{
            type:Object,
            required:true
        }
    },
    setup(props){
        const useUserinfo = useUserinfoStore()
        const isshowreply = ref(false)
        const replylist = ref([])
        function getReply(){
            reqCommentReply({email:useUserinfo.getemail,cid: props.comment.cid,page:0},{}, replylist,isshowreply)
        }

        // 给后代组件提供
        // provide('cid',props.comment.cid)
        provide('replyCount',props.comment.replyCount)
        // 回复列表清零
        const closeShowReply = ()=>{
            isshowreply.value = false
            replylist.value = []
        }
        return {
            isshowreply,
            replylist,
            getReply,

            closeShowReply
        }
    }
}
</script>

<style lang="scss" scoped>
.second-look-more {
    font-size: 14px;
    color: #777888;
    line-height: 30px;
    margin-left: 7.5%;
    cursor: pointer;
}
</style>