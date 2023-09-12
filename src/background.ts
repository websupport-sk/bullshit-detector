import { showBanner } from './show_banner';
import {
  FormattedDatabaseUpdateDateTimesResponse,
  WhitelistRequest,
  Message
} from './types';
import {deleteWhitelist, whitelistRequestHandler, isWhitelisted} from './whitelist';
import {
  fetchAndStoreDomains,
  getDomainDetail,
  getLastDatabaseUpdateTimestamp,
  prepareBackupDomains
} from './domains';
import updateInterval from './consts';


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
    async function handleRequests(request: Message, sender, sendResponse) {
      switch (request.messageType) {
      case 'whitelistRequest':
        await whitelistRequestHandler(request as WhitelistRequest);
        sendResponse({success: true});
        break;
      case 'deleteWhitelistRequest':
        await deleteWhitelist();
        sendResponse({success: true});
        break;
      case 'getLastDatabaseUpdateRequest':
        // Due to asynchronicity, this has to be extracted from this listener.
        // Otherwise, the response is evaluated before actually being sent.
        // https://stackoverflow.com/a/74777631/8678845
        await sendFormattedDatabaseUpdateDateTimes(sendResponse);
        break;
      case 'updateDatabaseRequest':
        await updateDatabase(sendResponse);
        break;
      }

      return true;
    }
  );
}

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
