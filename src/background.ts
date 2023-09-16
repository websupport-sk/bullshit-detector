import updateInterval from './consts';
import { showBanner } from './show_banner';
import {
  Message,
  WhitelistRequest,
  FormattedDatabaseUpdateDateTimesResponse
} from './types';
import {
  isWhitelisted,
  deleteWhitelist,
  whitelistRequestHandler
} from './whitelist';
import {
  getDomainDetail,
  fetchAndStoreDomains,
  prepareBackupDomains,
  getLastDatabaseUpdateTimestamp,
} from './domains';



main: {
  chrome.runtime.onInstalled.addListener(async () => {
    await prepareBackupDomains();
    await fetchAndStoreDomains();
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

    if (!await isWhitelisted(url)) {
      const domainDetail = await getDomainDetail(url);
      if (domainDetail) {
        await chrome.scripting.executeScript({
          target: { tabId },
          func: showBanner,
          args: [domainDetail, url.hostname]
        });
      }
    }
  });

  chrome.runtime.onMessage.addListener(
    function handleRequests(request: Message, sender, sendResponse) {
      switch (request.messageType) {
      case 'whitelistRequest':
        whitelistRequestHandler(request as WhitelistRequest);
        sendResponse({success: true});
        break;
      case 'deleteWhitelistRequest':
        deleteWhitelist();
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
}

async function updateDatabase(sendResponse) {
  await fetchAndStoreDomains();
  await sendFormattedDatabaseUpdateDateTimes(sendResponse);
}

async function sendFormattedDatabaseUpdateDateTimes(sendResponse:
                                                      (response: FormattedDatabaseUpdateDateTimesResponse) => void) {
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
}
