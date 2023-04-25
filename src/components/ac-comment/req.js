import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 是否点赞
export function reqIsLike (params,data,sukistate) {
    // console.log("这样啊");
    return new Promise((resolve, reject) => {
        request({
            url: '/likeCollection/isLikeOrCollection',
            method: 'get',
            params
        }).then((res)=>{
            // console.log("评论的点赞函数的成功",res);
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
// 删除评论
export function reqDeleteComment (params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/comment/deleteComment',
            method: 'get',
            params
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
// 举报评论
export function reqReportComment (params,data) {
    return new Promise((resolve, reject) => {
        console.log("参数",params);
        request({
            url: '/comment/reportComment',
            method: 'get',
            params
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
// 发表回复
export function reqPublicReply (params,data) {
    // console.log("发表回复",params,data);
    return new Promise((resolve, reject) => {
        request({
            url: '/reply/publishReply',
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