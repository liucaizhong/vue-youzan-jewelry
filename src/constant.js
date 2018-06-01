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
    error: 'static/load_err.png',
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
}
// IsAuthenticated: 1 未完善， 0 已完善
