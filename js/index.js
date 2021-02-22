chrome.tabs.executeScript(null, {file:"js/jquery-3.2.1.slim.min.js"},a=>{
    let e = chrome.runtime.lastError;
    if(e !== undefined) console.log(tabId, a, e)
    
});
 chrome.tabs.executeScript(null, {file:"js/content.js"},a=>{
    let e = chrome.runtime.lastError;
    if(e !== undefined) console.log(tabId, a, e)
    
});
chrome.tabs.query({active:true}, function(tabs) {
    chrome.tabs.executeScript(tabs[1].id, {code: 'console.log(localStorage);'});
});




