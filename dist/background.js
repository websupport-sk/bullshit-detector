"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domains_1 = require("./utils/domains");
const tools_1 = require("./utils/tools");
const show_warning_1 = require("./utils/show_warning");
chrome.runtime.onInstalled.addListener(() => { });
const domains = (0, domains_1.getDomains)();
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") {
        return;
    }
    const url = new URL(tab.url);
    const hostname = url.hostname;
    if ((0, tools_1.isFakeNewsDomain)(domains, hostname)) {
        chrome.scripting.executeScript({
            target: { tabId },
            func: show_warning_1.showWarning,
        });
    }
});
//# sourceMappingURL=background.js.map