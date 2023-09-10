import backupRatings from './backup';
import {DomainScores} from '../types/types';
import updateInterval from '../consts/update_interval';

export async function getDomains(): Promise<DomainScores> {
  const data = await chrome.storage.local.get(['lastDatabaseUpdate', 'domainScores']);
  const lastDatabaseUpdate = data.lastDatabaseUpdate;
  let domainScores = data.domainScores;

  const incompleteData = lastDatabaseUpdate === null || isNaN(lastDatabaseUpdate) || domainScores === null;
  const obsoleteData = Date.now() - lastDatabaseUpdate > updateInterval;

  if (incompleteData || obsoleteData) {
    domainScores = await fetchAndStoreDomains();
  }

  return domainScores;
}

export async function prepareBackupDomains(): Promise<void> {
  // This would have been a nice dynamic import, however, dynamic imports are not supported in Service Workers.
  // https://github.com/w3c/ServiceWorker/issues/1356
  const backup = backupRatings;
  await chrome.storage.local.set({ backup });
}

export async function fetchAndStoreDomains(): Promise<DomainScores> {
  const domainScores: DomainScores = {};
  const domainsFile = await fetch('https://konspiratori.sk/static/lists/zoznam.txt');

  if (!domainsFile.ok) {
    return await chrome.storage.local.get('backup');
  }

  const text = await domainsFile.text();
  const lines = text.split('\n');

  for (const line of lines) {
    const [url, score, reportUrl] = line.split(',');
    domainScores[url] = {score, reportUrl};
  }

  await saveLastDatabaseUpdateTimeStamp();
  await chrome.storage.local.set({ domainScores, backup: domainScores });

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
