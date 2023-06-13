import backupRatings from './backup';

export const getDomains = async (): Promise<Record<string, string>> => {

  const data = await chrome.storage.local.get(['lastDatabaseUpdate', 'domainScores']);
  const lastDatabaseUpdate = data.lastDatabaseUpdate;
  let domainScores = data.domainScores;

  const incompleteData = lastDatabaseUpdate === null || isNaN(lastDatabaseUpdate) || domainScores === null;
  const obsoleteData = Date.now() - lastDatabaseUpdate > 1000 * 60 * 60 * 24 * 7; // 7 days

  if (incompleteData || obsoleteData) {
    domainScores = fetchAndStoreDomains();
  }

  return domainScores;
};


async function fetchAndStoreDomains(): Promise<Record<string, string>> {
  let domainScores: Record<string, string> = {};

  try {
    const domainsFile = await fetch('https://konspiratori.sk/static/lists/zoznam.txt');
    if (!domainsFile.ok) {
      throw new Error('Failed to fetch domains file');
    }

    const text = await domainsFile.text();
    const lines = text.split('\n');

    for (const line of lines) {
      const [url, score] = line.split(',');
      domainScores[url] = score;
    }

    await saveLastDatabaseUpdateTimeStamp();
  } catch (error) {
    // This would have been a nice dynamic import, however, dynamic imports are not supported in Service Workers.
    // https://github.com/w3c/ServiceWorker/issues/1356
    domainScores = backupRatings;
  } finally {
    await chrome.storage.local.set({ domainScores });
  }

  // TODO we are expecting to get this in form of array
  return domainScores;
}


async function saveLastDatabaseUpdateTimeStamp() {
  const currentTimeStamp = Date.now();
  await chrome.storage.local.set({ currentTimeStamp });
}
