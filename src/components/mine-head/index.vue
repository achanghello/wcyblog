<template>
  <template v-if="!isedituserinfo">
    <div
      style="
        color: #222226;
        font-size: 22px;
        font-weight: 500;
        line-height: 24px;
      "
    >
      <span style="margin-right: 20px">{{ userinfo.username }}</span>
      <span>{{ userinfo.sex }}</span>
      <i :class="`ac-icon-${userinfo.sex=='男'?'nan':'nv'}`" style="color: #409eff;
        font-size: 22px;
        font-weight: 500;
        line-height: 24px;"></i>
    </div>
    <div>
      <span
        style="
          color: #555666;
          font-size: 14px;
          line-height: 16px;
          margin-top: 2px;
          white-space: nowrap;
          display: inline-block;
          width: 120px;
          height: 32px;
        "
      >
        <span
          style="
            color: #222226;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            margin-right: 4px;
          "
          >{{ userinfo.article }}</span
        >
        原创
      </span>
      <span
        style="
          color: #555666;
          font-size: 14px;
          line-height: 16px;
          margin-top: 2px;
          white-space: nowrap;
          display: inline-block;
          width: 120px;
          height: 32px;
        "
      >
        <span
          style="
            color: #222226;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            margin-right: 4px;
          "
          >{{ userinfo.follow }}</span
        >
        关注
      </span>
      <span
        style="
          color: #555666;
          font-size: 14px;
          line-height: 16px;
          margin-top: 2px;
          white-space: nowrap;
          display: inline-block;
          width: 120px;
          height: 32px;
        "
      >
        <span
          style="
            color: #222226;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            margin-right: 4px;
          "
          >{{ userinfo.fun }}</span
        >
        粉丝
      </span>
    </div>
    <div
      style="
        font-size: 14px;
        margin-bottom: 10px;
        color: #555666;
        text-align: justify;
        line-height: 22px;
        word-break: break-all;
      "
    >
      <span>年龄:</span>
      <span>{{ userinfo.age }}岁</span>
    </div>
    <div
      style="
        font-size: 14px;
        margin-bottom: 10px;
        color: #555666;
        text-align: justify;
        line-height: 22px;
        word-break: break-all;
      "
    >
      <span>职业:</span>
      <span>{{ userinfo.job }}</span>
    </div>
    <div
      v-if="isshowdetailinfo"
      style="
        font-size: 14px;
        margin-bottom: 10px;
        color: #555666;
        text-align: justify;
        line-height: 22px;
        word-break: break-all;
      "
    >
      <span>个人简介:</span>
      <span>{{ userinfo.personality }}</span>
    </div>
    <div
      v-if="isshowdetailinfo"
      style="
        font-size: 14px;
        margin-bottom: 10px;
        color: #555666;
        text-align: justify;
        line-height: 22px;
        word-break: break-all;
      "
    >
      <span>邮箱:</span>
      <span>{{ userinfo.email }}</span>
    </div>
    <div
      v-if="isshowdetailinfo"
      style="
        font-size: 14px;
        margin-bottom: 10px;
        color: #555666;
        text-align: justify;
        line-height: 22px;
        word-break: break-all;
      "
    >
      <span>注册时间:</span>
      <span>{{ new Date(userinfo.registerTime).toLocaleString() }}</span>
    </div>
    <div
      style="
        font-size: 14px;
        margin-bottom: 10px;
        color: #555666;
        text-align: justify;
        line-height: 22px;
        word-break: break-all;
      "
    >
      <span v-if="isshowdetailinfo" @click="isshowdetailinfo = false"
        >收起详细资料</span
      >
      <span v-else @click="isshowdetailinfo = true">展开详细资料</span>
    </div>
    <div
      style="
        position: absolute;
        top: -12px;
        left: 12px;
        width: 102px;
        height: 102px;
        border: 4px solid #f0f0f2;
        border-radius: 50%;
        background: #fff;
        overflow: hidden;
      "
    >
      <img
        :src="imageUrl"
        style="width: 100%; height: 100%"
        alt=""
      />
    </div>
    <div style="position: absolute; right: 30px; top: 30px">
      <ac-button v-if="!authorObj.author" round @click="isedituserinfo = true"> 编辑资料 </ac-button>
      <ac-button v-if="!authorObj.author" round @click="saveCenterPage"> 安全中心 </ac-button>
    </div>
  </template>
  <template v-else>
    <div class="user-info">
      <div class="userinfo-item">
        <span class="label">用户名：</span>
        <span style="display: inline-block; width: 180px">
          <AcInput v-model="userinfoModify.username"></AcInput>
        </span>
      </div>
      <div class="userinfo-item">
        <span class="label">年龄：</span>
        <span style="display: inline-block; width: 180px">
          <AcInput v-model="userinfoModify.age"></AcInput>
        </span>
      </div>
      <div class="userinfo-item">
        <span class="label">性别：</span>
        <span style="display: inline-block; width: 180px">
          <ac-radio label="男" v-model="userinfoModify.sex"></ac-radio>
          <ac-radio label="女" v-model="userinfoModify.sex"></ac-radio>
        </span>
      </div>
      <div class="userinfo-item">
        <span class="label">职业：</span>
        <span style="display: inline-block; width: 180px">
          <AcInput v-model="userinfoModify.job"></AcInput>
        </span>
      </div>
      <div class="userinfo-item" style="height: 200px">
        <span class="label">个人简介：</span>
        <span style="display: inline-block; width: 500px">
          <!-- <AcInput v-model="userinfoModify.personality"></AcInput> -->
          <AcTextarea v-model="userinfoModify.personality"></AcTextarea>
        </span>
      </div>
      <div class="avatar">
        <AcUpload
          class="avatar-uploader"
          name="blogImage"
          :multiple="false"
          :disabled="false"
          :onSuccess="onSuccess"
          :onChange="onChange"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            style="width: 100%; height: 100%"
          />
          <i v-else class="ac-icon-jiazai avatar-uploader-icon"></i>
        </AcUpload>
      </div>
      <div class="modify">
        <ac-button round @click="isedituserinfo = false"> 取消 </ac-button>
        <ac-button round @click="modifyUserinfo"> 提交 </ac-button>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import AcTextarea from "../ac-textarea/index.vue";
