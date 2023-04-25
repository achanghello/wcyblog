import request from '../../utils/request.js'


// 获取评论
export function reqCommentReply (params,data,relylist,isshowreply) {
    return new Promise((resolve, reject) => {
        request({
            url: '/reply/showCommentReplies',
            method: 'get',
            params
        }).then((res)=>{
            // console.log("函数的成功",res);
            relylist.value = res.retData
            isshowreply.value = true
        }).catch((err)=>{
            console.log("函数的错误",err);
        })
    })
}