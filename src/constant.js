const CDN = 'https://m.theiajewel.com'

module.exports = {
  // APPID: 'wx3cf20ba95498ed2a',
  REALURL: 'https://m.theiajewel.com',
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
    loading: '/static/Spin.gif',
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
    name: 'productCategory2',
    icon: () => import('@/assets/svg/pd2.svg'),
  }, {
    key: ['4'],
    name: 'productCategory4',
    icon: () => import('@/assets/svg/pd3.svg'),
  }, {
    key: ['1'],
    name: 'productCategory1',
    icon: () => import('@/assets/svg/pd4.svg'),
  }, {
    key: ['3'],
    name: 'productCategory3',
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
  GOLDPURITY: [{
    key: '0',
    value: '18K',
  }, {
    key: '1',
    value: '24K',
  }, {
    key: '2',
    value: '900',
  }, {
    key: '3',
    value: '950',
  }, {
    key: '4',
    value: '990',
  }],
  ORDERTIMEOUT: 15 * 60 * 1000,
  SERVICETYPE: [{
    key: '0',
    name: 'serviceType0',
  }, {
    key: '1',
    name: 'serviceType1',
  }, {
    key: '2',
    name: 'serviceType2',
  }],
  ORDERTYPE: [{
    key: '0',
    name: 'orderType0',
  }, {
    key: '1',
    name: 'orderType1',
  }, {
    key: '2',
    name: 'orderType2',
  }, {
    key: '3',
    name: 'orderType3',
  }, {
    key: '4',
    name: 'orderType4',
  }, {
    key: '5',
    name: 'orderType5',
  }, {
    key: '6',
    name: 'orderType6',
  }, {
    key: '7',
    name: 'orderType7',
  }],
  ORDERSTATUS: [{
    key: '0',
    name: 'orderStatus0',
  }, {
    key: '1',
    name: 'orderStatus1',
  }, {
    key: '2',
    name: 'orderStatus2',
  }, {
    key: '3',
    name: 'orderStatus3',
  }, {
    key: '4',
    name: 'orderStatus4',
  }],
  PAYMENTTYPE: [{
    key: '0',
    name: 'paymentType0',
  }, {
    key: '1',
    name: 'paymentType1',
  }],
  CERTIFICATES: [{
    key: '0',
    name: 'certificate0',
  }, {
    key: '1',
    name: 'certificate1',
  }, {
    key: '2',
    name: 'certificate2',
  }, {
    key: '3',
    name: 'certificate3',
  }, {
    key: '4',
    name: 'certificate4',
  }, {
    key: '5',
    name: 'certificate5',
  }, {
    key: '6',
    name: 'certificate6',
  }, {
    key: '7',
    name: 'certificate7',
  }],
  CREDITSTATUS: [{
    key: '0',
    name: 'creditStatus0',
  }, {
    key: '1',
    name: 'creditStatus1',
  }, {
    key: '2',
    name: 'creditStatus2',
  }],
  PACKAGESTATUS: [{
    key: '0',
    name: 'packageStatus0',
  }, {
    key: '1',
    name: 'packageStatus1',
  }, {
    key: '2',
    name: 'packageStatus2',
  }, {
    key: '3',
    name: 'packageStatus3',
  }, {
    key: '4',
    name: 'packageStatus4',
  }, {
    key: '5',
    name: 'packageStatus5',
  }, {
    key: '6',
    name: 'packageStatus6',
  }],
  SERVICESTATUS: [{
    key: '0',
    name: 'serviceStatus0',
  }, {
    key: '1',
    name: 'serviceStatus1',
  }, {
    key: '2',
    name: 'serviceStatus2',
  }, {
    key: '3',
    name: 'serviceStatus3',
  }, {
    key: '4',
    name: 'serviceStatus4',
  }, {
    key: '5',
    name: 'serviceStatus5',
  }, {
    key: '6',
    name: 'serviceStatus6',
  }, {
    key: '7',
    name: 'serviceStatus7',
  }],
  SALESTATUS: [{
    key: '0',
    name: 'saleStatus0',
  }, {
    key: '1',
    name: 'saleStatus1',
  }, {
    key: '2',
    name: 'saleStatus2',
  }, {
    key: '3',
    name: 'saleStatus3',
  }, {
    key: '4',
    name: 'saleStatus4',
  }],
  LEASEHOLDSTATUS: [{
    key: '0',
    name: 'leaseholdStatus0',
  }, {
    key: '1',
    name: 'leaseholdStatus1',
  }, {
    key: '2',
    name: 'leaseholdStatus2',
  }],
  STRATEGYIMAGES: {
    url: `${CDN}/media/img/config/strategy.jpg`,
    avatar: `${CDN}/media/img/config/strategy.jpg.1200x1200_q85_crop.jpg`,
    name: 'strategy.jpg',
  },
  FAQIMAGES: {
    url: `${CDN}/media/img/config/FAQ.jpg`,
    avatar: `${CDN}/media/img/config/FAQ.jpg.1200x1200_q85_crop.jpg`,
    name: 'FAQ.jpg',
  },
  ABOUTUSIMAGES: {
    url: `${CDN}/media/img/config/aboutUS.jpg`,
    avatar: `${CDN}/media/img/config/aboutUS.jpg.1200x1200_q85_crop.jpg`,
    name: 'aboutUs.jpg',
  },
  JEWELRYCAREIMAGES: {
    url: `${CDN}/media/img/config/jewelryCare.jpg`,
    avatar: `${CDN}/media/img/config/jewelryCare.jpg.1200x1200_q85_crop.jpg`,
    name: 'jewelryCare.jpg',
  },
}
// isAuthenticated: 1 未完善， 0 已完善
