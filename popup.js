// Importar datos
const input = document.getElementById('import-data');

input.addEventListener('change', (event) => {

  const file = event.target.files[0];

  const reader = new FileReader();

  reader.onload = () => {

    const data = parseCSV(reader.result);

    chrome.runtime.sendMessage({
      type: 'importData',
      data: data
    });

  };

  reader.readAsText(file);

});

// Exportar datos
document.getElementById('export-data').addEventListener('click', () => {

  debugger;

  const csvData = convertToCSV(scrapedData);  

  chrome.filesystem.writeFile({
    fileName: 'scraped_data.csv',
    data: csvData
  });

});

// Iniciar scraping  
document.getElementById('start-scraping').addEventListener('click', () => {

  debugger;

  const key = document.getElementById('openai-key').value;

  chrome.runtime.sendMessage({
    type: 'startScraping',
    key: key
  });

});

// Escuchar mensajes
chrome.runtime.onMessage.addListener((message) => {

  if (message.type === 'scrapingStarted') {
    updateStatus(message.status);
  }

  if (message.type === 'log') {
    writeLog(message.text);
  }

});

// Funciones auxiliares

function updateStatus(status) {

  document.getElementById('status').innerText = status;

}

function writeLog(text) {

  const log = document.getElementById('log');
  log.innerText += `\n${text}`;  

}