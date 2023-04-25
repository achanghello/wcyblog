<template>
  <div class="login">
    <div :class="`login-left login-left-img_bg${Math.abs(currentimg%3)}`">
      <div class="logo" @click="homePage">
        <!-- <a href="index.html" title="武昌鱼博客">WCY</a> -->
      </div>
      <div class="arrow">
        <div class="left-arrow" @click="currentimg--">{{ "<" }}</div>
        <div class="right-arrow" @click="currentimg++">></div>
      </div>
    </div>
    <div class="login-right">
      <div class="reg_header_right">
        <a href="#">切换无障碍</a>
        <a href="#" target="_blank">
          <img
            src="http://img61.ddimg.cn/upload_img/00862/web/icon-1-1628495800.png"
          />
          <span>“登录页面“改进建议</span>
        </a>
      </div>
      <div class="reg_content_right">
        <div class="loginK">
          <div class="switch_up"></div>
          <div class="login_title">
            <div
              class="login_title_left"
              :class="passlogin ? 'active' : ''"
              @click="passlogin = true"
            >
              密码登录
            </div>
            <div
              class="login_title_right"
              :class="passlogin ? '' : 'active'"
              @click="passlogin = false"
            >
              验证码登录
            </div>
          </div>
          <form>
            <div class="form-item form-item-1">
              <input
                v-model="loginForm.email"
                type="text"
                autofocus="autofocus"
                @blur="validationEmail"
              />
              <label :class="{ 'label-up': loginForm.email != '' }">邮箱</label>
              <label
                style="
                  position: absolute;
                  left: 0px;
                  top: 53px;
                  font-size: 13px;
                  color: red;
                "
                >{{ validation.email }}</label
              >
            </div>
            <div class="form-item form-item-2" v-if="passlogin">
              <input
                v-model="loginForm.password"
                type="password"
                @blur="validationPassword"
              />
              <label :class="{ 'label-up': loginForm.password != '' }"
                >密码</label
              >
              <label
                style="
                  position: absolute;
                  left: 0px;
                  top: 53px;
                  font-size: 13px;
                  color: red;
                "
                >{{ validation.password }}</label
              >
            </div>
            <div class="form-item-register form-item-4" v-else>
              <input
                type="text"
                placeholder="请输入验证码"
                v-model="loginForm.code"
                @blur="validationCode"
              />
              <button
                type="button"
                @click="getCode"
                :disabled="vm.countDown > 1"
              >
                {{ vm.countDown > 1 ? vm.countDown : "获取验证码" }}
              </button>
              <span>{{ this.validation.code }}</span>
            </div>
            <div class="agreement">
              登录即同意
              <a
                target="_blank"
                href="#"
                >用户协议、</a
              >
              <a
                target="_blank"
                href="#"
                >隐私政策</a
              >
            </div>
            <div class="form-item-3">
              <button type="button" @click="login" v-if="passlogin">
                登录
              </button>
              <button type="button" @click="loginbycode" v-else>登录</button>
            </div>
            <div class="agreement" @click="registerPage">
              <a target="_blank" @click.prevent>立即注册</a>
              <span>|</span>
              <a
                target="_blank"
                href="#"
                @click.prevent
                >忘记密码</a
              >
            </div>
          </form>
        </div>
        <div class="login_bottom">
          <a href="#">
            <img
              src="https://img60.ddimg.cn/upload_img/00862/web/alipay-1628496855.png"
              alt="支付宝"
            />
          </a>
          <a href="#">
            <img
              src="https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"
              alt="微信"
            />
          </a>
          <a href="#">
            <img
              src="https://img61.ddimg.cn/upload_img/00862/web/qq-1628496796.png"
              alt="QQ"
            />
          </a>
          <a href="#">
            <img
              src="https://img63.ddimg.cn/upload_img/00862/web/weibo-1628496903.png"
              alt="微博"
            />
          </a>
          <a href="#">
            <img
              src="https://img63.ddimg.cn/upload_img/00873/web/baidu-1628496931.png"
              alt="百度"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref } from "vue";
