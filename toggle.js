const youtubeCss = `
#secondary-inner,
#info,
#masthead-container,
#chat,
#related,
#description,
#comments,
#comment-teaser,
#metadata-line,
.ytp-progress-bar-container,
.ytp-time-display,
.ytThumbnailBottomOverlayViewModelHost,
ytd-thumbnail-overlay-resume-playback-renderer,
ytd-thumbnail-overlay-time-status-renderer,
yt-thumbnail-overlay-badge-view-model,
#mouseover-overlay {
  display: none !important;
}
.ytp-player-content, .ytp-ce-element {
  display: none !important;
}
.ytd-video-preview {
  display: none !important;
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
}

async function activate() {
  browser.tabs.insertCSS({code: injectCss, runAt: 'document_start'});
  browser.browserAction.setIcon({ path: {
    32: "icons/youtube-on.png"
  }});
  console.log('yt hide: activating');
}

async function deactivate() {
  browser.tabs.removeCSS({code: injectCss, runAt: 'document_start'});
  browser.browserAction.setIcon({ path: {
    32: "icons/youtube-off.png"
  }});
  console.log('yt hide: deactivating');
}

async function applyCSS() {
  active = await isActive();
  console.log('yt hide: applyCSS!', active);
  console.log('yt hide: active!', active);
  if (active) {
    activate();
  } else {
    deactivate();
  }
}

applyCSS();

browser.browserAction.onClicked.addListener(toggleActive);
browser.tabs.onUpdated.addListener(applyCSS);

browser.commands.onCommand.addListener((command) => {
  if (command === "toggle-hiding-spoilers") {
    console.log("yt hide: keyboard shortcut pressed");
    toggleActive();
  }
});
