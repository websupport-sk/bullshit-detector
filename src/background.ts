import { showBanner } from './show_banner';
import {
  FormattedDatabaseUpdateDateTimesResponse,
  HideRequest,
  Message
} from './types';
import {deleteHideSettings, hideRequestHandler, isHiddenResource} from './hide';
import {
  fetchAndStoreDomains,
  getDomainDetail,
  getLastDatabaseUpdateTimestamp,
  prepareBackupDomains
} from './domains';
import updateInterval from './consts';



(async function main () {
  chrome.runtime.onInstalled.addListener(async () => {
    await prepareBackupDomains();
    await fetchAndStoreDomains();
  });

  let theTabId;

  chrome.tabs.onUpdated.addListener( async (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  )  => {
    if (changeInfo.status !== 'complete') {
      return;
    }

    theTabId = tabId;

    const url: URL = new URL(tab.url);

    if (await isHiddenResource(url)) {
      return;
    }

    const domainDetail = await getDomainDetail(url);
    if (domainDetail) {
      await chrome.scripting.executeScript({
        target: { tabId },
        func: showBanner,
        args: [domainDetail, url.hostname]
      });
    }
  });

  chrome.runtime.onMessage.addListener(
    function(request: Message, sender, sendResponse) {
      switch (request.messageType) {
      case 'hideRequest':
        hideRequestHandler(request as HideRequest);
        sendResponse({success: true});
        break;
      case 'deleteHideSettingsRequest':
        deleteHideSettings();
        sendResponse({success: true});
        break;
      case 'getLastDatabaseUpdateRequest':
        // Due to asynchronicity, this has to be extracted from this listener.
        // Otherwise, the response is evaluated before actually being sent.
        // https://stackoverflow.com/a/74777631/8678845
        sendFormattedDatabaseUpdateDateTimes(sendResponse);
        break;
      case 'updateDatabaseRequest':
        updateDatabase(sendResponse);
        break;
      }

      return true;
    }
  );
})();

const updateDatabase = async (sendResponse) => {
  await fetchAndStoreDomains();
  await sendFormattedDatabaseUpdateDateTimes(sendResponse);
};

const sendFormattedDatabaseUpdateDateTimes =
  async (sendResponse: (response: FormattedDatabaseUpdateDateTimesResponse) => void) => {
    const lastUpdateTimestamp = await getLastDatabaseUpdateTimestamp();
    const lastUpdateObject = new Date(lastUpdateTimestamp);
    const nextUpdateObject = new Date(lastUpdateTimestamp + updateInterval);

    const formattedLastUpdate = `${lastUpdateObject.toLocaleDateString('sk-SK')}
   o ${lastUpdateObject.toLocaleTimeString('sk-SK')}`;
    const formattedNextUpdate = `${nextUpdateObject.toLocaleDateString('sk-SK')}
   o ${nextUpdateObject.toLocaleTimeString('sk-SK')}`;

    sendResponse({
      success: true,
      lastUpdate: formattedLastUpdate,
      nextUpdate: formattedNextUpdate
    } as FormattedDatabaseUpdateDateTimesResponse);
  };
