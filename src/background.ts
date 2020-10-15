import { browser } from "webextension-polyfill-ts";
import { ConfigProvider } from "./config";

async function activeforksCurrentTab() {
  try {
    // add a dummy div element to indicate that activeforks.bundle.js was injected by a user click on the active forks icon
    browser.tabs.executeScript({
      code:
        'document.body.innerHTML += \'<div style="display: none;" id="active-forks-extension-icon-clicked"></div>\'',
    });
    browser.tabs.executeScript({ file: "/dist/bundles/activeforks.bundle.js" });
  } catch {
    try {
      const configProvider = await ConfigProvider.create();
      const config = configProvider.getConfig();
      window.open(config.activeForksUrl);
    } catch {
      window.open("https://ridvanaltun.github.io/active-forks");
    }
  }
}

browser.browserAction.onClicked.addListener(activeforksCurrentTab);
