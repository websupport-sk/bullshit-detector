import {domains} from "./domains.js"
import {isFakeNewsDomain} from  "./tools.js"
import {showWarning} from "./show_warning.js";


chrome.runtime.onInstalled.addListener(() => {});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') {
        return;
    }

    const url = new URL(tab.url);
    const hostname = url.hostname;


    if (isFakeNewsDomain(domains, hostname)) {
        chrome.scripting.executeScript({target : { tabId }, func: showWarning});
    }
});


