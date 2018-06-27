function scrollFixHandler () {
  // startY = event.touches[0].pageY
  const elem = this
  const startTopScroll = elem.scrollTop

  if (startTopScroll <= 0) {
    elem.scrollTop = 1
  }

  if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
    elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1
  }
}

export default {
  install (Vue, options) {
    Vue.prototype.$scrollFixInit = function (elem) {
      // Variables to track inputs
      // let startY
      // let startTopScroll

      // elem = elem || document.querySelector(elem)

      // If there is no element, then do nothing
      if (!elem) {
        return
      }

      // Handle the start of interactions
      elem.addEventListener('touchstart', scrollFixHandler, false)
    }
    Vue.prototype.$scrollFixDestory = function (elem) {
      if (!elem) {
        return
      }

      elem.removeEventListener('touchstart', scrollFixHandler, false)
    }
  }

}
