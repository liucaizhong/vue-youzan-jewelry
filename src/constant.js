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
}
// IsAuthenticated: 1 未完善， 0 已完善
