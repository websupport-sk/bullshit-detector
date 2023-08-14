import backupRatings from './backup';
import {DomainScores} from '../types/types';
import updateInterval from '../consts/updateInterval';

export const getDomains = async (): Promise<DomainScores> => {
  const data = await chrome.storage.local.get(['lastDatabaseUpdate', 'domainScores']);
  const lastDatabaseUpdate = data.lastDatabaseUpdate;
  let domainScores = data.domainScores;

  const incompleteData = lastDatabaseUpdate === null || isNaN(lastDatabaseUpdate) || domainScores === null;
  const obsoleteData = Date.now() - lastDatabaseUpdate > updateInterval;

  if (incompleteData || obsoleteData) {
    domainScores = await fetchAndStoreDomains();
  }

  return domainScores;
};

export async function fetchAndStoreDomains(): Promise<DomainScores> {
  let domainScores: DomainScores = {};

  try {
    const domainsFile = await fetch('https://konspiratori.sk/static/lists/zoznam.txt');
    if (!domainsFile.ok) {
      throw new Error('Failed to fetch domains file');
    }

    const text = await domainsFile.text();
    const lines = text.split('\n');

    for (const line of lines) {
      const [url, score, reportUrl] = line.split(',');
      domainScores[url] = {score, reportUrl};
    }

    await saveLastDatabaseUpdateTimeStamp();
  } catch (error) {
    // This would have been a nice dynamic import, however, dynamic imports are not supported in Service Workers.
    // https://github.com/w3c/ServiceWorker/issues/1356
    domainScores = backupRatings;
  } finally {
    await chrome.storage.local.set({ domainScores });
  }

  return domainScores;
}

export async function getLastDatabaseUpdateTimestamp() {
  const response = await chrome.storage.local.get('lastDatabaseUpdate');
  return response.lastDatabaseUpdate;
}

async function saveLastDatabaseUpdateTimeStamp() {
  const currentTimeStamp = Date.now();
  await chrome.storage.local.set({ lastDatabaseUpdate: currentTimeStamp });
}
