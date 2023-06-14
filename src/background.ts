import {getDomainScore, isFakeNewsDomain, isHiddenResource} from './utils/tools';
import { showWarning } from './utils/show_warning';
import {HideRequest, Message} from './types/types';
import {deleteHideSettings, hideRequestHandler} from './utils/hide';
async function main () {
  chrome.runtime.onInstalled.addListener(() => {});

  chrome.tabs.onUpdated.addListener( async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  )  => {
    if (changeInfo.status !== 'complete') {
      return;
    }

    const url: URL = new URL(tab.url);
    const hostname: string = url.hostname;

    if (await isFakeNewsDomain(hostname)) {
      if (await isHiddenResource(url)) {
        return;
      }

      const domainScore = await getDomainScore(hostname);
      await chrome.scripting.executeScript({
        target: { tabId },
        func: showWarning,
        args: [domainScore, hostname]
      });
    }
  });

  chrome.runtime.onMessage.addListener(
    function(request: Message, sender, sendResponse) {
      switch (request.messageType) {
      case 'hideRequest':
        hideRequestHandler(request as HideRequest);
        break;
      case 'deleteHideSettingsRequest':
        deleteHideSettings();
        sendResponse({success: true});
        break;
      }
    }
  );
}

main();
