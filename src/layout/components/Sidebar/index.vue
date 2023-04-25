

<template>
  <div class="header">
    <div class="header-left">
      <img src="./images/logo.png" alt="logo" width="200" @click="homePage" />
    </div>
    <div class="navbar-collapse">
      <AcTabs v-model="activeName" type="title">
        <AcTabPane v-for="item in routes" :key="item.fullpath" :label="item.children[0].meta.title" :name="item.fullpath">
        </AcTabPane>
      </AcTabs>
    </div>
    <div class="header-right">
      <AcButton v-if="useUserinfo.getemail" type="primary" plain icon="ac-icon-logout" @click="logout">退出登录</AcButton>
      <AcButton v-else type="primary" plain icon="ac-icon-denglu" @click="gologin">我去登录</AcButton>
    </div>
  </div>
</template>
 
<script lang="ts">
import path from "path";
import { computed, defineComponent, h, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserinfoStore } from "../../../store";
export default defineComponent({
  setup() {
    const useUserinfo = useUserinfoStore()
    const route = useRoute()
    const router = useRouter()
    function homePage(){
      router.push("/")
    }
    console.log("打印一下route", route);
    console.log("混上", router);
    let arr = reactive([
      {
        label: "首页",
        name: "home",
      },
      {
        label: "文章搜索",
        name: "search",
      },
      {
        label: "写文章",
        name: "write",
      },
      {
        label: "个人主页",
        name: "mine",
      },
      {
        label: "安全中心",
        name: "safecenter",
      }
    ])
    // let activeName = ref('/home')
    let activeName = computed({
      get: () => route.path,
      set: (val) => {
        router.push(val)
      }
    })

    // 过滤一下那啥
    let routes = computed(() => {
      let routearr = [...router.options.routes].filter(item => !(item.meta && item.meta.hidden))
      return routearr.map((item) => {
        item.fullpath = resolvePath(item.path, item)
        return item
      })
    })
    function resolvePath(basePath, route) {
      if (route.children) {
        return path.resolve(basePath, route.children[0].path)
      } else {
        ''
      }
    }
    // 退出
    function logout(){
      document.cookie = "";
      localStorage.clear();
      router.push("/home");
      useUserinfo.clear()
    }
    function gologin(){
      router.push('/login')
    }
    return {
      homePage,
      activeName,
      arr,
      routes,
      logout,
      useUserinfo,
      gologin
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  width: 80%;
  min-width: 1000px;
  max-width: 1200px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: left;
  align-items: center;

  .header-left {
    flex: 2;

    // height: 100%;
    img {
      // width: 200px;
      // height: 100%;
    }
  }

  .navbar-collapse {
    flex: 3;
    min-width: 500px;
  }

  .header-right {
    flex: 2;

    .ac-button {
      float: right;
    }
  }
}

.infinite-list {
  height: 100%;
  width: 100%;
  border: 1px solid red;

  li {
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
    text-align: center;
    line-height: 50px;
  }

  .text {
    color: green;
    text-align: center;
    line-height: 50px;
  }
}
</style>