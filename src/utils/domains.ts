export const getDomains = async (): Promise<Record<string, string>> => {

  const data = await chrome.storage.local.get(['lastDatabaseUpdate', 'domainScores']);
  const lastDatabaseUpdate = data.lastDatabaseUpdate;
  let domainScores = data.domainScores;

  const incompleteData = lastDatabaseUpdate === null || isNaN(lastDatabaseUpdate) || domainScores === null;
  const obsoleteData = Date.now() - lastDatabaseUpdate > 1000 * 60 * 60 * 24 * 7; // 7 days

  if (incompleteData || obsoleteData) {
    domainScores = fetchAndStoreDomains();
  }

  return {'aeronet.news': '9.7'};
};


async function fetchAndStoreDomains(): Promise<Record<string, string>> {
  const domainScores: Record<string, string> = {};

  try {
    const domainsFile = await fetch('http://127.0.0.1:8887/zoznam.txt');
    const text = await domainsFile.text();

    const lines = text.split('\n');

    for (const line of lines) {
      let url: string, score: string;
      [url, score] = line.split(',');
      domainScores[url] = score;
    }

    await chrome.storage.local.set({ domainScores });
    await saveLastDatabaseUpdateTimeStamp();
  } catch (error) {
    // todo load fallback scores from file
  }

  // TODO we are expecting to get this in form of array
  return domainScores;
}


async function saveLastDatabaseUpdateTimeStamp() {
  const currentTimeStamp = Date.now();
  await chrome.storage.local.set({ currentTimeStamp });
}
