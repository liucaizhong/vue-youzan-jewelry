module.exports = {
  INDEXTABS: [{
    name: 'tabBarText0',
    // icon: () => import('@/assets/1.svg'),
    component: () => import('@/components/Home'),
    hash: '',
  }, {
    name: 'tabBarText1',
    component: () => import('@/components/Products'),
    hash: '#products',
  }, {
    name: 'tabBarText2',
    component: () => import('@/components/Mine'),
    hash: '#mine',
  }],
}
// IsAuthenticated: 1 未完善， 0 已完善
