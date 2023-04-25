import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";
import { useUserinfoStore } from '../store/index.js'
import tab from "../views/tab.vue"
import test from "../views/test.vue"
import layout from "../layout/index.vue"
import home from "../views/home/index.vue"
import detail from "../views/detail/index.vue"
import search from "../views/search/index.vue"
import write from "../views/write/index.vue"
import mine from "../views/mine/index.vue"
import safecenter from "../views/safecenter/index.vue"
import Register from "../views/register/index.vue"
import Login from "../views/login/index.vue"
import Message from "../../packages/message/src/index";
// const routes = [import Message from "../../../packages/message/src/index";
//     {
//         path:'/',
//         name:"Tab",
//         component:tab
//     }
// ]
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component:Login,
        meta: { hidden: true }
    },
    {
        path: '/register',
        component:Register,
        meta: { hidden: true }
    },
    {
        path: '/',
        component:layout,
        redirect: '/home',
        children: [
          {
            path: 'home',
            component: home,
            meta: { title: '主页' }
          }
        ]
    },
      {
        path: '/search',
        component: layout,
        children: [
          {
            path: 'index',
            component: search,
            meta: { title: '搜索' }
          }
        ]
      },
      {
        path: '/detail',
        component: layout,
        meta: { hidden: true },
        children: [
          {
            path: 'index',
            component: detail,
            meta: { title: '详情' }
          }
        ]
      },
      {
        path: '/write',
        component: layout,
        children: [
          {
            path: 'index',
            component: write,
            meta: { title: '写文章' }
          }
        ]
      },
      {
        path: '/mine',
        component: layout,
        children: [
          {
            path: 'index',
            component: mine,
            meta: { title: '个人详情' }
          }
        ]
      },
      {
        path: '/safecenter',
        component: layout,
        children: [
          {
            path: 'index',
            component: safecenter,
            meta: { title: '安全中心' }
          }
        ]
      }
]


let router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})

router.beforeEach((to, from, next) => {
  const useUserinfo = useUserinfoStore()
  console.log(to,"我是路由守卫",useUserinfo);
  if(to.path==='/home'||to.path==='/login'||to.path==='/register'||to.path==="/search/index"){
    next()
    return
  }
  if(useUserinfo.getemail){
    next()
  }else{
    Message({ text: "请先登录，获得更多权限", type: "warn" });
  }
})

export default router