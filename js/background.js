chrome.tabs.onUpdated.addListener(function(tabId, info) {
    chrome.tabs.get(tabId, function(tab) {
        if (tab.url && tab.url.match('http.\:\/\/[\w]+\.facebook\.com')) {
            if (info.status == "complete") {
                chrome.tabs.insertCSS(tab.id, {
                    file: 'css/inject.css'
                }, function() {
                    if (chrome.runtime.lastError)
                        console.log("ERR: " + chrome.runtime.lastError.message);
                });
                chrome.tabs.executeScript(tab.id, {
                    file: 'js/inject.js'
                }, function() {
                    if (chrome.runtime.lastError)
                        console.log("ERR: " + chrome.runtime.lastError.message);
                });
            }
        }
    });
});