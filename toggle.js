const youtubeCss = `
#secondary, #info, #masthead-container, #related, #comments, .ytp-progress-bar-container, .ytp-time-display {
  display: none !important;
}
.html5-video-container, .html5-main-video {
  width: 100% !important;
  height: 100% !important;
}
.ytp-cued-thumbnail-overlay-image {
  z-index: 11;
}
.ytp-chrome-controls, .ytp-chrome-bottom {
  left: 0 !important;
  width: 100% !important;
}
#page-manager.ytd-app {
  margin-top: 0 !important;
}
`
const twitchCss = `
#sideNav, .vod-seekbar-time-labels, .seekbar-interaction-area {
  display: none !important;
}
div[data-test-selector="content"] {
  display: none !important;
}
`
// .tw-mg-t-2 .tw-mg-x-2
const injectCss = youtubeCss + twitchCss;

async function isActive() {
  return (await browser.storage.local.get('ytNoSpoilersActive')).ytNoSpoilersActive;
}

async function toggleActive(e) {
  let active = await isActive();
  await browser.storage.local.set({ ytNoSpoilersActive: !active });
  applyCSS();
  e.preventDefault();
}

async function activate() {
  browser.tabs.insertCSS({code: injectCss, runAt: 'document_start'});
  browser.browserAction.setIcon({ path: {
    32: "icons/youtube-on.png"
  }});
  console.log('activating');
}

async function deactivate() {
  browser.tabs.removeCSS({code: injectCss, runAt: 'document_start'});
  browser.browserAction.setIcon({ path: {
    32: "icons/youtube-off.png"
  }});
  console.log('deactivating');
}

async function applyCSS() {
  active = await isActive();
  console.log('applyCSS!', active);
  console.log('active!', active);
  if (active) {
    activate();
  } else {
    deactivate();
  }
}

applyCSS();

browser.browserAction.onClicked.addListener(toggleActive);
browser.tabs.onUpdated.addListener(applyCSS);
