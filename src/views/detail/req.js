import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 博客详情显示
// export function reqShowBlogContent (params,data,blogcontent,content) {
//     return new Promise((resolve, reject) => {
//         request({
//             url: '/blog/showBlogContent',
//             method: 'get',
//             params
//         }).then((res)=>{
//             // console.log("函数的成功",res);
//             blogcontent.value = res.retData
//             content.value.innerHTML = blogcontent.value
//             // console.log("元素",content);
//         }).catch((err)=>{
//             console.log("函数的错误",err);
            
//         })
//     })
// }
// 获得文章的详情信息
export function reqBlogAndContent(params, data) {
    return new Promise((resolve, reject) => {
      request({
        url: "/blog/queryBlogAndContent",
        params,
        data,
        method: "get",
      })
        .then((res) => {
          // console.log("函数的成功", res);
          resolve(res.retData);
        })
        .catch((err) => {
          console.log("函数的错误", err);
          const { code, msg } = err;
          if (code == "406") {
            Message({ text: msg, type: "warn" });
          } else {
            console.log("未知错误", err);
          }
        });
    });
  }
// 是否点赞
export function reqIsLike (params,data,sukistate) {
    // console.log("这样啊");
    return new Promise((resolve, reject) => {
        request({
            url: '/likeCollection/isLikeOrCollection',
            method: 'get',
            params
        }).then((res)=>{
            // console.log("函数的成功",res);
            sukistate.value = res.retData.cid
        }).catch((err)=>{
            console.log("函数的错误",err);
            
        })
    })
}
// 点赞
export function reqLike (params,data) {
    // console.log("点赞之前",params);
    return new Promise((resolve, reject) => {
        request({
            url: '/likeCollection/likeOrCollection',
            method: 'post',
            params,
            data
        }).then((res)=>{
            // console.log("函数的成功",res);
            const { msg } = res
            Message({ text: msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            // console.log("函数的错误",err);
            const { code,msg } =err
            if(code==204){
                Message({ text: msg, type: 'warn' })
            }else{
                Message({ text: '异常错误', type: 'warn' })
            }
        })
    })
}
// 取消点赞
export function reqCancelLike (params,data) {
    // console.log("取消点赞之前",params);
    return new Promise((resolve, reject) => {
        request({
            url: '/likeCollection/cancelLikeOrCollection',
            method: 'post',
            params,
            data
        }).then((res)=>{
            // console.log("函数的成功",res);
            const { msg } = res
            Message({ text: msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("函数的错误",err);
            const { code,msg } =err
            if(code==204){
                Message({ text: msg, type: 'warn' })
            }else{
                Message({ text: '异常错误', type: 'warn' })
            }
        })
    })
}
// 获取评论
export function reqBlogComment (params,data,commentlist) {
    return new Promise((resolve, reject) => {
        request({
            url: '/comment/showBlogComments',
            method: 'get',
            params
        }).then((res)=>{
            //console.log("函数的成功",res);
            commentlist.value = res.retData
        }).catch((err)=>{
            console.log("函数的错误",err);
            
        })
    })
}


// 发表评论
export function reqPublicComment (params,data) {
    // console.log("这样啊");
    return new Promise((resolve, reject) => {
        request({
            url: '/comment/publishComment',
            method: 'post',
            params,
            data
        }).then((res)=>{
            // console.log("函数的成功",res);
            Message({ text: res.msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("函数的错误",err);
            Message({ text: err.msg, type: 'warn' })
        })
    })
}