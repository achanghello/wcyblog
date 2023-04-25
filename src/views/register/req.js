import request from '../../utils/request.js'
import Message from "../../../packages/message/src/index";
export function reqRegisterSendCode(params, data, vm) {
    return new Promise((resolve, reject) => {
        request({
            url: '/user/sendRegisterEmailCode',
            method: 'post',
            data
        }).then((res) => {
            // console.log("函数的成功",res);
            const { msg } = res
            Message({ text: msg, type: 'success' })

            // 改变按钮数字倒计时
            vm.countDown = 20;
            vm.timer = setInterval(() => {
                vm.countDown--;
                if (vm.countDown < 1) {
                    clearInterval(vm.timer);
                }
            }, 1000);
        }).catch((err) => {
            // console.log("函数的错误",err);
            const { code, msg } = err
            if (code == '406') {
                Message({ text: msg, type: 'warn' })
            } else {
                console.log("未知错误", err)
            }
        })
    })
}
export function reqRegister(params, data, vm) {
    // console.log("注册数据",data);
    return new Promise((resolve, reject) => {
        request({
            url: '/user/register',
            method: 'post',
            data
        }).then((res) => {
            // console.log("函数的成功",res);
            const { msg } = res
            Message({ text: msg, type: 'success' })

            vm.step = 2
            // console.log(vm);
            setTimeout(() => {
                // router.push("/login");
                console.log(vm.$router.push({path:"/login"}));
            }, 3000)
        }).catch((err) => {
            // console.log("函数的错误",err);
            const { code, msg } = err
            if (code == '406') {
                Message({ text: msg, type: 'warn' })
                vm.step = 3
                setTimeout(() => {
                    vm.step = 0
                }, 3000)
            } else {
                console.log("未知错误", err)
            }
        })

    })
}