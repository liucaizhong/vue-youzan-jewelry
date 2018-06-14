module.exports = {
  INDEXTABS: [{
    name: 'tabBarText0',
    // icon: () => import('@/assets/1.svg'),
    component: () => import('@/components/Home'),
    hash: '',
    icon: () => import('@/assets/svg/tab1_b.svg'),
  }, {
    name: 'tabBarText1',
    component: () => import('@/components/Products'),
    hash: '#products',
    icon: () => import('@/assets/svg/tab2_b.svg'),
  }, {
    name: 'tabBarText2',
    component: () => import('@/components/Mine'),
    hash: '#mine',
    icon: () => import('@/assets/svg/tab3_b.svg'),
  }],
  LAZYLOADOPTIONS: {
    // loading: './assets/img/load_err.png',
    error: '/static/load_err.png',
    attempt: 1,
    lazyComponent: true,
  },
  PRODUCTCATEGORY: [{
    key: ['0'],
    name: 'productCategory0',
    icon: () => import('@/assets/svg/pd1.svg'),
  }, {
    key: ['2'],
    name: 'productCategory1',
    icon: () => import('@/assets/svg/pd2.svg'),
  }, {
    key: ['4'],
    name: 'productCategory2',
    icon: () => import('@/assets/svg/pd3.svg'),
  }, {
    key: ['1'],
    name: 'productCategory3',
    icon: () => import('@/assets/svg/pd4.svg'),
  }, {
    key: ['3'],
    name: 'productCategory4',
    icon: () => import('@/assets/svg/pd5.svg'),
  }, {
    key: ['5', '6', '7'],
    name: 'productCategory5',
    icon: () => import('@/assets/svg/pd6.svg'),
  }],
  GOLDTYPE: [{
    name: 'productGoldType0',
    key: 'W',
  }, {
    name: 'productGoldType1',
    key: 'Y',
  }, {
    name: 'productGoldType2',
    key: 'R',
  }, {
    name: 'productGoldType3',
    key: 'pt',
  }],
  DELIVERYMODE: [{
    key: '0',
    name: 'deliveryMode0',
  }, {
    key: '1',
    name: 'deliveryMode1',
  }],
  MYSERVICETABS: [{
    key: '0',
    title: 'serviceToPay',
    icon: () => import('@/assets/svg/my1.svg'),
    url: '/my-service#0',
    api: '/client/tablist/paymentService',
    component: () => import('@/components/PaymentService'),
  }, {
    key: '1',
    title: 'serviceToDelivery',
    icon: () => import('@/assets/svg/my2.svg'),
    url: '/my-service#1',
    api: '/client/tablist/deliveryService',
    component: () => import('@/components/DeliveryService'),
  }, {
    key: '2',
    title: 'serviceRenting',
    icon: () => import('@/assets/svg/my3.svg'),
    url: '/my-service#2',
    api: '/client/tablist/rentingService',
    component: () => import('@/components/RentingService'),
  }, {
    key: '3',
    title: 'serviceCompleted',
    icon: () => import('@/assets/svg/my4.svg'),
    url: '/my-service#3',
    api: '/client/tablist/completedService',
    component: () => import('@/components/CompletedService'),
  }],
  PAYMENTWAY: [{
    key: '0',
    title: 'payMethod0',
    icon: () => import('@/assets/svg/wechatpay.svg'),
  }],
  CATEGORYOFPRODUCT: [{
    key: '0',
    name: 'productCategory0',
  }, {
    key: '1',
    name: 'productCategory1',
  }, {
    key: '2',
    name: 'productCategory2',
  }, {
    key: '3',
    name: 'productCategory3',
  }, {
    key: '4',
    name: 'productCategory4',
  }, {
    key: '5',
    name: 'productCategory5_0',
  }, {
    key: '6',
    name: 'productCategory5_1',
  }, {
    key: '7',
    name: 'productCategory5_2',
  }],
  IDTYPE: [{
    key: '0',
    name: 'identity0',
  }, {
    key: '1',
    name: 'identity1',
  }, {
    key: '2',
    name: 'identity2',
  }],
}
// IsAuthenticated: 1 未完善， 0 已完善
