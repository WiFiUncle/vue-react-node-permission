import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.Log = function (info, flag = true) {
  if (flag) {
    // info = typeof info === 'object' JSON.stringify()
    console.log(info)
  }
}
