import {WhitelistRequest, whitelistedResources} from './types';
import {getTrimmedHostname} from './helpers';

export async function whitelistRequestHandler(request: WhitelistRequest) {
  const whitelistExpirationDate = new Date();

  switch (request.whitelistDuration) {
  case 'day':
    whitelistExpirationDate.setHours(whitelistExpirationDate.getHours() + 24);
    break;
  case 'week':
    whitelistExpirationDate.setHours(whitelistExpirationDate.getHours() + 24 * 7);
    break;
  case 'kim_nesmazu':
    whitelistExpirationDate.setFullYear(28_8_19,4,4);
    break;
  }

  const oldList = await getWhitelistedResources();
  const newList = {...oldList, [request.whitelistedResource]: whitelistExpirationDate.getTime()};
  await chrome.storage.local.set({ whitelistedResources: newList });
}

export async function isWhitelisted(url: URL): Promise<boolean> {
  const site = getTrimmedHostname(url.hostname);
  const page = site + url.pathname;
  let isWhitelisted = false;

  const now = Date.now();
  const whitelistedResources = await getWhitelistedResources();
  let cleanupExecuted = false;

  for (const type of [page, site]) {
    if (whitelistedResources.hasOwnProperty(type)) {
      const resourceAvailabilityTimestamp = whitelistedResources[type];

      if (!resourceAvailabilityTimestamp) {
        throw new Error(`Availability timestamp for resource '${type}' was not found or is invalid!`);
      }

      if (now < resourceAvailabilityTimestamp) {
        isWhitelisted = true;
      }
      if (now >= resourceAvailabilityTimestamp) {
        delete whitelistedResources[type];
        cleanupExecuted = true;
      }
    }
  }

  if (cleanupExecuted) {
    await chrome.storage.local.set({ whitelistedResources });
  }

  return isWhitelisted;
}

export async function getWhitelistedResources(): Promise<whitelistedResources> {
  const stored = await chrome.storage.local.get('whitelistedResources');
  return stored.whitelistedResources as whitelistedResources || {};
}

export async function deleteWhitelist() {
  await chrome.storage.local.remove('whitelistedResources');
}
