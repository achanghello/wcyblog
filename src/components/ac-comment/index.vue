<template>
  <div class="new-info-box">
    <div class="comment-top">
      <div class="user-box">
        <span class="name">{{ comment.username }}</span>
        <span class="date">{{
          new Date(comment.releaseTime).toLocaleString()
        }}</span>
      </div>
      <div class="opt-comment">
        <!-- 举报删除回复收起 -->
        <span>操作</span>
        <div class="dropdown-menu">
          <AcButton @click="reportComment">举报</AcButton>
          <AcButton @click="deleteComment" v-if="useUserinfo.username==comment.username">删除</AcButton>
          <AcButton @click="isshowreplyinput = true">回复</AcButton>
          <AcButton @click="closeShowReply">收起</AcButton>
        </div>
      </div>
      <div class="comment-like">
        {{ comment.suki }}
        <img
          v-show="!sukistate"
          class="comment-like-img unclickImg"
          src="./images/commentLikeWhite.png"
          title="点赞"
        />
        <img
          @click="Like"
          class="comment-like-img comment-like-img-hover"
          src="./images/commentLikeHover.png"
          title="点赞"
        />
        <img
          @click="cancelLike"
          :style="sukistate ? 'display: inline-block;' : ''"
          class="comment-like-img clickedImg"
          src="./images/commentLikeActive.png"
          title="取消点赞"
        />
      </div>
    </div>
    <div class="comment-center">
      <div class="new-comment">
        {{ comment.content }}
      </div>
    </div>
    <AcText v-if="isshowreplyinput" v-model="replycontent">
        <AcButton @click="replyComment">提交回复</AcButton>
    </AcText>
  </div>
</template>

<script lang="ts">
import AcTextarea from "../ac-textarea/index.vue";
import {
  reqIsLike,
  reqCancelLike,
  reqLike,
  reqDeleteComment,
  reqReportComment,
  reqPublicReply,
} from "./req.js";
import { defineComponent, onMounted, ref, inject } from "vue";
import { useUserinfoStore } from "../../store";
export default defineComponent({
  name: "AcComment",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components: {
    AcTextarea,
  },
  provide() {
    return {
      another: this.comment.username,
    };
  },
  emits: ["closeShowReply", "getReply"],
  setup(props, { emit }) {
    const useUserinfo = useUserinfoStore();
    const getBlogComment = inject("getBlogComment");
    // 点赞或收藏状态
    const sukistate = ref(false);

    onMounted(() => {
      // reqIsLike({ id: props.comment.bid, type: 1 }, {}, sukistate);
      // 获取是否已经点赞
      reqIsLike(
        {
          email: useUserinfo.getemail,
          username: useUserinfo.username,
          id: props.comment.cid,
          type: 2,
        },
        {},
        sukistate
      );
    });
    
    const Like = async () => {
      await reqLike(
        { email: useUserinfo.getemail, quantity: props.comment.suki },
        {
          id: props.comment.cid,
          title: props.comment.title,
          username: useUserinfo.username,
          type: 2,
          blogState: props.comment.blogState,
        }
      );
      getBlogComment();
    };
    const cancelLike = async () => {
      await reqCancelLike(
        { email: useUserinfo.getemail, quantity: props.comment.suki },
        { id: props.comment.cid, type: 2, cid: sukistate.value }
      );
      getBlogComment();
    };

    // 收起回复列表
    const closeShowReply = () => {
      emit("closeShowReply");
    };
    // 删除评论
    const deleteComment = async () => {
      await reqDeleteComment(
        { email: useUserinfo.getemail, cid: props.comment.cid },
        {}
      ).then(() => {
        getBlogComment();
      });
    };
    // 举报评论
    const reportComment = async () => {
      await reqReportComment(
        {
          email: useUserinfo.getemail,
          cid: props.comment.cid,
          violationType: "政治相关",
        },
        {}
      ).then(() => {
        getBlogComment();
      });
    };

    // 获取回复
    function getCommentReply() {
      emit("getReply");
    }
    // 回复的内容
    const replycontent = ref("");
    // 是否展示回复输入框
    const isshowreplyinput = ref(false);
    const replyComment = () => {
      reqPublicReply(
        {email: useUserinfo.getemail,quantity:props.comment.replyCount},
        {
          bid: props.comment.bid,
          cid: props.comment.cid,
          title: props.comment.title,
          content: replycontent.value,
          another: props.comment.username,
          username: useUserinfo.username,
        }
      ).then(() => {
        replycontent.value = ''
        isshowreplyinput.value = false
        getCommentReply()
      });
    };
    return {
      sukistate,
      Like,
      cancelLike,
      closeShowReply,
      deleteComment,
      reportComment,
      isshowreplyinput,
      replycontent,
      getCommentReply,
      replyComment,

      useUserinfo
    };
  },
});
</script>

<style lang="scss" scoped>
.new-info-box {
  width: 95%;
  margin: 5px auto;

  .comment-top {
    display: flex;

    .user-box {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
      height: 30px;

      .name {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #777888;
        margin-right: 20px;
      }

      .date {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #777888;
        // margin-right: 50px;
      }
    }

    .opt-comment {
      display: flex;
      align-items: center;
      font-size: 16px;
      position: relative;

      &:hover .dropdown-menu {
        display: block;
        z-index: 10;
      }

      .dropdown-menu {
        border-radius: 4px;
        box-shadow: 0 3px 8px 1px rgba(29, 20, 5, 0.22);
        position: absolute;
        background-color: #fff;
        left: -26px;
        top: 100%;
        display: none;
        /*&::before {
                    content: "";
                    position: absolute;
                    top: -20px;
                    left: 50%px;
                    background-color: #000;
                    transform: translateX(-50%);
                    border-bottom: 10px solid white;
                    border-right: 10px solid transparent;
                    border-top: 10px solid transparent;
                    border-left: 10px solid transparent;
                }*/
      }
    }

    .comment-like {
      display: flex;
      cursor: pointer;
      color: #4d4d4d;
      line-height: 24px;
      align-items: center;

      img.comment-like-img {
        width: 16px;
        height: 16px;
        display: none;
      }

      img.unclickImg {
        display: inline-block;
      }

      img.comment-like-img:hover {
        & ~ .comment-like-img-hover {
          display: inline-block;
        }

        display: none;
      }
    }
  }

  .comment-center .new-comment {
    font-size: 14px;
    color: #222226;
    line-height: 22px;
    word-break: break-word;
  }
}
</style>