import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/components/Index')
const Login = () => import('@/components/Login')
const ProductDetail = () => import('@/components/ProductDetail')
const PaymentDetail = () => import('@/components/PaymentDetail')
const RentDetail = () => import('@/components/RentDetail')
const PayConfirm = () => import('@/components/PayConfirm')
const BindPhone = () => import('@/components/BindPhone')
const PerfectInfo = () => import('@/components/PerfectInfo')

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
      redirect: '/index',
    },
    {
      path: '/index',
      component: Index,
    },
    {
      path: '/product/:id',
      component: ProductDetail,
    },
    {
      path: '/payment/:id',
      component: PaymentDetail,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/rent/:id',
      component: RentDetail,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/confirm-pay',
      component: PayConfirm,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/bindphone',
      component: BindPhone,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/perfectinfo',
      component: PerfectInfo,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})
