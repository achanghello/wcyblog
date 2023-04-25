<template>
    <div class="infinite-list" style="overflow: auto" v-infinite-scroll.mine="load">
        <AcCard shadow="hover" class="box-card">
            <div class="userinfo">
                <MineHead :authorObj="route.query"></MineHead>
            </div>
        </AcCard>
        <AcCard shadow="hover" class="box-card">
            <!-- <AcTabPane v-for="item in arr" :key="item.name" :label="item.label" :name="item.name"></AcTabPane> -->
            <AcTabs v-model="activeName" @tab-click="handleClick" type="title">
                <AcTabPane label="博客" name="博客">
                    <MineBlog ref="blog" :searchtext="searchtext"></MineBlog>
                </AcTabPane>
                <AcTabPane label="关注列表" name="关注列表">
                    <MineAttention></MineAttention>
                </AcTabPane>
                <AcTabPane label="粉丝列表" name="粉丝列表">
                    <MineFan></MineFan>
                </AcTabPane>
                <AcTabPane label="收藏的博客" name="收藏的博客">
                    <MineCollection type="collection"></MineCollection>
                </AcTabPane>
                <AcTabPane label="点赞的博客" name="点赞的博客">
                    <MineCollection type="suki"></MineCollection>
                </AcTabPane>
                <AcTabPane label="评论" name="评论">
                    
                    <MineComment></MineComment>
                </AcTabPane>
                <AcTabPane label="回复" name="回复">
        
                    <MineReply></MineReply>
                </AcTabPane>
            </AcTabs>
            <input type="text" class="input" placeholder="搜TA的博客.." v-model="searchtext">
        </AcCard>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, h, onMounted, reactive, ref } from "vue";
import MineHead from "../../components/mine-head/index.vue"
import MineBlog from "../../components/mine-blog/index.vue"
import MineAttention from "../../components/mine-attention/index.vue"
import MineFan from "../../components/mine-fan/index.vue"
import MineComment from "../../components/mine-comment/index.vue"
import MineReply from "../../components/mine-reply/index.vue"
import MineCollection from "../../components/mine-collection/index.vue"
import { useRouter,useRoute } from "vue-router";
export default defineComponent({
    components: {
        MineHead,
        MineBlog,
        MineAttention,
        MineFan,
        MineComment,
        MineReply,
        MineCollection
    },
    setup() {
        // 第一层
        let arr = reactive([
            {
                label: "博客",
                name: "博客",
            },
            {
                label: "关注列表",
                name: "关注列表",
            },
            {
                label: "粉丝列表",
                name: "粉丝列表",
            },
            {
                label: "收藏的博客",
                name: "收藏的博客",
            },
            {
                label: "点赞的博客",
                name: "点赞的博客",
            },
            {
                label: "评论",
                name: "评论",
            },
            {
                label: "回复",
                name: "回复",
            }
        ])
        let activeName = ref('博客')
        const handleClick = (tab, event) => {
            console.log('------------', tab, event);
        }
        let searchtext = ref("")

        // 无限滚动
        const load = ()=>{
            blog.value.load()
        }
        const blog = ref(null)

        // 如果是从详情页的作者跳转过来的
        const route = useRoute()
        // console.log("我是从详情页跳转过来的",router.query);
        
        return {
            arr,
            handleClick,
            activeName,
            searchtext,
            load,
            blog,

            route
        }
    }
})
</script>

<style lang="scss" scoped>
.infinite-list {
    padding-top: 100px;
    height: calc(100vh - 100px);
    width: 100%;
    border: 1px solid #f5f6f7;
    background-color: #f5f6f7;

    .box-card {
        width: 80%;
        min-width: 1000px;
        max-width: 1200px;
        margin: 0 auto;
        margin-top: 20px;
        position: relative;

        .input {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 130px;
            height: 60px;
            box-sizing: border-box;
            border: 2px solid #ccc;
            border-radius: 4px;
            font-size: 20px;
            background: #f5f6f7;
            // padding: 12px 20px 12px 40px;
            -webkit-transition: width 0.4s ease-in-out;
            transition: width 0.4s ease-in-out;
        }

        .input:focus {
            width: calc(100% - 40px);
            outline-color: #409eff;
        }

        .userinfo {
            padding-left: 120px;
        }

        .select-type {
            margin-right: 20px;
        }
    }
}

.text {
    color: green;
    text-align: center;
    line-height: 50px;
}
</style>