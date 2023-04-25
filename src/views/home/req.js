import request from '../../utils/request.js'

// 首页博客显示
export function reqShowBlogs (params,data,bloglist,loading) {
    loading.value = true
    // console.log("先打印一下实例",request);
    return new Promise((resolve, reject) => {
        request({
            url: '/blog/showBlogs',
            method: 'get',
            params
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