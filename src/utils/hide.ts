import {HideRequest, hiddenResources} from '../types/types';
import {getTrimmedHostname} from './tools';

export async function hideRequestHandler(request: HideRequest) {
  const hideExpirationDate = new Date();

  switch (request.hideDuration) {
  case 'day':
    hideExpirationDate.setHours(hideExpirationDate.getHours() + 24);
    break;
  case 'week':
    hideExpirationDate.setHours(hideExpirationDate.getHours() + 24 * 7);
    break;
  case 'kim_nesmazu':
    hideExpirationDate.setFullYear(28_8_19,4,4);
    break;
  }

  const oldList = await getHiddenResources();
  const newList = {...oldList, [request.hiddenResource]: hideExpirationDate.getTime()};
  await chrome.storage.local.set({ hiddenResources: newList });
}

export async function isHiddenResource(url: URL): Promise<boolean> {
  const site = getTrimmedHostname(url.hostname);
  const page = site + url.pathname;
  let isHidden = false;

  const now = Date.now();
  const hiddenResources = await getHiddenResources();
  let cleanupExecuted = false;

  for (const type of [page, site]) {
    if (hiddenResources.hasOwnProperty(type)) {
      const resourceAvailabilityTimestamp = hiddenResources[type];

      if (!resourceAvailabilityTimestamp) {
        throw new Error(`Availability timestamp for resource '${type}' was not found or is invalid!`);
      }

      if (now < resourceAvailabilityTimestamp) {
        isHidden = true;
      }
      if (now >= resourceAvailabilityTimestamp) {
        delete hiddenResources[type];
        cleanupExecuted = true;
      }
    }
  }

  if (cleanupExecuted) {
    await chrome.storage.local.set({hiddenResources: hiddenResources});
  }

  console.log('isHiddenResource:', isHidden);
  return isHidden;
}

export async function getHiddenResources(): Promise<hiddenResources> {
  const stored = await chrome.storage.local.get('hiddenResources');
  return stored.hiddenResources as hiddenResources || {};
}

export async function deleteHideSettings() {
  await chrome.storage.local.remove('hiddenResources');
}
