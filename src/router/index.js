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
const MyService = () => import('@/components/MyService')
const PaymentSuccess = () => import('@/components/PaymentSuccess')
const ServiceDetail = () => import('@/components/ServiceDetail')
const PackageList = () => import('@/components/PackageList')
const MyWallet = () => import('@/components/MyWallet')
const WithdrawAmount = () => import('@/components/WithdrawAmount')
const BankInfo = () => import('@/components/BankInfo')
const UserInfo = () => import('@/components/UserInfo')
const ChangePhone = () => import('@/components/ChangePhone')
const NewPhone = () => import('@/components/NewPhone')
const Authentication = () => import('@/components/Authentication')
const ChangeEmail = () => import('@/components/ChangeEmail')
const ChangeAddress = () => import('@/components/ChangeAddress')
const ChangeBirthday = () => import('@/components/ChangeBirthday')
const Booking = () => import('@/components/Booking')
const Outlets = () => import('@/components/Outlets')
const FAQ = () => import('@/components/FAQ')
const AboutUs = () => import('@/components/AboutUs')
const RentStrategy = () => import('@/components/RentStrategy')

export default new Router({
  mode: 'history',
  // base: '/C/',
  routes: [
    {
      path: '*',
      component: Index,
    },
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
      path: '/payment-success',
      component: PaymentSuccess,
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
      path: '/my-wallet',
      component: MyWallet,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/withdraw-amount',
      component: WithdrawAmount,
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
    {
      path: '/input-bankinfo',
      component: BankInfo,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/my-service',
      component: MyService,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/service-detail/:id',
      component: ServiceDetail,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/package-list',
      component: PackageList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user-info',
      component: UserInfo,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/change-phone',
      component: ChangePhone,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/new-phone',
      component: NewPhone,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/authentication',
      component: Authentication,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/change-email',
      component: ChangeEmail,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/change-address',
      component: ChangeAddress,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/change-birthday',
      component: ChangeBirthday,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/book',
      component: Booking,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/outlets',
      component: Outlets,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/FAQ',
      component: FAQ,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/about-us',
      component: AboutUs,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/rent-strategy',
      component: RentStrategy,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})
