import { checkUserBtnPression } from "@/common/authority";
/**
 *
 * @function 按钮指令
 * @param {*} Vue
 * @param {*} [options={}]
 */
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!checkUserBtnPression(binding.value)) { //binding.value 是 指令的绑定值 v-auth= ['edit']
         el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };