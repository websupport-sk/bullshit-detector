
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.status !== 'complete') {
        return;
    }

    var url = new URL(tab.url);
    var hostname = url.hostname;
    if (isFakeNewsDomain(domains, hostname)) {
        browser.tabs.executeScript(tabId, { file: 'show_warning.js' });
    }
});

contextMenus.removeAll();
