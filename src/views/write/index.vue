<template>
  <div class="editor">
    <Toolbar
      class="editor-up"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <div class="editor-down">
      <input type="text" placeholder="请输入标题" v-model="title" />
      <Editor
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <div class="editor-down-down detail">
      <div class="ant-list-item">
        <span className="detail-left"> 封面: </span>
        <span className="detail-right">
          <AcUpload
            class="avatar-uploader"
            name="blogImage"
            :multiple="false"
            :disabled="false"
            :onChange="onChange"
            :beforeUpload="beforeUpload"
            :onSuccess="onSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="ac-icon-jiahao" style="font-size: 60px"></i>
            <!-- avatar-uploader-icon -->
          </AcUpload>
        </span>
      </div>

      <div class="ant-list-item">
        <span className="detail-left"> 文章类型: </span>
        <span className="detail-right">
          <ac-select v-model="type">
            <AcOption :value="0" label="转载"></AcOption>
            <AcOption :value="1" label="原创"></AcOption>
          </ac-select>
        </span>
      </div>

      <div class="ant-list-item">
        <span className="detail-left"> 文章标签: </span>
        <span className="detail-right">
          <AcInput v-model="tag"></AcInput>
        </span>
      </div>

      <div class="ant-list-item">
        <span className="detail-left"> 文章简介: </span>
        <span className="detail-right">
          <!-- <AcTextarea v-model="summary"></AcTextarea> -->
          <AcText v-model="summary"></AcText>
        </span>
      </div>

      <!-- <el-upload
              class="avatar-uploader"
              :action="`/wcy/blog/uploadBlogImages?email=${email}`"
              name="blogImage"
              :with-credentials="true"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            > -->
      <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus" id="avatar-uploader-icon"></i>
            </el-upload>-->
    </div>

    <div class="editor-submit">
      <div class="submit">
        <ac-button round @click="saveLocal"> 保存草稿 </ac-button>
        <ac-button v-if="isLocal" round @click="loadLocal">
          加载草稿
        </ac-button>
        <ac-button round type="primary" @click="SubmitBlog">
          {{ $route.query.type === "modify" ? "保存修改" : "发布博客" }}
        </ac-button>
      </div>
    </div>
    <div style="height: 200px; width: 100%"></div>
  </div>
