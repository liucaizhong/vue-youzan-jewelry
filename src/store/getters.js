export default {
  userName: state => {
    const { name, phone } = state.userInfo
    return name || phone
  },
  userServiceCount: state => {
    const {
      deliveryCount,
      paymentCount,
      rentingCount
    } = state.userInfo
    return [
      paymentCount,
      deliveryCount,
      rentingCount,
    ]
  },
}
