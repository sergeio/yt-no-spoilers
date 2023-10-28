async function isActive() {
  return (await browser.storage.local.get('ytNoSpoilersActive')).ytNoSpoilersActive;
}

if (!window.cancelInterval) {
  window.cancelInterval = setInterval(
    async () => {
      const check = document.getElementsByClassName('ytp-autonav-toggle-button')[0]
      const active = await isActive();
      if (active && check.attributes["aria-checked"].value === "true") { check.click() }
    },
    4000,
  )
}
