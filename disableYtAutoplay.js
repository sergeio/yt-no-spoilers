if (!window.cancelInterval) {
  window.cancelInterval = setInterval(
    () => {
      button = document.getElementsByClassName('ytp-upnext-cancel-button')[0]
      // If we find the button, and it is not display:none, click it
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
      if (button && button.offsetParent) { button.click() }
    },
    4000,
  )
}
