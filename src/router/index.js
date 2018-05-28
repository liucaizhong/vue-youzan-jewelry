import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/components/Index')
const Login = () => import('@/components/Login')

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   component: NotFound,
    // },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Index,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})
