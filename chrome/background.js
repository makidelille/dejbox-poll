chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'dejbox.fr'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });


    chrome.tabs.onUpdated.addListener(
        function(tabId, changeInfo, tab) {
          // read changeInfo data and do something with it
          // like send the new url to contentscripts.js
          if (changeInfo.url) {
            console.log( tabId, {
              message: 'hello!',
              url: changeInfo.url
            })
          }
        }
    );