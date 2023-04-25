<template>
  <div class="new-info-box">
    <div class="comment-top">
      <div class="user-box">
        <span class="name">{{ reply.username }}回复{{ reply.another }}</span>
        <span class="date">{{
          new Date(reply.releaseTime).toLocaleString()
        }}</span>
      </div>
      <div class="opt-comment">
        <!-- 举报删除回复收起 -->
        <span>操作</span>
        <div class="dropdown-menu">
          <AcButton @click="reportReply">举报</AcButton>
          <AcButton @click="deleteReply" v-if="useUserinfo.username==reply.username">删除</AcButton>
          <AcButton @click="isshowreplyinput = true">回复</AcButton>
        </div>
      </div>
      <!-- <div class="comment-like">
                {{ reply.suki }}
                <img v-show="!sukistate" class="comment-like-img unclickImg" src="./images/commentLikeWhite.png" title="点赞">
                <img @click="Like" class="comment-like-img comment-like-img-hover" src="./images/commentLikeHover.png" title="点赞">
                <img @click="cancelLike" :style="sukistate?'display: inline-block;':''" class="comment-like-img clickedImg" src="./images/commentLikeActive.png" title="取消点赞">
            </div> -->
    </div>
    <div class="comment-center">
      <div class="new-comment">
        {{ reply.content }}
      </div>
    </div>
    <AcText v-if="isshowreplyinput" v-model="replycontent">
      <AcButton @click="replyReply">提交回复</AcButton>
    </AcText>
  </div>
</template>

<script lang="ts">
import { reqDeleteReply, reqPublicReply, reqReportReply } from "./req.js";
import { defineComponent, onMounted, ref, inject } from "vue";
import AcTextarea from "../ac-textarea/index.vue";
import { useUserinfoStore } from "../../store/index.js";
export default defineComponent({
  name: "AcReply",
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
  components: {
    AcTextarea,
  },
  emits: ["getReply"],
  provide() {
    return {
      another: this.reply.username,
    };
  },
  setup(props, { emit }) {
    const useUserinfo = useUserinfoStore();
    const replyCount = inject('replyCount')
    // 点赞或收藏状态
    // const sukistate = ref(false)

    // onMounted(() => {
    //     reqIsLike({ id: props.reply.bid, type: 1 }, {}, sukistate)
    // })
    // const Like = async()=>{
    //     await reqLike({quantity: props.reply.suki},{id: props.reply.bid,title:props.reply.title,type:1,blogState:props.reply.blogState})
    //     reqIsLike({ id: props.reply.bid, type: 1 }, {}, sukistate)
    // }
    // const cancelLike = async()=>{
    //     await reqCancelLike({quantity: props.reply.suki},{id: props.reply.bid,type:1})
    //     reqIsLike({ id: props.reply.bid, type: 1 }, {}, sukistate)
    // }
    const deleteReply = async () => {
      await reqDeleteReply(
        { email: useUserinfo.getemail, rid: props.reply.rid },
        {}
      ).then(() => {
        emit("getReply");
      });
    };
    const reportReply = async () => {
      // console.log("举报评论",{email:useUserinfo.getemail, rid: props.reply.rid,violationType:'政治相关'});

      await reqReportReply(
        {
          email: useUserinfo.getemail,
          rid: props.reply.rid,
          violationType: "政治相关",
        },
        {}
      ).then(() => {
        emit("getReply");
      });
    };
    const getCommentReply = () => {
      emit("getReply");
    };

    // 评论的内容
    const replycontent = ref("");
    // 是否展示回复输入框
    const isshowreplyinput = ref(false);
    const replyReply = () => {
      reqPublicReply(
        { email: useUserinfo.getemail,quantity: replyCount },
        {
          bid: props.reply.bid,
          cid: props.reply.cid,
          title: props.reply.title,
          content: replycontent.value,
          another: props.reply.username,
          username: useUserinfo.username,
        }
      ).then(() => {
        replycontent.value = "";
        isshowreplyinput.value = false
        getCommentReply();
      });
    };
    return {
      deleteReply,
      reportReply,
      replycontent,
      isshowreplyinput,
      getCommentReply,
      replyReply,

      useUserinfo
    };
  },
});
</script>

<style lang="scss" scoped>
.new-info-box {
  margin-top: 5px;
  width: 90%;
  margin-left: 7.5%;

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
      // text-align: right;
      // height: 20px;
      line-height: 24px;
      // margin-top: 2px;
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