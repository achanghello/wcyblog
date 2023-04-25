import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 个人中心评论显示
export function reqUserReply (params,data,list) {
    return new Promise((resolve, reject) => {
        request({
            url: '/reply/showUserReplies',
            method: 'get',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            list.value=res.retData
        }).catch((err)=>{
            console.log("函数的错误",err);
        })
    })
}

export function reqUserReplyReceive (params,data,list) {
    return new Promise((resolve, reject) => {
        request({
            url: '/reply/showRepliesReceived',
            method: 'get',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            list.value=res.retData
        }).catch((err)=>{
            console.log("函数的错误",err);
        })
    })
}