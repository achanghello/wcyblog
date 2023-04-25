import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 个人中心博客显示
export function reqCollectionOrSuki (params,data,list) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/userLikeOrCollectionBlogs',
            method: 'get',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            list.value.push(...res.retData)
        }).catch((err)=>{
            console.log("函数的错误",err);
        })
    })
}
