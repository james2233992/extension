import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yourproject.supabase.co';
const supabaseKey = 'your-api-key';

const supabase = createClient(supabaseUrl, supabaseKey);

let potentialContacts = [];

let cache = {};

chrome.runtime.onMessage.addListener((message) => {

  if (message.type === 'scrapedData') {

    insertScrapedData(message.data);
    
    potentialContacts.push(...message.data.users);

  }

});


async function insertScrapedData(data) {

  const decrypted = decrypt(data);  

  const cleanData = DOMPurify.sanitize(decrypted);

  await supabase.from('scraped_users').insert(cleanData.users);

  await supabase.from('scraped_posts').insert(cleanData.posts);

}


async function retrieveScrapedData() {

  const { data: storedUsers } = await supabase.from('scraped_users').select();

  const { data: storedPosts } = await supabase.from('scraped_posts').select();

  return {

    users: storedUsers,

    posts: storedPosts

  }

}


async function scrapePage(url) {

  if(!isValidUrl(url)) {

    throw 'URL no permitida';

  }
  
  
  const scraper = await import('./scraper.js');

  const data = await scraper.scrapePage(url);  

  const encryptedData = encrypt(data);

  cache[url] = encryptedData;

  return encryptedData;

}


function encrypt(data) {

  // Encriptar datos

}


function decrypt(data) {

  // Desencriptar datos

}


async function interactWithContacts() {

  for (let contact of potentialContacts) {


    // Llamar APIs de Facebook, enviar mensajes, etc


  }

}


retrieveScrapedData();


function isValidUrl(url) {

  // Validar URL

}