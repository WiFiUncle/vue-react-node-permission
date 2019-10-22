import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Views from '@/router/views';
const VLayout = () => import('@/views/VLayout/Index')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/view',
      component: VLayout,
      children: [
        ...Views
      ]
    }
  ]
})
