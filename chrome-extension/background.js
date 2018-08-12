'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
          new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'http' }
          }),
      ],
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});

var bkg = chrome.extension.getBackgroundPage();

chrome.runtime.onInstalled.addListener(function(details) {
  // chrome.alarms.onAlarm.addListener(onAlarm);

  // chrome.alarms.create("extension.alarm1", {periodInMinutes: 1});

  console.log("extension is running");
 });
