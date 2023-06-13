import { getDomains } from './utils/domains';

import {getDomainScore, isFakeNewsDomain} from './utils/tools';
import { showWarning } from './utils/show_warning';
async function main () {
  chrome.runtime.onInstalled.addListener(() => {});

  const domains: Record<string, string> = await getDomains();

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

    if (isFakeNewsDomain(domains, hostname)) {
      const domainScore = await getDomainScore(hostname);
      await chrome.scripting.executeScript({
        target: { tabId },
        func: showWarning,
        args: [domainScore]
      });
    }
  });
}

main();
