import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 发表评论
export function reqPublicComment (params,data) {
    // console.log("这样啊");
    return new Promise((resolve, reject) => {
        request({
            url: '/comment/publishComment',
            method: 'post',
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
// 发表回复
export function reqPublicReply (params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/reply/publishReply',
            method: 'post',
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            Message({ text: res.msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("函数的错误",err);
            Message({ text: err.msg, type: 'warn' })
        })
    })
}
