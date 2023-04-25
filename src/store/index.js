import { defineStore } from "pinia";
import request from "../utils/request.js";
import Message from "../../packages/message/src/index";
export const useUserinfoStore = defineStore("userinfo", {
  state: () => {
    console.log("判断有没有token,有token的话啊给username email复制");
    const userinfo = localStorage.getItem("userinfo");
    if (userinfo) {
      return {
        username: JSON.parse(userinfo).username,
        email: JSON.parse(userinfo).email,
      };
    } else {
      return {
        username: "",
        email: "",
      };
    }
  },
  getters: {
    getemail: (state) => state.email,
  },
  actions: {
    login(params, data) {
      return new Promise((resolve, reject) => {
        request({
          url: "/user/login-ep",
          method: "post",
          data,
        })
          .then((res) => {
            console.log("函数的成功", res);
            const { msg, retData } = res;
            this.email = data.email;
            this.username = retData;
            // console.log("1111",this);
            localStorage.setItem(
              "userinfo",
              JSON.stringify({ email: data.email, username: retData })
            );
            Message({ text: msg, type: "success" });
            resolve();
          })
          .catch((err) => {
            // console.log("函数的错误", err);
            const { code, msg } = err;
            if (code == "406") {
              Message({ text: msg, type: "warn" });
            } else {
              console.log("未知错误", err);
            }
            // reject(err)
          });
      });
    },
    loginbycode(params, data) {
      return new Promise((resolve, reject) => {
        request({
          url: "/user/login-ec",
          method: "post",
          data,
        })
          .then((res) => {
            console.log("函数的成功", res);
            const { msg, retData } = res;
            this.email = data.email;
            this.username = retData;
            // console.log("1111",this);
            localStorage.setItem(
              "userinfo",
              JSON.stringify({ email: data.email, username: retData })
            );
            Message({ text: msg, type: "success" });
            resolve();
          })
          .catch((err) => {
            // console.log("函数的错误", err);
            const { code, msg } = err;
            if (code == "406") {
              Message({ text: msg, type: "warn" });
            } else {
              console.log("未知错误", err);
            }
            // reject(err)
          });
      });
    },
    clear(params) {
      const userinfo = localStorage.getItem("userinfo");
      if (userinfo) {
        this.username = JSON.parse(userinfo).username
        this.email = JSON.parse(userinfo).email
      } else {
        this.username = ""
        this.email = ""
      }
    },
  },
});
