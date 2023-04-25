import Message from "../../../packages/message/src/index";
import request from "../../utils/request.js";
// 博客上传图片
export function reqWriteUpImg(params, data) {
  return new Promise((resolve, reject) => {
    request({
      url: "/blog/uploadBlogImages",
      data,
      params,
      method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
    })
      .then((res) => {
        console.log("函数的成功",res);
        const { msg, retData } = res;
        Message({ text: msg, type: "success" });
        resolve(retData);
      })
      .catch((err) => {
        // console.log("函数的错误",err);
        const { code, msg } = err;
        if (code == "406") {
          Message({ text: msg, type: "warn" });
        } else {
          console.log("未知错误", err);
        }
      });
  });
}
// 博客封面图片
export function reqCoverImg(params, data) {
  return new Promise((resolve, reject) => {
    request({
      url: "/blog/uploadBlogCover",
      data,
      params,
      method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
    })
      .then((res) => {
        console.log("函数的成功",res);
        const { msg, retData } = res;
        Message({ text: msg, type: "success" });
        resolve(retData);
      })
      .catch((err) => {
        // console.log("函数的错误",err);
        const { code, msg } = err;
        if (code == "406") {
          Message({ text: msg, type: "warn" });
        } else {
          console.log("未知错误", err);
        }
      });
  });
}
// 博客上传
export function reqWriteUpBlog(params, data) {
  return new Promise((resolve, reject) => {
    request({
      url: "/blog/releaseBlog",
      params,
      data,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        // console.log("函数的成功", res);
        const { msg } = res;
        Message({ text: msg, type: "success" });
        resolve()
      })
      .catch((err) => {
        // console.log("函数的错误", err);
        const { code, msg } = err;
        Message({ text: msg, type: "warn" })
        // if (code == "406") {
        //   Message({ text: msg, type: "warn" });
        // } else {
        //   console.log("未知错误", err);
        // }
      });
  });
}
// 修改的时候获得文章的详情信息
export function reqBlogAndContent(params, data) {
  return new Promise((resolve, reject) => {
    request({
      url: "/blog/queryBlogAndContent",
      params,
      data,
      method: "get",
    })
      .then((res) => {
        console.log("函数的成功", res);
        resolve(res.retData);
      })
      .catch((err) => {
        console.log("函数的错误", err);
        const { code, msg } = err;
        if (code == "406") {
          Message({ text: msg, type: "warn" });
        } else {
          console.log("未知错误", err);
        }
      });
  });
}

// 更新博客
export function reqUpdateBlog(params, formData) {
  return new Promise((resolve, reject) => {
    request({
      url: "/blog/updateBlog",
      params,
      data:formData,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        // console.log("函数的成功", res);
        // Message({ text: res.msg, type: "success" });
        Message({ text: "博客更新成功", type: "success" });
      })
      .catch((err) => {
        console.log("函数的错误", err);
        const { code, msg } = err;
        if (code == "406") {
          Message({ text: msg, type: "warn" });
        } else {
          console.log("未知错误", err);
        }
      });
  });
}
