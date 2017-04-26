chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') {
        return;
    }

    var url = new URL(tab.url);
    var hostname = url.hostname;

    if (isFakeNewsDomain(domains, hostname)) {
        chrome.tabs.executeScript(tabId, { file: 'show_warning.js' });
    }
});

chrome.contextMenus.removeAll();

// chrome.contextMenus.create({
//     title: "websupport.sk",
//     contexts: ["browser_action"],
//     onclick: function() {
//       chrome.tabs.create({ url: 'https://www.websupport.sk' });
//     }
// });
//
// chrome.contextMenus.create({
//     title: "konspiratori.sk",
//     contexts: ["browser_action"],
//     onclick: function() {
//       chrome.tabs.create({ url: 'https://www.konspiratori.sk/' });
//     }
// });
