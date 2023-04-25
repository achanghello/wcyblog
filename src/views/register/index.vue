<template>
  <div class="register">
    <!-- 注册公用头部 -->
    <div class="reg_header">
      <a class="logo_bg" @click.prevent="homePage" title="文轩网,新华书店"></a>
    </div>
    <!-- 注册表单 -->
    <div class="register">
      <div class="wx-row">
        <div class="reg_content">
          <div class="title">注册</div>
          <div class="process">
            <div class="process-1">邮箱验证</div>
            <div class="process-1">设置登录密码</div>
            <div class="process-2">结果</div>
          </div>
          <form v-if="step === 0">
            <div class="form-item form-item-1">
              <div class="test">邮箱注册:</div>
              <input type="text" placeholder="请输入邮箱" @blur="validationEmail" v-model="loginForm.email" />
              <span>{{ this.validation.email }}</span>
            </div>
            <div class="form-item form-item-1">
              <div class="test">用户名:</div>
              <input type="text" placeholder="请输入用户名" @blur="validationUsername" v-model="loginForm.username" />
              <span>{{ this.validation.username }}</span>
            </div>
            <div class="form-item form-item-3">
              <div class="test">邮箱验证:</div>
              <input type="text" placeholder="请输入验证码" v-model="loginForm.code" @blur="validationCode" />
              <button type="button" @click="getCode" :disabled="countDown > 1">
                {{ countDown > 1 ? countDown : "获取验证码" }}
              </button>
              <span>{{ this.validation.code }}</span>
            </div>
            <div class="form-item-4">
              <input type="checkbox" />
              <span>我已阅读并同意</span>
              <span>《武昌鱼用户协议》</span>
              <span>和</span>
              <span>《武昌鱼用户隐私政策》</span>
            </div>
            <div class="form-item form-item-5">
              <div class="test"></div>
              <button type="button" @click="afterStep">下一步</button>
            </div>
          </form>
          <form v-else-if="step === 1">
            <div class="form-item form-item-1">
              <div class="test">密码:</div>
              <input type="password" placeholder="请输入密码" @blur="validationPassword" v-model="loginForm.password" />
              <span>{{ this.validation.password }}</span>
            </div>
            <div class="form-item form-item-1">
              <div class="test">再输一遍:</div>
              <input type="password" placeholder="请再次输入密码" @blur="validationPasswordAgain"
                v-model="loginForm.passwordagain" />
              <span>{{ this.validation.passwordagain }}</span>
            </div>

            <div class="form-item form-item-5">
              <div class="test"></div>
              <button type="button" @click="submit">提交</button>
            </div>
          </form>
          <div v-else-if="step === 2" class="success">
            <svg t="1667810086056" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4164" width="128" height="128">
              <path
                d="M512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z m-71.318588-361.411765a29.334588 29.334588 0 0 0 20.48-8.252235L774.625882 349.364706a27.708235 27.708235 0 0 0 0-39.936 29.575529 29.575529 0 0 0-41.08047 0l-292.74353 284.912941L290.454588 448.150588a29.575529 29.575529 0 0 0-41.08047 0 27.708235 27.708235 0 0 0 0 39.996236l170.706823 166.128941a29.274353 29.274353 0 0 0 20.540235 8.252235z"
                fill="#33A954" p-id="4165"></path>
            </svg>
            <p>三秒后跳转到登录页面</p>
          </div>
          <div v-else-if="step === 3" class="success">
            <svg t="1667810475997" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="5257" width="128" height="128">
              <path
                d="M13.524272 512.036718a498.50467 498.50467 0 1 1 498.437049 498.437049A498.437048 498.437048 0 0 1 13.524272 512.036718z"
                fill="#FFF100" p-id="5258"></path>
              <path
                d="M40.572816 593.182351a556.253312 556.253312 0 0 1 636.114139-550.099768A498.437048 498.437048 0 0 0 56.260972 723.623956 555.441855 555.441855 0 0 1 40.572816 593.182351z"
                fill="#FFFFFF" p-id="5259"></path>
              <path
                d="M978.886815 430.891086a555.847584 555.847584 0 0 1-555.847584 555.847583 568.763263 568.763263 0 0 1-80.131312-5.680194 498.572291 498.572291 0 0 0 620.425983-680.541372 556.253312 556.253312 0 0 1 15.552913 130.373983z"
                fill="#F8B62D" p-id="5260"></path>
              <path
                d="M511.961321 1023.998039a511.961321 511.961321 0 1 1 459.28428-738.492878A13.524272 13.524272 0 0 1 946.699047 297.609384a484.912776 484.912776 0 1 0 36.718399 327.355006 13.524272 13.524272 0 1 1 26.304709 6.288787 510.000301 510.000301 0 0 1-497.760834 392.744862z"
                fill="#231815" p-id="5261"></path>
              <path
                d="M1010.46599 525.560991a13.524272 13.524272 0 0 1-13.524272-13.524273A486.873796 486.873796 0 0 0 989.300505 426.089969a13.524272 13.524272 0 0 1 26.642816-4.733495 514.39569 514.39569 0 0 1 8.046942 90.680244 13.524272 13.524272 0 0 1-13.524273 13.524273z"
                fill="#231815" p-id="5262"></path>
              <path
                d="M758.238316 693.53245L581.543701 517.040699l176.491751-176.491751a29.550535 29.550535 0 0 0 0-41.925243L730.310694 270.56084a29.685777 29.685777 0 0 0-41.925244 0L511.893699 447.052591 335.46957 270.56084a29.618156 29.618156 0 0 0-41.857623 0l-27.927621 27.86a29.685777 29.685777 0 0 0 0 41.925244l176.491751 176.491751-176.491751 176.491751a29.685777 29.685777 0 0 0 0 41.925244l27.927621 27.86a29.618156 29.618156 0 0 0 41.857623 0l176.491751-176.491751 176.559372 176.491751a29.618156 29.618156 0 0 0 41.857622 0l27.860001-27.86a29.550535 29.550535 0 0 0 0-41.72238z"
                fill="#FFFFFF" p-id="5263"></path>
              <path
                d="M709.415693 785.565122a43.074807 43.074807 0 0 1-30.497233-12.645195L511.961321 605.962788 344.868939 772.919927a43.074807 43.074807 0 0 1-60.859225 0l-27.86-27.927622a43.074807 43.074807 0 0 1 0-60.859224l166.889517-167.092382-166.889517-166.957139a43.074807 43.074807 0 0 1 0-60.859225L284.009714 261.229092a43.142428 43.142428 0 0 1 60.859225 0L511.961321 428.11861l166.957139-166.889518a43.142428 43.142428 0 0 1 60.859224 0l27.927622 27.860001a43.074807 43.074807 0 0 1 0 60.859224L600.88341 517.040699l166.957139 166.957139a43.142428 43.142428 0 0 1 0 60.859225l-27.927622 27.927622a42.871943 42.871943 0 0 1-30.497234 12.780437z m-197.454372-217.876024l186.093984 186.093984a16.431991 16.431991 0 0 0 22.720777 0l27.927622-27.927622a16.026262 16.026262 0 0 0 0-22.720777L562.60972 517.040699l186.093984-186.026363a16.093884 16.093884 0 0 0 0-22.788398l-27.860001-27.927622a16.161505 16.161505 0 0 0-22.788398 0L511.961321 466.662785 325.934958 280.298316a16.229127 16.229127 0 0 0-22.788399 0l-27.86 27.927622a15.755777 15.755777 0 0 0-4.733496 11.360388 16.026262 16.026262 0 0 0 4.665874 11.42801l186.093985 186.026363L275.218937 703.337547a16.161505 16.161505 0 0 0 0 22.720777l27.927622 27.927622a16.431991 16.431991 0 0 0 22.720777 0z"
                fill="#231815" p-id="5264"></path>
            </svg>
            <p>三秒后跳转到注册页面</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 注册公用底部 -->
    <div class="reg_footer">
      <div class="content">
        <p class="putOnrecords">
          川公网安备 51010602000457号 丨 出版物经营许可证 丨
          <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备11014037号</a>
          <br />
          © 2000-现在 Winxuan.com 版权所有 丨 客服热线：400-072-0808
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reqRegisterSendCode, reqRegister } from "./req.js";
import Message from "../../../packages/message/src/index";
export default {
  name: "Register",
  data() {
    return {
      step: 0,
      loginForm: {
        email: "",
        username: "",
        code: "",
        password: "",
        passwordagain: "",
      },
      validation: {
        email: "",
        username: "",
        code: "",
        password: "",
        passwordagain: "",
      },
      countDown: 0,
      timer: undefined,
    };
  },
  methods: {
    homePage(){
      this.$router.push({path:"/"})
    },
    getCode() {
      if (this.validationEmail()) {
        const { email } = this.loginForm;
        reqRegisterSendCode({},{ email },this)
      }
    },
    afterStep() {
      if (this.validationCode() & this.validationEmail() & this.validationUsername()) {
        this.step = 1
      }
    },
    submit() {
      if (this.validationPassword() & this.validationPasswordAgain()) {
        const { code, email, password, username } = this.loginForm
        reqRegister({},{ email, username, pwd: password, emailCode: code },this)
      }
    },
    validationEmail() {
      if (this.loginForm.email === "") {
        this.validation.email = "邮箱不能为空";
        return false;
      } else if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(
          this.loginForm.email
        )
      ) {
        this.validation.email = "邮箱格式不正确";
        return false;
      } else {
        this.validation.email = "";
        return true;
      }
    },
    validationUsername() {
      if (this.loginForm.username === "") {
        this.validation.username = "用户名不能为空";
        return false;
      } else if (
        this.loginForm.username.length < 3 || this.loginForm.username.length > 20
      ) {
        this.validation.username = "用户名的长度应该在3-20个字符之间";
        return false;
      } else {
        this.validation.username = "";
        return true;
      }
    },
    validationCode() {
      if (this.loginForm.code === "") {
        this.validation.code = "验证码不能为空";
        return false;
      } else {
        this.validation.code = "";
        return true;
      }
    },
    validationPassword() {
      if (this.loginForm.password === "") {
        this.validation.password = "密码不能为空";
        return false;
      } else if (
        this.loginForm.password.length < 8 || this.loginForm.password.length > 20
      ) {
        this.validation.password = "密码长度只能为8-20位";
        return false;
      } else {
        this.validation.password = "";
        return true;
      }
    },
    validationPasswordAgain() {
      if (this.loginForm.passwordagain !== this.loginForm.password) {
        this.validation.passwordagain = "两次输入的密码不一致";
        return false;
      } else {
        this.validation.passwordagain = "";
        return true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.register {
  margin: 0px;
  padding: 0px;
  width: 100%;
  //height: 100%;
  box-sizing: border-box;

  // background-color: #f2f2f2;
  background: #e6e6e6;
  background-size: 100% 130%;

  // 注册头部
  .reg_header {
    width: 1210px;
    height: 90px;
    margin: 0 auto;

    &::before {
      content: "";
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }

    .logo_bg {
      display: inline-block;
      vertical-align: middle;
      width: 321px;
      height: 90px;
      background: url(./images/logo.png);
      background-size: 100% 100%;
    }
  }

  // 注册表单
  .register {
    width: 100%;
    height: 662px;

    .wx-row {
      height: 100%;
      width: 1210px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255);
      box-shadow: 0 6px 20px 0 rgb(0 0 0 / 7%);
      border-radius: 5px;

      .reg_content {
        margin-top: 14px;
        width: 100%;
        height: 100%;

        .title {
          width: 100%;
          height: 83px;
          border-bottom: 1px solid #efefef;
          font-size: 20px;
          line-height: 83px;
          text-align: center;
        }

        .process {
          width: 700px;
          margin: 40px auto 80px;

          .process-1 {
            height: 21px;
            width: 230px;
            position: relative;
            text-align: center;
            display: inline-block;

            &::before {
              content: "";
              display: inline-block;
              width: 230px;
              height: 1px;
              background: #e8e8e8;
              position: absolute;
              bottom: -14px;
              left: 50%;
            }

            &::after {
              content: "";
              width: 8px;
              height: 8px;
              background: #e8e8e8;
              border-radius: 16px;
              position: absolute;
              bottom: -24px;
              left: 50%;
              transform: translateX(-50%);
              border: 8px solid #fff;
            }
          }

          .process-2 {
            height: 21px;
            width: 230px;
            position: relative;
            text-align: center;
            display: inline-block;

            &::after {
              content: "";
              width: 8px;
              height: 8px;
              background: #e8e8e8;
              border-radius: 16px;
              position: absolute;
              bottom: -24px;
              left: 50%;
              transform: translateX(-50%);
              border: 8px solid #fff;
            }
          }
        }

        form {
          width: 520px;
          margin: 0 auto;
          padding-right: 60px;

          // line-height: 42px;
          // color: #333;
          // font-size: 14px;
          .form-item {
            width: 100%;
            height: 42px;
            line-height: 42px;
            margin-bottom: 32px;
            display: flex;
            position: relative;
            box-sizing: border-box;

            .test {
              width: 100px;
              text-align: right;
              margin-right: 38px;
            }
          }

          .form-item-1 {
            input {
              height: 42px;
              width: 322px;
              padding: 13px 11px;
              border: 1px solid #e6e6e6;
              box-sizing: border-box;
            }

            span {
              position: absolute;
              top: 46px;
              font-size: 12px;
              left: 140px;
              line-height: 14px;
              color: #e50834;
            }
          }

          .form-item-3 {
            input {
              height: 42px;
              width: 194px;
              padding: 13px 11px;
              border: 1px solid #e6e6e6;
              box-sizing: border-box;
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
              position: absolute;
              top: 46px;
              font-size: 12px;
              left: 140px;
              line-height: 14px;
              color: #e50834;
            }
          }

          .form-item-4 {
            width: 100%;
            height: 48px;
            line-height: 48px;
            position: relative;
            box-sizing: border-box;
            font-size: 14px;

            input {
              margin-left: 30px;
              margin-right: 8px;
            }
          }

          .form-item-5 {
            button {
              height: 42px;
              width: 322px;
              padding: 13px 11px;
              border: 1px solid #e6e6e6;
              color: black;
              font-weight: bold;
              // background: #e5e5e5;
              background-image: linear-gradient(90deg, #c99748, #cf840c);
            }
          }
        }

        .success {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }

  // 注册底部
  .reg_footer {
    width: 100%;

    .content {
      padding: 94px 0 49px;
      text-align: center;
      color: #666;
      font-size: 13px;
      line-height: 25px;
      text-decoration: none;

      p>a {
        text-decoration: none;
        color: #212529;
      }
    }
  }
}</style>