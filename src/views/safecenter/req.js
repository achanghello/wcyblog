import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 发送修改密码验证码
export function reqSendModifyEmailCode (params,data) {
    console.log("发送请求了没有啊");
    return new Promise((resolve, reject) => {
        request({
            url: '/user/sendModifyEmailCode',
            method: 'get',
            params,
            data
        }).then((res)=>{
            // console.log("发送修改密码验证码成功",res);
            Message({ text: res.msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("发送修改密码验证码错误",err);
            // Message({ text: err.msg, type: 'warn' })
            if(err.code=="204"){
                Message({ text: "邮箱不存在", type: 'warn' })
            }
        })
    })
}
// 修改密码
export function reqChangePwd (params,data) {
    return new Promise((resolve, reject) => {
        request({
            // /wcy/user/modifyPwd?email
            url: '/user/modifyPwd',
            method: 'post',
            params,
            data
        }).then((res)=>{
            console.log("修改密码成功",res);
            Message({ text: res.msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("发送修改密码验证码错误",err);
            // if(err.code=="204"){
            //     Message({ text: "邮箱不存在", type: 'warn' })
            // }
        })
    })
}
// 发送邮箱换绑验证码
export function reqSendChangeMailboxEmailCode (params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/sendChangeMailboxEmailCode',
            method: 'get',
            params,
            data
        }).then((res)=>{
            // console.log("发送修改密码验证码成功",res);
            Message({ text: res.msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            // console.log("发送修改密码验证码错误",err);
            Message({ text: err.msg, type: 'warn' })
        })
    })
}
// 邮箱
export function reqChangeEmailSelf (params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/changeEmailSelf',
            method: 'post',
            params,
            data
        }).then((res)=>{
            console.log("修改邮箱成功",res);
            Message({ text: res.msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("修改邮箱错误",err);
            Message({ text: err.msg, type: 'warn' })
        })
    })
}
// 发送注销验证码
export function reqSendLogoffEmailCode (params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/sendLogoffEmailCode',
            method: 'get',
            params,
            data
        }).then((res)=>{
            // console.log("发送修改密码验证码成功",res);
            Message({ text: res.msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            // console.log("发送修改密码验证码错误",err);
            Message({ text: err.msg, type: 'warn' })
        })
    })
}
// 注销
export function reqUserLogoff (params,data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/userLogoff',
            method: 'post',
            params,
            data
        }).then((res)=>{
            console.log("注销申请成功",res);
            Message({ text: "注销申请发送成功，当前账号已退出登录，您有10天的缓冲期", type: 'success' })
            resolve()
        }).catch((err)=>{
            console.log("注销错误",err);
            Message({ text: err.msg, type: 'warn' })
        })
    })
}