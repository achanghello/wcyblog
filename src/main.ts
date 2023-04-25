import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.ts";
import { createPinia } from 'pinia';

import acui from "ac-ui";
// import acui from "../dist/index.esm.js"
import vInfiniteScroll from "../packages/v-infinite-scroll/src/index.js";
import vLazy from "../packages/v-lazy/src/v-lazy.js"
import "theme-chalk/index.scss"
//引入进度条样式
import "nprogress/nprogress.css";
createApp(App).use(acui).use(router).use(createPinia()).use(vInfiniteScroll).use(vLazy).mount("#app")