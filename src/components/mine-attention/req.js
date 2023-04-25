import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 个人中心博客显示
export function reqAttentionlist (params,data,attentionlist) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/showUserFollowers',
            method: 'get',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功77777777777777777",res);
            attentionlist.value.push(...res.retData)
        }).catch((err)=>{
            console.log("函数的错误77777777777777777",err);

        })
    })
}
