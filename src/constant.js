module.exports = {
  INDEXTABS: [{
    name: 'tabBarText0',
    // icon: () => import('@/assets/1.svg'),
    component: () => import('@/components/Home'),
    hash: '',
    icon: () => import('@/assets/svg/sprite.svg'),
  }, {
    name: 'tabBarText1',
    component: () => import('@/components/Products'),
    hash: '#products',
    icon: () => import('@/assets/svg/sprite.svg'),
  }, {
    name: 'tabBarText2',
    component: () => import('@/components/Mine'),
    hash: '#mine',
    icon: () => import('@/assets/svg/sprite.svg'),
  }],
}
// IsAuthenticated: 1 未完善， 0 已完善
