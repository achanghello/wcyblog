import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import router from "../router/router.ts"
import Message from "../../packages/message/src/index"
const service = axios.create({
  baseURL: "/wcy",
  // baseURL: 'http://123.249.125.223:8080/wcy',
  // baseURL: 'https://fastmock.site/mock/a6bf479aab19dd7f40fc10522cdead00/wcy', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 8000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // 设置token
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    // 进度条开始动
    // console.log("请求拦截器",config);
    nprogress.start();
    return config;
  },
  (error) => {
    // do something with request error
    console.log("请求拦截器错误", error); // for debug
    console.log("跳转到404页面");
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    // 进度条开结束
    nprogress.done();

    const res = response.data;
    //console.log("响应拦截器成功",res) // for debug
    // if the custom code is not 20000, it is judged as an error.
    // 如果不是2000就是错误
    if (res.code != "200") {
      // if (res.code == "401") {
      //   console.log("登录已经过期", res);
      //   return
      // }
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // console.log("进来了");
      return Promise.reject(res);
    } else {
      //console.log("没进来");
      return Promise.resolve(res);
    }
  },
  (error) => {
    // console.log("响应拦截器错误",error) // for debug
    // console.log("跳转到404页面");
    // console.log(error.response.data.code=="401");
    nprogress.done();
    if (error.response.data.code == "401") {
      Message({
        text: "身份已经过期了",
        type: "error"
      });
      router.push('/login')
    }
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error);
  }
);

export default service;
