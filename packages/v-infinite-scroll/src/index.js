import { checkArriveBottom } from "./utils";
export default {
  install(Vue) {
    Vue.directive("infinite-scroll", {
      mounted(el, binding, vnode, prevVnode) {
        // 先拿到参数
        const fn = binding.value
        let timer = null;
        // 指令的值必须是一个函数，我们好执行回调
        if (typeof fn != "function") {
          throw new Error("指令value必须为函数");
        }
        // 事件处理函数
        function handleScroll() {
          if (checkArriveBottom(el)) {
            console.log("拉到底了");
            // 执行回调的时候，要把this指向组件实例
            if(fn())
            {
            clearInterval(timer)
            }
          }
        }
        // 如果设置有immediate说明立即执行，则立即执行回调，直到将内容撑满内容区
          timer = setInterval(() => {
            if(binding.modifiers.mine){
              return clearInterval(timer);
            }
            // 子元素的总高度大于设置指令的父级包裹元素就表示填满了可视区，停止加载
            // const childScrollHeight = el.firstElementChild.scrollHeight;
            if (el.scrollHeight >= el.offsetHeight) {
              return clearInterval(timer);
            }
            handleScroll();
          }, 1500);
        binding.instance.handleScroll = handleScroll;
        // 绑定滚动处理函数
        el.addEventListener("scroll", binding.instance.handleScroll);
      },
      //   组件更新的时候，会不断触发（最明显就是data中的响应式数据变化，会继续执行update方法）
      beforeUnmount(el, binding, vnode, prevVnode) {
        // console.log("天才从来都是孤独")
        el.removeEventListener("scroll",binding.instance.handleScroll);
      },
    });
  },
};