import { defineComponent, ref } from "vue";
import {
  reqUserinfo,
  reqModifyUserinfo,
  reqModifyUsername,
  reqModifyAvatar,
} from "./req.js";
import { useUserinfoStore } from "../../store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MineHead",
  components: {
    AcTextarea,
  },
  props:{
    authorObj:{
      type:Object,
      default:{
        author:""
      }
    }
  },
  setup(props) {
    const router = useRouter()
    const useUserinfo = useUserinfoStore();
    const isshowdetailinfo = ref(false);
    // 存储用户信息
    const userinfo = ref({});
    // 是否是编辑信息
    const isedituserinfo = ref(false);
    // 暂存用户修改信息
    const userinfoModify = ref({
      username: "",
      age: "",
      sex: "女",
      job: "",
      personality: "",
    });
    const getUserinfo = () => {
      if(props.authorObj.author){
        reqUserinfo({ username:props.authorObj.author  }, {}, userinfo).then(() => {
          imageUrl.value = userinfo.value.avatar+ '?' + new Date().getTime();
        });
        return
      }

      reqUserinfo({ username: useUserinfo.username }, {}, userinfo).then(() => {
        userinfoModify.value.age = userinfo.value.age;
        userinfoModify.value.username = userinfo.value.username;
        userinfoModify.value.sex = userinfo.value.sex;
        userinfoModify.value.job = userinfo.value.job;
        userinfoModify.value.personality = userinfo.value.personality;
        imageUrl.value = userinfo.value.avatar+ '?' + new Date().getTime();
      });
    };
    getUserinfo();
    const imageUrl = ref("");
    function onSuccess(filepath) {
      console.log("上传成功", filepath);
      imageUrl.value = filepath;
    }
    let imgData = new FormData();
    const modifyUserinfo = () => {
      //reqModifyUsername({ email:useUserinfo.getemail,oldname: userinfo.value.username }, { newName: userinfoModify.value.username }).then(() => {
      //    })

      reqModifyUserinfo(
        { email: useUserinfo.getemail },
        {
          age: userinfoModify.value.age,
          sex: userinfoModify.value.sex,
          job: userinfoModify.value.job,
          personality: userinfoModify.value.personality,
        }
      ).then(() => {
        if (imgData.has("avatar")) {
          reqModifyAvatar(
            { email: useUserinfo.getemail },
            imgData
          ).then(() => {
            isedituserinfo.value = false;
            getUserinfo();
            imgData.delete('avatar')
          });
        } else {
          isedituserinfo.value = false;
          getUserinfo();
        }
      });
    };
    const onChange = (file) => {
      imgData.append("avatar", file);
      let reader = new FileReader();
      reader.onload = (evt) => {
        // console.log(evt.target.result);
        imageUrl.value = evt.target.result;
      };
      reader.readAsDataURL(file);
    };
    function saveCenterPage(){
      router.push('/safecenter/index')
    }
    return {
      isshowdetailinfo,
      userinfo,
      isedituserinfo,
      userinfoModify,

      imageUrl,
      onSuccess,
      modifyUserinfo,
      onChange,
      saveCenterPage
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;

  .userinfo-item {
    height: 50px;
    display: flex;
    align-items: center;

    .label {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }

  .avatar {
    //height: 80px;
    width: 180px;
    position: absolute;
    right: 100px;
    top: 0px;
    margin-bottom: 20px;
  }

  .modify {
    position: absolute;
    right: 100px;
    bottom: 60px;

    /*.el-button {
            width: 150px;
            font-size: 20px;
        }*/
  }
}

.replace {
  display: block;
  font-size: 28px;
  color: #fff;
  padding: 10px 10px;
  border: 1px solid #fff;
  border-radius: 30px;
  margin-top: 20px;
}

.hiddenInput {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
}
</style>