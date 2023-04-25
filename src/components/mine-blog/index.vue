<template>
  <div style="display: flex; align-items: center; justify-content: flex-start">
    <ac-radio label="0" v-model="state">审核中</ac-radio>
    <ac-radio label="1" v-model="state">已过审</ac-radio>
    <ac-radio label="2" v-model="state">未过审</ac-radio>

    <AcTabs v-model="type" type="title">
      <AcTabPane
        v-for="item in arr"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></AcTabPane>
    </AcTabs>
  </div>
  <div ref="sunwukong">
    <div
      v-for="blog in searchbloglist"
      :key="blog.bid"
      style="display: flex; align-items: center"
    >
      <div :style="{width:route.query.author?'100%':'80%'}">
        <AcBlogitem :blog="blog" @click="jumpDetail(blog.bid,false)"></AcBlogitem>
      </div>
      <div style="width: 20%" v-if="!route.query.author">
        <ac-button round @click="jumpDetail(blog.bid)"> 修改 </ac-button>
        <ac-button round @click="deletaMyBlog(blog.bid)"> 删除 </ac-button>
      </div>
    </div>
    <p v-if="loading && !complated" class="text">加载中...</p>
    <p v-if="complated" class="text">没有更多了</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AcBlogitem from "../../components/blogitem/index.vue";
import { useUserinfoStore } from "../../store/index";
import { reqShowBlogs, reqDeletaMyBlog } from "./req.js";
export default defineComponent({
  components: {
    AcBlogitem,
  },
  props:['searchtext'],
  setup(props) {
    const useUserinfo = useUserinfoStore();
    const state = ref("1");
    let type = ref("release_time");
    let arr = reactive([
      {
        label: "按照发布时间",
        name: "release_time",
      },
      {
        label: "按访问量",
        name: "views",
      },
      {
        label: "点赞量",
        name: "suki",
      },
      {
        label: "收藏量",
        name: "collection",
      },
    ]);
    // 获取文章的排序类型升序或降序以及页码数
    const sort = ref("DESC");
    const page = ref(0);
    const bloglist = ref([]);
    const searchbloglist = computed(()=>{
        return bloglist.value.filter((item)=>{
            return item.title.includes(props.searchtext)
        })
    })
    const total = ref(0);
    // onMounted(()=>{
    //     reqShowBlogs({type:type.value,sort:sort.value},{},bloglist,total)
    // })
    const loading = ref(false);
    const complated = ref(false);

    const route = useRoute()
    const load = () => {
      // console.log("什么是需求",route.query.author);
      
      reqShowBlogs(
        {
          email: useUserinfo.getemail,
          username: route.query.author?route.query.author:useUserinfo.username,
          state: state.value,
          type: type.value,
          sort: sort.value,
          page: page.value,
        },
        {},
        bloglist,
        loading
      ).then((flag) => {
        if (flag) {
          complated.value = true;
        }
      });
      page.value++;
      return complated.value;
    };

    onMounted(() => {
      load();
    });
    watch([type, state], (newValue, oldValue) => {
      bloglist.value = [];
      page.value = 0;
      complated.value = false;
      load();
    });

    function deletaMyBlog(bid) {
      reqDeletaMyBlog({ email: useUserinfo.getemail,bid }, {}).then(() => {
        load();
      });
    }
    const router = useRouter();
    function jumpDetail(bid,ismodify=true) {
      if(ismodify){
      router.push({ path: "/write/index", query: { type: "modify", bid } });
      }else{
        router.push({ path: "/detail/index", query: { bid } });
      }
    }

    const sunwukong = ref(null)
    setTimeout(()=>{
        console.log(sunwukong.value.style);
        console.log("页面已经滚动的距离",sunwukong.value.offsetTop);
    },2000)

    return {
      state,
      arr,
      type,
      sort,
      page,
      bloglist,
      searchbloglist,
      total,

      loading,
      complated,
      load,

      deletaMyBlog,
      jumpDetail,

      sunwukong,
      route
    };
  },
});
</script>

<style scoped>
.text {
  color: green;
  text-align: center;
  line-height: 50px;
}
</style>