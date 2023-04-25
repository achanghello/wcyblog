<template>
  <div class="infinite-list" style="overflow: auto">
    <AcCard shadow="hover" class="box-card">
      <img
        style="display: block; margin: 0 auto"
        src="./images/safe.png"
        alt=""
      />
      <div
        style="
          display: block;
          width: 80px;
          height: 30px;
          background: #409eff;
          border-radius: 15px;
          margin: 0 auto;
          text-align: center;
          color: aliceblue;
          line-height: 30px;
        "
      >
        安全中心
      </div>
    </AcCard>
    <AcCard shadow="hover" class="box-card" v-if="type===0">
      <h3>账号设置</h3>
      <div
        style="
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f0f0f2;
          height: 80px;
          align-items: center;
        "
      >
        <div>密码</div>
        <div>
          <span>存在风险，请修改密码</span>
          <span style="margin-left: 20px; color: orange; cursor: pointer" @click="type=1"
            >修改密码</span
          >
        </div>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f0f0f2;
          height: 80px;
          align-items: center;
        "
      >
        <div>邮箱</div>
        <div>
          <span>存在风险，请修改邮箱</span>
          <span style="margin-left: 20px; color: orange; cursor: pointer" @click="type=2"
            >修改邮箱</span
          >
        </div>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f0f0f2;
          height: 80px;
          align-items: center;
        "
      >
        <div>账号注销</div>
        <div>
          <span></span>
          <span style="margin-left: 20px; color: orange; cursor: pointer" @click="type=3"
            >立即注销</span
          >
        </div>
      </div>
    </AcCard>
    <AcCard shadow="hover" class="box-card" v-if="type===1">
      <ac-form ref="form" :model="loginForm" :rules="rules" labelWidth="150px">
        <ac-form-item label="邮箱">
          {{ useUserinfo.getemail }}
          <AcButton @click="sendcode" :disabled="codedownnumber > 0">{{
            codedownnumber > 0 ? codedownnumber : "获取验证码"
          }}</AcButton>
        </ac-form-item>
        <ac-form-item label="输入验证码" prop="code">
          <div style="width: 300px">
            <ac-input
              placeholder="请输入验证码"
              name="code"
              v-model="loginForm.code"
            ></ac-input>
          </div>
        </ac-form-item>
        <ac-form-item label="输入新密码" prop="newpass">
          <div style="width: 300px">
            <ac-input
              placeholder="请输入新密码"
              name="newpass"
              v-model="loginForm.newpass"
            ></ac-input>
          </div>
        </ac-form-item>
        <ac-form-item label="确认新密码" prop="newpass2">
          <div style="width: 300px">
            <ac-input
              placeholder="请输入确认新密码"
              name="newpass2"
              v-model="loginForm.newpass2"
            ></ac-input>
          </div>
        </ac-form-item>
        <ac-form-item label="&nbsp">
          <AcButton @click="submit">提交</AcButton>
        </ac-form-item>
      </ac-form>
    </AcCard>
    <AcCard shadow="hover" class="box-card" v-if="type===2">
      <ac-form ref="form2" :model="loginForm2" :rules="rules2" labelWidth="150px">
        <ac-form-item label="邮箱">
          {{ useUserinfo.getemail }}
          <AcButton @click="sendcode2" :disabled="codedownnumber > 0">{{
            codedownnumber > 0 ? codedownnumber : "获取验证码"
          }}</AcButton>
        </ac-form-item>
        <ac-form-item label="输入验证码" prop="code">
          <div style="width: 300px">
            <ac-input
              placeholder="请输入验证码"
              name="code"
              v-model="loginForm2.code"
            ></ac-input>
          </div>
        </ac-form-item>
        <ac-form-item label="输入新邮箱" prop="newemail">
          <div style="width: 300px">
            <ac-input
              placeholder="请输入新邮箱"
              name="newemail"
              v-model="loginForm2.newemail"
            ></ac-input>
          </div>
        </ac-form-item>
        <ac-form-item label="&nbsp">
          <AcButton @click="submit2">提交</AcButton>
        </ac-form-item>
      </ac-form>
    </AcCard>
    <AcCard shadow="hover" class="box-card" v-if="type===3">
      <ac-form ref="form3" :model="loginForm3" :rules="rules3" labelWidth="150px">
        <ac-form-item label="邮箱">
          {{ useUserinfo.getemail }}
          <AcButton @click="sendcode3" :disabled="codedownnumber > 0">{{
            codedownnumber > 0 ? codedownnumber : "获取验证码"
          }}</AcButton>
        </ac-form-item>
        <ac-form-item label="输入验证码" prop="code">
          <div style="width: 300px">
            <ac-input
              placeholder="请输入验证码"
              name="code"
              v-model="loginForm3.code"
            ></ac-input>
          </div>
        </ac-form-item>
        <ac-form-item label="输入注销原因" prop="reason">
          <div style="width: 300px">
            <ac-input
              placeholder="请输入注销原因"
              name="reason"
              v-model="loginForm3.reason"
            ></ac-input>
          </div>
        </ac-form-item>
        <ac-form-item label="&nbsp">
          <AcButton @click="submit3">提交</AcButton>
        </ac-form-item>
      </ac-form>
    </AcCard>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  onMounted,
  reactive,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { useUserinfoStore } from "../../store";
