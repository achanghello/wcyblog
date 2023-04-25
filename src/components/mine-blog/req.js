import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
// 个人中心博客显示
export function reqShowBlogs (params,data,bloglist,loading) {
    // loading.value = true
    // console.log("先打印一下实例",request);
    return new Promise((resolve, reject) => {
        request({
            url: '/user/showUserBlogs',
            method: 'get',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            bloglist.value.push(...res.retData)
            // total.value = res.total
            loading.value = false
            if(res.retData.length===0){
                resolve(true)
            }else{
                resolve(false)
            }
        }).catch((err)=>{
            console.log("函数的错误",err);
            loading.value = false
        })
    })
}

export function reqDeletaMyBlog (params,data) {
    console.log("打印一下参数",params);
    return new Promise((resolve, reject) => {
        request({
            url: '/user/deleteBlog',
            method: 'get',
            params,
            data
        }).then((res)=>{
            console.log("函数的成功",res);
            const { msg } = res
            Message({ text: msg, type: 'success' })
            resolve()
        }).catch((err)=>{
            Message({ text: err.msg, type: 'warn' })
        })
    })
}