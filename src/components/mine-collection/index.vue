<template>
    <div class="collection" v-for="item in list" :key="item.bid" @click="jumpDetail(item.bid)">
        <AcTag>{{item.username}}</AcTag>
        <span style="margin-left:20px;">{{item.title}}</span>
        <span style="margin-left:20px;" v-if="type=='collection'">收藏于{{item.clTime}}</span>
        <span style="margin-left:20px;" v-if="type=='suki'">点赞于{{item.clTime}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserinfoStore } from '../../store/index.js'
import {reqCollectionOrSuki} from "./req.js"

export default defineComponent ({
    props:{
        type:{
            type:String,
            default:'collection'
        }
    },
    setup(props){
        const useUserinfo = useUserinfoStore()
        const list = ref([])
        const type = ref(0)
        if(props.type=='suki'){
            type.value = 1
        }
        const route = useRoute()
        onMounted(()=>{
            reqCollectionOrSuki({email:useUserinfo.getemail,username:route.query.author?route.query.author:useUserinfo.username,type:type.value,page:0},{},list)
        })

        // 跳转到详情页面
        const router = useRouter()
        function jumpDetail(bid){
            router.push({ path: "/detail/index", query: { bid } });
        }
        return {
            list,
            type:props.type,
            jumpDetail 
        }
    }
})
</script>

<style lang="scss">
.collection:hover{
    cursor: pointer;
}
</style>