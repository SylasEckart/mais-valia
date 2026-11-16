var toggle = true;

chrome.tabs.onUpdated.addListener(function(tab){
	if(toggle){
	    chrome.browserAction.setIcon({path: "../img/icon.png", tabId:tab.id});
      chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.slim.min.js"});

	    chrome.tabs.executeScript(tab.id, {file:"js/content.js"});
	    chrome.browserAction.setTitle({title:'Clique para desativar | mais valia?'});
	}else{	
		chrome.browserAction.setTitle({title:'Clique para ativar | mais valia?'});	
	}
});

chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setIcon({path: "../img/icon.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {file:"js/jquery-3.2.1.slim.min.js"});
    chrome.tabs.executeScript(tab.id, {file:"js/content.js"});
    chrome.browserAction.setTitle({title:'Clique para desativar | mais valia'});
  }
  else{
    chrome.tabs.reload(tab.id);
    chrome.browserAction.setTitle({title:'Clique para ativar | mais valia'});
  }
});