</template>
<script lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import Message from "../../../packages/message/src/index";
import { onBeforeUnmount, ref, shallowRef, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import AcTextarea from "../../components/ac-textarea/index.vue";
import {
  reqWriteUpImg,
  reqCoverImg,
  reqWriteUpBlog,
  reqBlogAndContent,
  reqUpdateBlog,
} from "./req.js";
import { useUserinfoStore } from "../../store/index";
export default {
  components: { Editor, Toolbar, AcTextarea },
  setup() {
    const useUserinfo = useUserinfoStore();
    const router = useRouter();

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("");

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //     setTimeout(() => {
    //         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //     }, 1500)
    // })

    const toolbarConfig = {};
    // 上传图片函数
    //上传图片
    function uploadImg(file, insertFn) {
      let imgData = new FormData();
      imgData.append("blogImage", file);
      //调用上传图片接口，上传图片  我这里testUpImg是测试接口
      reqWriteUpImg({ email: useUserinfo.getemail }, imgData).then(
        (response) => {
          // console.log("章鱼哥",response);
          insertFn(response);
          // const { code, retData } = response;
          // if (code == 200) {
          //     insertFn(retData);
          // }
        }
      );
    }
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        //配置上传图片
        uploadImage: {
          customUpload: uploadImg,
        },
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    // 下面是上传封面的模块
    function onChange(file) {
      let imgData = new FormData();
      imgData.append("blogImage", file);

      //调用上传图片接口，上传图片  我这里testUpImg是测试接口
      reqCoverImg({ email: useUserinfo.getemail }, imgData).then(
        (response) => {
          imageUrl.value = response;
        }
      );
    }
    function beforeUpload(file) {
      console.log("根据返回值确定是否上传", file);
      return false;
    }
    function onSuccess(filepath) {
      console.log("上传成功", filepath);
      imageUrl.value = filepath;
    }

    // 其他的表单
    const title = ref("");
    const imageUrl = ref("");
    const type = ref("");
    const tag = ref("");
    const summary = ref("");

    const route = useRoute();
    function SubmitBlog() {
      //             {
      //     "bid": 0,
      //     "type": 0,
      //     "tag": "多选框",
      //     "title": "计算机科学与技术",
      //     "summary": "阿萨德可见韩国付款后抠脚大汉返回数据的话",
      //     "coverFile": 封面文件,
      //     "content": "<div class=\"blog-content-box\">\r\n        <div class=\"article-header-box\">\r\n        <div class=\"article-header\">\r\n            <div class=\"article-title-box\">\r\n                <h1 class=\"title-article\" id=\"articleContentId\">Spring MVC参数传递总结</h1>\r\n            </div>\r\n            <div class=\"article-info-box\">\r\n                <div class=\"article-bar-top\">\r\n                    <img class=\"article-type-img\" src=\"https://csdnimg.cn/release/blogv2/dist/pc/img/original.png\" alt=\"\">\r\n                    <div class=\"bar-content\">\r\n                    <a class=\"follow-nickName \" href=\"https://blog.csdn.net/qq_43215592\" target=\"_blank\" rel=\"noopener\">HyggeJDS</a>\r\n                    <img class=\"article-time-img article-heard-img\" src=\"https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png\" alt=\"\">\r\n                    <span class=\"time\">于&nbsp;2021-11-20 21:52:24&nbsp;发布</span>\r\n                    <img class=\"article-read-img article-heard-img\" src=\"https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes2.png\" alt=\"\">\r\n                    <span class=\"read-count\">472</span>\r\n                    <a id=\"blog_detail_zk_collection\" class=\"un-collection\" data-report-click=\"{&quot;mod&quot;:&quot;popu_823&quot;,&quot;spm&quot;:&quot;1001.2101.3001.4232&quot;,&quot;ab&quot;:&quot;new&quot;}\">\r\n                        <img class=\"article-collect-img article-heard-img un-collect-status isdefault\" style=\"display:inline-block\" src=\"https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect2.png\" alt=\"\">\r\n                        <img class=\"article-collect-img article-heard-img collect-status isactive\" style=\"display:none\" src=\"https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollectionActive2.png\" alt=\"\">\r\n                        <span class=\"name\">收藏</span>\r\n                        <span class=\"get-collection\">\r\n                            1\r\n                        </span>\r\n                    </a>\r\n
      // }
      if (route.query.type == "modify") {
        let data = new FormData();
        data.append("bid", bid.value)
        // console.log("要修改的bid",bid.value);
        
        data.append("type", type.value);
        data.append("tag", tag.value);
        data.append("title", title.value);
        data.append("summary", summary.value);
        data.append("coverFile", imageUrl.value);
        data.append("content", valueHtml.value);
        reqUpdateBlog({ email: useUserinfo.getemail, tagState: 0 }, data);
        return;
      }

      let data = new FormData();
      data.append("author", useUserinfo.username);
      data.append("type", type.value);
      data.append("tag", tag.value);
      data.append("tagState", 1);
      data.append("title", title.value);
      data.append("summary", summary.value);
      data.append("coverFile", imageUrl.value);
      data.append("content", valueHtml.value);
      reqWriteUpBlog({ email: useUserinfo.getemail }, data).then(() => {
        router.push("/mine/index");
      });
    }
    // 判断本地是否有值
    const isLocal = ref(false);
    if (localStorage.getItem("blog")) {
      isLocal.value = true;
    }
    function loadLocal() {
      const value = JSON.parse(localStorage.getItem("blog"));
      // console.log("加载的值",value);
      type.value = value.type;
      tag.value = value.tag;
      title.value = value.title;
      summary.value = value.summary;
      imageUrl.value = value.coverFile;
      valueHtml.value = value.content;
    }
    function saveLocal() {
      localStorage.setItem(
        "blog",
        JSON.stringify({
          type: type.value,
          tag: tag.value,
          title: title.value,
          summary: summary.value,
          coverFile: imageUrl.value,
          content: valueHtml.value,
        })
      );
      Message({ text: "保存成功", type: "success" });
      isLocal.value = true;
    }
    const bid = ref("");
    onMounted(() => {
      if (route.query.type !== "modify") {
        return;
      }
      reqBlogAndContent(
        { email: useUserinfo.getemail, bid: route.query.bid },
        {}
      ).then((res) => {
        valueHtml.value = res.blogContent;
        bid.value = res.blog.bid;
        type.value = res.blog.type;
        tag.value = res.blog.tag;
        title.value = res.blog.title;
        summary.value = res.blog.summary;
        imageUrl.value = res.blog.cover;
      });
    });
    return {
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,

      onChange,
      beforeUpload,
      onSuccess,

      title,
      imageUrl,
      type,
      tag,
      summary,

      SubmitBlog,
      isLocal,
      loadLocal,
      saveLocal,
    };
  },
};
</script>

<style lang="scss" scoped>
.editor {
  padding-top: 100px;
  height: calc(100vh - 100px);
  width: 100%;
  overflow: scroll;
  border: 1px solid #f5f6f7;
  background-color: #f5f6f7;

  .editor-up {
    display: flex;
    justify-content: center;
    // width: 91%;
    min-width: 1380px;
    margin: 0 auto;
  }

  .editor-down {
    width: 70%;
    min-width: 816px;
    min-height: 800px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 30px;
    padding: 20px;

    input {
      width: 98%;
      display: block;
      margin: 0 auto;
      font-size: 40px;
      border: none;
      outline: none;
      font-weight: bold;
    }
  }

  .editor-down-down {
    width: 70%;
    min-width: 816px;
    min-height: 300px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 30px;
    padding: 20px;
  }

  .editor-down-down.detail {
    .ant-list-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .detail-left {
      width: 200px;
      text-align: right;
      margin-right: 15px;
      font-size: 20px;
      font-weight: bold;
    }

    .detail-right {
      width: 400px;
      .avatar {
        width: 100%;
        height: 100%;
      }
    }
  }

  .editor-submit {
    width: 100%;
    height: 64px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ddd;

    .submit {
      width: 600px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>