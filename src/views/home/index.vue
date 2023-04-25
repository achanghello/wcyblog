<template>
    <div class="infinite-list" style="overflow: auto" v-infinite-scroll="load">
        <AcCard shadow="hover" class="box-card">
            <ac-select v-model="type" class="select-type">
                <AcOption value="suki" label="点赞量"></AcOption>
                <AcOption value="release_time" label="发布时间"></AcOption>
                <AcOption value="collection" label="收藏量"></AcOption>
                <AcOption value="views" label="浏览量"></AcOption>
            </ac-select>

            <ac-select v-model="sort">
                <AcOption value="ASC" label="升序"></AcOption>
                <AcOption value="DESC" label="降序"></AcOption>
            </ac-select>
        </AcCard>
        <AcCard v-for="blog in bloglist" :key="blog.bid" shadow="hover" class="box-card" @click="jumpDetail(blog)">
            <AcBlogitem :blog="blog"></AcBlogitem>
        </AcCard>
        <!-- <ul>
            <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
        </ul> -->
        <p v-if="loading && !complated" class="text">加载中...</p>
        <p v-if="complated" class="text">没有更多了</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, h, onMounted, reactive, ref, watch } from "vue";
import AcBlogitem from "../../components/blogitem/index.vue"
import router from "../../router/router";
import { reqShowBlogs } from "./req.js"
export default defineComponent({
    components: {
        AcBlogitem
    },
    setup(props, ctx) {
        // 获取文章的排序类型升序或降序以及页码数
        const type = ref('suki')
        const sort = ref('DESC')
        const page = ref(0)
        const bloglist = ref([])
        // onMounted(()=>{
        //     reqShowBlogs({type:type.value,sort:sort.value},{},bloglist,total)
        // })
        const loading = ref(false)
        const complated = ref(false)
        // let count = ref(1),
        //     loading = ref(false),
        //     complated = ref(false)

        const load = () => {
            reqShowBlogs({ type: type.value, sort: sort.value, page: page.value }, {}, bloglist, loading).then(flag=>{
                if(flag){
                    complated.value = true
                }
            })
            page.value++
            return complated.value
        }

        function jumpDetail(blog) {
            // let newobj = {}
            // function deepCopy(newobj, blog) {
            //     for (let k in blog) {
            //         if (k == 'cover' || k == 'summary') {
            //             continue
            //         }
            //         let item = blog[k]
            //         newobj[k] = item
            //     }
            // }
            // deepCopy(newobj, blog)
            // console.log("打印一下",newobj);

            router.push({ path: '/detail/index', query: {bid:blog.bid} })
        }

        // let instance = getCurrentInstance()

        // const isShowDrawer4 = ref(false)

        // function ClickChange() {
        // instance.proxy.$message({
        //     id: "1",
        //     message: "你好呀",
        //     center: true,
        // })
        // }
        // const imageUrl = ref('')
        watch([type, sort], (newValue, oldValue) => {
            bloglist.value = []
            page.value = 0
            complated.value = false
            load()
        })
        return {
            // 获取文章的排序类型升序或降序以及页码数
            type,
            sort,
            page,
            bloglist,

            loading,
            complated,
            load,

            jumpDetail
            // ClickChange,
            // imageUrl,
            // isShowDrawer4
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