<template>
    <div class="infinite-list" style="overflow: auto" v-infinite-scroll.loading.complated.immediate="load">
        <div class="lifestyle">
            <div style="margin-top: 15px" class="searchk">
                <AcInput v-model="columnValue">
                    <template v-slot:prepend>
                        <ac-select v-model="columnName">
                            <AcOption value="author" label="用户名"></AcOption>
                            <AcOption value="title" label="博客标题"></AcOption>
                            <AcOption value="tag" label="博客标签"></AcOption>
                            <AcOption value="type" label="博客类型"></AcOption>
                        </ac-select>
                    </template>
                    <template v-slot:append>
                        <AcButton type="primary" plain icon="ac-icon-search" @click="search">搜索</AcButton>
                    </template>
                </AcInput>
              <!-- <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                  <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="用户名" value="author"></el-option>
                    <el-option label="博客标题" value="title"></el-option>
                    <el-option label="博客标签" value="tag"></el-option>
                    <el-option label="博客类型" value="type"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
                </el-input> -->
            </div>
            <h1>搜索</h1>
            <span>请根据关键词进行搜索</span>
          </div>


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
import { reqSearchBlogs } from "./req.js"
export default defineComponent({
    components: {
        AcBlogitem
    },
    setup(props, ctx) {
        // 获取文章的排序类型升序或降序以及页码数
        const type = ref('suki')
        const sort = ref('DESC')
        const columnName = ref('title')
        const columnValue = ref('')
        const state = 1
        const page = ref(0)
        const bloglist = ref([])
        const total = ref(0)
        // onMounted(()=>{
        //     reqShowBlogs({type:type.value,sort:sort.value},{},bloglist,total)
        // })
        const loading = ref(false)
        const complated = ref(false)
        // let count = ref(1),
        //     loading = ref(false),
        //     complated = ref(false)

        const load = () => {
            reqSearchBlogs({  }, { columnValue:columnValue.value,
                                 columnName:columnName.value,
                                 state,
                                 type: type.value,
                                 sort: sort.value,
                                 page:page.value }, bloglist, loading).then(flag=>{
                if(flag){
                    complated.value = true
                }
            })
            page.value++
            return complated.value
        }

        function jumpDetail(blog) {
            let newobj = {}
            function deepCopy(newobj, blog) {
                for (let k in blog) {
                    if(k=='cover'||k=='summary'){
                        continue
                    }
                    let item = blog[k]
                    newobj[k] = item
                }
            }
            deepCopy(newobj,blog)
            // console.log("打印一下",newobj);
            
            router.push({ path: '/detail/index', query: newobj })
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
        function search(){
            bloglist.value = []
            page.value = 0
            complated.value = false
            load()
        }
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
            columnName,
            columnValue,
            page,
            bloglist,
            total,

            loading,
            complated,
            load,

            jumpDetail,
            search
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

    .lifestyle {
        background: #f1f8ff;
        padding: 40px 0;
        text-align: center;
        h2 {
          color: #203656;
          font-family: "Poppins", sans-serif;
          font-weight: 700;
          line-height: 1.4;
          margin: 20px 0;
        }
        span {
          font-size: 14px;
          color: #9faabb;
        }
        .searchk {
          width: 60%;
          margin: 0 auto;
          min-width: 800px;
          max-width: 1000px;
        }
      }

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