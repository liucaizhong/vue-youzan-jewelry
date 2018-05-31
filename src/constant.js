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
  CATEGORYOFGOOD: [{
    key: '0',
    value: '项链',
  }, {
    key: '1',
    value: '戒指',
  }, {
    key: '2',
    value: '手镯',
  }, {
    key: '3',
    value: '耳饰',
  }, {
    key: '4',
    value: '手链',
  }, {
    key: '5',
    value: '脚饰',
  }, {
    key: '6',
    value: '胸针&领针',
  }, {
    key: '7',
    value: '摆件',
  }],
  GOLDTYPE: [{
    value: '白金',
    key: 'W',
  }, {
    value: '黄金',
    key: 'Y',
  }, {
    value: '玫瑰金',
    key: 'R',
  }, {
    value: '铂金',
    key: 'pt',
  }],
}
// IsAuthenticated: 1 未完善， 0 已完善
