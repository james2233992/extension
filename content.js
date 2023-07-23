const worker = new Worker('./scraper.worker.js');

worker.postMessage(url);

worker.onmessage = (e) => {
  
  chrome.runtime.sendMessage({
    type: 'scrapedData',
    data: e.data
  });

};