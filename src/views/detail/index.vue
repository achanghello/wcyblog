<template>
  <div class="detail" style="overflow: auto">
    <div class="title-bg">
      <div class="title">
        <AcBlogitem :blog="blog"></AcBlogitem>
      </div>
    </div>
    <AcCard shadow="hover" class="box-card">
      <div v-html="blogcontent" style="width: 100%"></div>
    </AcCard>
    <AcCard class="box-card down">
      <AcButton class="button" round v-if="sukistate" @click="cancelLike"
        >取消点赞</AcButton
      >
      <AcButton class="button" round v-else @click="Like">点击点赞</AcButton>
      <AcButton
        class="button"
        round
        v-if="collectionstate"
        @click="cancelCollection"
        >取消收藏</AcButton
      >
      <AcButton class="button" round v-else @click="Collection"
        >点击收藏</AcButton
      >
      <AcButton round type="primary" @click="drawercommentstate = true"
        >点击评论</AcButton
      >
    </AcCard>
    <ac-drawer
      v-model="drawercommentstate"
      direction="right"
      :clickMaskClose="true"
    >
      <template v-slot:title> 评论 </template>
      <AcText v-model="commentcontent">
        <AcButton @click="submitComment">提交评论</AcButton>
      </AcText>
      <AcCommentGroup
        v-for="comment in commentlist"
        :key="comment"
        :comment="comment"
      ></AcCommentGroup>
    </ac-drawer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  provide,
} from "vue";
import { useRoute } from "vue-router";
import AcBlogitem from "../../components/blogit/index.vue";
import AcTextarea from "../../components/ac-textarea/index.vue";
import AcCommentGroup from "../../components/ac-comment-group/index.vue";
import {
  reqBlogAndContent,
  reqIsLike,
  reqBlogComment,
  reqCancelLike,
  reqLike,
  reqPublicComment
} from "./req.js";
import { useUserinfoStore } from "../../store/index";
export default defineComponent({
  components: {
    AcBlogitem,
    AcTextarea,
    AcCommentGroup,
  },
  setup() {
    const useUserinfo = useUserinfoStore();
    const route = useRoute();
    // 获取文章信息
    const blogcontent = ref("加载中...");
    const routequery = ref(null);
    // 点赞或收藏状态
    const sukistate = ref(null);
    const collectionstate = ref(null);
    // 控制评论面板的展示
    const drawercommentstate = ref(false);
    const commentlist = ref([]);
    // 获取评论区的函数
    function getBlogComment() {
      reqBlogComment(
        {
          email: useUserinfo.getemail,
          bid: route.query.bid,
          type: "release_time",
          sort: "DESC",
          page: 0,
        },
        {},
        commentlist
      );
    }
    // 获取博客详情数据
    function getDetail() {
      // 获取博客的内容
      reqBlogAndContent(
        { email: useUserinfo.getemail, bid: route.query.bid },
        {}
      ).then((res) => {
        routequery.value = res.blog;
        blogcontent.value = res.blogContent;
      });
      // 获取是否已经点赞
      reqIsLike(
        {
          email: useUserinfo.getemail,
          username: useUserinfo.username,
          id: route.query.bid,
          type: 1,
        },
        {},
        sukistate
      );
      // 获取是否已经收藏
      reqIsLike(
        {
          email: useUserinfo.getemail,
          username: useUserinfo.username,
          id: route.query.bid,
          type: 0,
        },
        {},
        collectionstate
      );
      // 获取评论区
      getBlogComment();
    }
    onMounted(() => {
      getDetail();
    });
    provide("getBlogComment", getBlogComment);

    // 取消点赞或收藏
    const Like = async () => {
      await reqLike(
        { email: useUserinfo.getemail, quantity: routequery.value.suki },
        {
          id: routequery.value.bid,
          title: routequery.value.title,
          username: useUserinfo.username,
          type: 1,
          blogState: routequery.value.state,
        }
      ).then(() => {
        getDetail();
      });
    };
    const Collection = async () => {
      await reqLike(
        { email: useUserinfo.getemail, quantity: routequery.value.suki },
        {
          id: routequery.value.bid,
          title: routequery.value.title,
          username: useUserinfo.username,
          type: 0,
          blogState: routequery.value.state,
        }
      ).then(() => {
        getDetail();
      });
    };
    const cancelLike = async () => {
      await reqCancelLike(
        { email: useUserinfo.getemail, quantity: routequery.value.suki },
        { id: routequery.value.bid, type: 1, cid: sukistate.value }
      ).then(() => {
        getDetail();
      });
    };
    const cancelCollection = async () => {
      await reqCancelLike(
        { email: useUserinfo.getemail, quantity: routequery.value.collection },
        { id: routequery.value.bid, type: 0, cid: collectionstate.value }
      ).then(() => {
        getDetail();
      });
    };

    // 填写评论内容
    const commentcontent = ref("");
    function submitComment(){
      reqPublicComment({email: useUserinfo.getemail,}, { bid: routequery.value.bid, title: routequery.value.title, content: commentcontent.value, username: useUserinfo.username }).then(() => {
                    getBlogComment()
                    commentcontent.value = ""
                })
    }
    return {
      blog: routequery,
      blogcontent,

      sukistate,
      collectionstate,

      drawercommentstate,
      commentlist,

      Like,
      Collection,
      cancelLike,
      cancelCollection,

      // 评论
      commentcontent,
      getBlogComment,
      submitComment
    };
  },
});
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 100px;
  height: calc(100vh - 100px);
  width: 100%;
  border: 1px solid #f5f6f7;
  background-color: #f5f6f7;

  .title-bg {
    width: 100%;
    height: 250px;
    background-color: #79869a;
    padding-top: 200px;

    .title {
      width: 80%;
      // height: 200px;
      margin: 0 auto;
      min-width: 1000px;
      max-width: 1200px;
    }
  }
  .box-card {
    width: 80%;
    min-width: 1000px;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 200px;
  }
  .box-card.down {
    margin-top: 0px;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    .button {
      margin-right: 20px;
    }
  }
}
</style>