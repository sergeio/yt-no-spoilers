if (!window.cancelInterval) {
  window.cancelInterval = setInterval(
    () => {
      button = document.getElementsByClassName('ytp-upnext-cancel-button')[0]
      if (button) { button.click() }
    },
    4000,
  )
}
