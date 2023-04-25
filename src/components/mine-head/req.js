import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 请求用户的信息
export function reqUserinfo (params,data,userinfo) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/getUserInfo',
            method: 'get',
            params,
            data
        }).then((res)=>{
            // console.log("函数的成功",res);
            userinfo.value = res.retData
            // const { msg } = res
            // Message({ text: msg, type: 'success' })
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
// 修改用户的信息
export function reqModifyUsername(params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/updateUsername',
            method: 'post',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            const { msg } = res
            Message({ text: msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("函数的错误",err);
            const { code,msg } =err
            if(code==204||code==406||code==401){
                Message({ text: msg, type: 'warn' })
            }else{
                Message({ text: '异常错误', type: 'warn' })
            }
        })
    })
}
export function reqModifyAvatar(params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/updateUserAvatar',
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
            if(code==204||code==406||code==401){
                Message({ text: msg, type: 'warn' })
            }else{
                Message({ text: '异常错误', type: 'warn' })
            }
        })
    })
}
export function reqModifyUserinfo(params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/updateUserInfo',
            method: 'post',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            const { msg } = res
            Message({ text: msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("函数的错误",err);
            const { code,msg } =err
            if(code==204||code==406||code==401){
                Message({ text: msg, type: 'warn' })
            }else{
                Message({ text: '异常错误', type: 'warn' })
            }
        })
    })
}