import { useUserinfoStore } from "../../store/index.js";
import { useRouter } from "vue-router";
import { reqLoginSendCode, reqRegister } from "./req.js";
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    function homePage(){
      router.push("/")
    }
    function registerPage(){
      router.push("/register")
    }
    const currentimg = ref(1)
    // 进入用户的状态管理库，因为登录函数在里面
    const useUserinfo = useUserinfoStore();
    // 填写页面的表单信息
    const loginForm = reactive({ password: "", email: "", code: "" });
    const validation = reactive({ password: "", email: "", code: "" });
    // 验证函数
    function validationEmail() {
      if (loginForm.email === "") {
        validation.email = "邮箱不能为空";
        return false;
      } else {
        validation.email = "";
        return true;
      }
    }
    function validationPassword() {
      if (loginForm.password === "") {
        validation.password = "密码长度不能为空";
        return false;
      } else if (
        loginForm.password.length < 8 ||
        loginForm.password.length > 20
      ) {
        validation.password = "密码长度仅能为2-20";
        return false;
      } else {
        validation.password = "";
        return true;
      }
    }
    function validationCode() {
      if (loginForm.code === "") {
        validation.code = "验证码不能为空";
        return false;
      } else {
        validation.code = "";
        return true;
      }
    }
    function login() {
      if (validationPassword() && validationEmail()) {
        // console.log("调用登录函数")
        // console.log("用户输入的信息",loginForm)
        useUserinfo
          .login({}, { email: loginForm.email, pwd: loginForm.password })
          .then(() => {
            console.log(router);

            router.push("/home");
          });
      } else {
        console.log("没有通过数据校验");
      }
    }
    function loginbycode() {
      if (validationEmail() && validationCode()) {
        // console.log("调用登录函数")
        // console.log("用户输入的信息",loginForm)
        useUserinfo
          .loginbycode(
            {},
            { email: loginForm.email, emailCode: loginForm.code }
          )
          .then(() => {
            console.log(router);

            router.push("/home");
          });
      } else {
        console.log("没有通过数据校验");
      }
    }

    // 登陆类型
    const passlogin = ref(true);
    const vm = reactive({ countDown: 0 });
    function getCode() {
      if (validationEmail()) {
        reqLoginSendCode({}, { email: loginForm.email }, vm);
      }
    }
    return {
      homePage,
      registerPage,
      currentimg,
      loginForm,
      validation,
      validationEmail,
      validationPassword,
      validationCode,
      login,

      passlogin,
      vm,
      getCode,
      loginbycode,
    };
  },
};
</script>
<style lang="scss" scoped>
.login {
  margin: 0px;
  padding: 0px;
  width: 100%;
  min-width: 1100px;
  height: 100%;
  box-sizing: border-box;
  display: flex;

  .login-left {
    width: 61%;
    height: 100%;
    position: relative;

    .logo {
      position: absolute;
      width: 321px;
      height: 90px;
      left: 180px;
      background: url(./images/logo.png);
      background-size: 100% 100%;
      top: 30px;
      a {
        font-size: 40px;
        text-transform: uppercase;
        color: #000;
        font-family: "Playfair Display", Georgia, serif;
        font-weight: 700;
        letter-spacing: 10px;
        text-decoration: none;
      }
    }

    .arrow {
      position: absolute;
      right: 50px;
      bottom: 0px;
      width: 180px;
      height: 60px;
      display: flex;
      justify-content: space-between;
      .left-arrow {
        width: 89px;
        height: 60px;
        background-color: #fff;
        text-align: center;
        line-height: 60px;
      }
      .right-arrow {
        width: 89px;
        height: 60px;
        background-color: #fff;
        text-align: center;
        line-height: 60px;
      }
      .left-arrow:hover {
        background-color: #f9ce00;
      }
      .right-arrow:hover {
        background-color: #f9ce00;
      }
    }
  }

  .login-left-img_bg1 {
    background: url(./images/img_bg_1.jpg) no-repeat;
    background-size: auto 100%;
    background-position: -230px;
    transition: background 1s;
  }
  .login-left-img_bg2 {
    background: url(./images/img_bg_2.jpg) no-repeat;
    background-size: auto 100%;
    background-position: -120px;
    transition: background 1s;
  }
  .login-left-img_bg0 {
    background: url(./images/img_bg_0.jpg) no-repeat;
    background-size: auto 100%;
    background-position: -120px;
    transition: background 1s;
  }

  .login-right {
    width: 39%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    // 右边头部
    .reg_header_right {
      width: 160px;
      height: 46.625px;
      text-align: right;
      position: absolute;
      right: 18%;
      top: 40px;

      a {
        display: flex;
        font-size: 14px;
        color: #333;
        text-decoration: none;
        justify-content: right;

        span {
          display: inline-block;
          width: 140px;
          height: 21px;
        }

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    // 右边身体
    .reg_content_right {
      width: 420px;
      height: 470px;
      box-shadow: 0 6px 20px 0 rgb(37 43 50 / 7%);
      border-radius: 16px;
      // padding: 0 40px 0 40px;
      margin-bottom: 80px;
      background-color: #e6e6e6;

      .loginK {
        width: 340px;
        height: 406px;
        margin: 0 auto;

        .switch_up {
          width: 100%;
          height: 40px;
        }

        .login_title {
          width: 340px;
          height: 17px;

          .login_title_left {
            width: 49%;
            height: 100%;
            display: inline-block;
            border-right: 2px solid #717171;
            box-sizing: content-box;
            font-size: 18px;
            line-height: 17px;
            text-align: center;
            color: #717171;
          }
          .login_title_right {
            width: 49%;
            height: 100%;
            display: inline-block;
            font-size: 18px;
            color: #717171;
            line-height: 17px;
            text-align: center;
          }
          .active {
            font-weight: 700;
            color: #333;
          }
        }

        form {
          width: 100%;

          .form-item {
            margin-top: 38px;
            height: 52px;
            border-radius: 4px;
            padding: 0 16px;
            width: 100%;
            background: #f9f9f9;
            position: relative;
            box-sizing: border-box;

            input {
              display: block;
              font-size: 20px;
              width: 100%;
              border: none;
              outline: none;
              padding-top: 20px;
              background: #f9f9f9;
            }

            //input:focus ~ label {
            //    color: red;
            // }
          }
          .form-item-register {
            margin-top: 38px;
            border-radius: 4px;
            // padding: 0 16px;
            width: 100%;
            height: 52px;
            line-height: 52px;
            margin-bottom: 32px;
            display: flex;
            position: relative;
            box-sizing: border-box;
          }

          .form-item-1 {
            label {
              font-size: 20px;
              position: absolute;
              color: #717171;
              top: 12px;
              pointer-events: none;
            }
            input:focus + label {
              font-size: 12px;
              position: absolute;
              color: #717171;
              top: 3px;
              left: 20px;
            }
            .label-up {
              font-size: 12px;
              position: absolute;
              color: #717171;
              top: 3px;
              left: 20px;
            }
          }

          .form-item-2 {
            label {
              font-size: 20px;
              position: absolute;
              color: #717171;
              top: 12px;
              pointer-events: none;
            }
            input:focus + label {
              font-size: 12px;
              position: absolute;
              color: #717171;
              top: 3px;
              left: 20px;
            }
            .label-up {
              font-size: 12px;
              position: absolute;
              color: #717171;
              top: 3px;
              left: 20px;
            }
          }

          .agreement {
            font-size: 13px;
            color: #908e8f;
            text-align: center;
            line-height: 13px;
            margin-top: 20px;

            a {
              color: #151515;
              text-decoration: none;
            }
            span {
              margin: 0 15px;
            }
          }

          .form-item-3 {
            margin-top: 38px;
            width: 100%;

            button {
              width: 100%;
              height: 52px;
              border-radius: 4px;
              font-size: 18px;
              color: #fff;
              background-image: linear-gradient(90deg, #c99748, #cf840c);
              // background: #d39f4b;
              box-shadow: 0 3px 8px 1px rgba(29, 20, 5, 0.22);
              outline: none;
              border: none;
              &:hover {
                background-image: linear-gradient(90deg, #cc943a, #ae6f09);
              }
            }
          }
          .form-item-4 {
            input {
              display: block;
              font-size: 20px;
              height: 52px;
              width: 194px;
              padding: 13px 11px;
              border: 1px solid #e6e6e6;
              box-sizing: border-box;
              outline: none;
            }

            button {
              margin-left: 10px;
              width: 118px;
              height: 100%;
              // background: #f5f5f5;
              background-image: linear-gradient(90deg, #c99748, #cf840c);
              font-weight: bold;
              border: 1px solid #e6e6e6;
              border-radius: 3px;
            }

            span {
              line-height: 14px;
              position: absolute;
              left: 0px;
              top: 53px;
              font-size: 13px;
              color: red;
            }
          }
        }
      }

      .login_bottom {
        width: 100%;
        height: 64px;
        display: flex;
        justify-content: space-around;
        a {
          display: inline-block;
          width: 60px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
}
</style>