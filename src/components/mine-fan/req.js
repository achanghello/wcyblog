import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 个人中心博客显示
export function reqFanlist (params,data,fanlist) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/showUserFans',
            method: 'get',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功f粉丝",res);
            fanlist.value.push(...res.retData)
        }).catch((err)=>{
            console.log("函数的错误粉丝",err);
        })
    })
}
