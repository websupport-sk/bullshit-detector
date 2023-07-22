import {getDomainDetail, isFakeNewsDomain, isHiddenResource} from './utils/tools';
import { showWarning } from './utils/show_warning';
import {HideRequest, Message} from './types/types';
import {deleteHideSettings, hideRequestHandler} from './utils/hide';
import {fetchAndStoreDomains, getLastDatabaseUpdateTimestamp} from './utils/domains';



(async function main () {
  chrome.runtime.onInstalled.addListener(() => {
    fetchAndStoreDomains();
  });

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

      const domainDetail = await getDomainDetail(hostname);
      await chrome.scripting.executeScript({
        target: { tabId },
        func: showWarning,
        args: [domainDetail, hostname]
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
      case 'getLastDatabaseUpdateRequest':
        // Due to asynchronicity, this has to be extracted from this listener.
        // Otherwise, the response is evaluated before actually being sent.
        // https://stackoverflow.com/a/74777631/8678845
        handleGetLastDatabaseUpdateRequest(sendResponse);
      }
      return true;
    }
  );
})();

const handleGetLastDatabaseUpdateRequest = async (sendResponse: (response?: any) => void) => {
  const dateObject = new Date(await getLastDatabaseUpdateTimestamp());
  const formattedDate = `${dateObject.toLocaleDateString('sk-SK')} o ${dateObject.toLocaleTimeString('sk-SK')}`;
  sendResponse({success: true, date: formattedDate});
};

