import { scripting } from 'chrome';

async function scrapePage() {

  let retryCount = 0;
  let data;

  while (!data && retryCount < 3) {

    try {

      const evaluateResult = await scripting.evaluate(...);
      data = evaluateResult;

    } catch(error) {

      retryCount++;
      
      if (error.message === 'Rate Limited') {
        // Implement delay
      }

      if (retryCount === 3) {
        throw error;
      }
    
    }

  }

  return data;

}

export { scrapePage };