import { reqSendModifyEmailCode, reqChangePwd,reqSendChangeMailboxEmailCode,reqChangeEmailSelf,reqSendLogoffEmailCode,reqUserLogoff } from "./req.js";
export default defineComponent({
  setup() {
    const useUserinfo = useUserinfoStore();
    const router = useRouter();
    const loginForm = reactive({
      code: "",
      newpass: "",
      newpass2: "",
    });
    const validatePass2 = (rule, value, callback) => {
      if (value !== loginForm.newpass) {
        callback(new Error("两次输入不一致"));
      } else {
        callback();
      }
    };
    const rules = {
      code: [{ len: 6, trigger: "submit" }],
      newpass: [{ min: 8, max: 20, trigger: "submit" }],
      newpass2: [{ validator: validatePass2, trigger: "submit" }],
    };
    // 获得form表单元素
    const form = ref();
    function submit() {
      form.value.validate((res) => {
        console.log("验证结果", res);
        if (res) {
          reqChangePwd(
            { email: useUserinfo.getemail },
            { emailCode: loginForm.code, newPwd: loginForm.newpass }
          ).then(() => {
            document.cookie = "";
            localStorage.clear();
            router.push("/login");
          });
        }
      });
    }
    function sendcode() {
      reqSendModifyEmailCode({ email: useUserinfo.getemail }, {}).then(() => {
        codedownnumber.value = 60;
        timer = setInterval(() => {
          codedownnumber.value--;
          if (codedownnumber.value <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
    }

    const loginForm2 = reactive({
      code:"",
      newemail:""
    })
    const rules2 = {
      code: [{ len: 6, trigger: "submit" }],
      newemail: [{ required:true,type: 'email', trigger: "submit" }]
    };
    const form2 = ref();
    function submit2() {
      form2.value.validate((res) => {
        console.log("验证结果", res);
        // console.log("详细信息", loginForm2);
        if (res) {
          reqChangeEmailSelf(
            { email: useUserinfo.getemail },
            { emailCode: loginForm2.code, newEmail: loginForm2.newemail }
          ).then(() => {
            document.cookie = "";
            localStorage.clear();
            router.push("/login");
          });
        }
      });
    }
    function sendcode2() {
      reqSendChangeMailboxEmailCode({ email: useUserinfo.getemail }, {}).then(() => {
        clearInterval(timer);
        codedownnumber.value = 60;
        timer = setInterval(() => {
          codedownnumber.value--;
          if (codedownnumber.value <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
    }

    const loginForm3 = reactive({
      code:"",
      reason:""
    })
    const rules3 = {
      code: [{ len: 6, trigger: "submit" }],
      reason: [{ required:true, trigger: "submit" }]
    };
    const form3 = ref();
    function submit3() {
      form3.value.validate((res) => {
        console.log("验证结果", res);
        // console.log("详细信息", loginForm3);
        if (res) {
          reqUserLogoff(
            { email: useUserinfo.getemail,username:useUserinfo.username },
            { emailCode: loginForm3.code, reason: loginForm3.reason }
          ).then(() => {
            document.cookie = "";
            localStorage.clear();
            router.push("/login");
          });
        }
      });
    }
    function sendcode3() {
      reqSendLogoffEmailCode({ email: useUserinfo.getemail }, {}).then(() => {
        clearInterval(timer);
        codedownnumber.value = 60;
        timer = setInterval(() => {
          codedownnumber.value--;
          if (codedownnumber.value <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
    }

    let timer = null;
    const codedownnumber = ref(0);
    // 安全中心的几种格式
    const type = ref(0)
    return {
      useUserinfo,
      loginForm,
      rules,
      submit,
      form,
      loginForm2,
      rules2,
      submit2,
      form2,
      loginForm3,
      rules3,
      submit3,
      form3,

      sendcode,
      sendcode2,
      sendcode3,
      codedownnumber,

      type
    };
  },
});
</script>

<style lang="scss" scoped>
.infinite-list {
  padding-top: 100px;
  height: calc(100vh - 100px);
  width: 100%;
  border: 1px solid #f5f6f7;
  background-color: #f5f6f7;
  .box-card {
    width: 80%;
    min-width: 1000px;
    max-width: 1200px;
    margin: 0 auto;

    .select-type {
      margin-right: 20px;
    }
  }
}

.text {
  color: green;
  text-align: center;
  line-height: 50px;
}
</style>