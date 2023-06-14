// check domains
import {
  DomainScores,
  PermanentlyHiddenResources,
  Score,
  TemporarilyHiddenResources
} from '../types/types';
import {getDomains} from './domains';

export const isFakeNewsDomain = async (hostname: string)  => {
  const domains: DomainScores = await getDomains();
  // check sites - one domain .com
  const domain_tld = getDomainInTwoLevels(hostname);
  if (isInList(domains, domain_tld)) {
    return true;
  }

  // check sites like - double domain .co.uk
  const subdomainInDomainTld = getDomainInThreeLevels(hostname);

  return isInList(domains, subdomainInDomainTld);
};

const isInList = (domains: DomainScores, host: string) =>  Object.keys(domains).indexOf(host) !== -1 ;
const getDomainInTwoLevels = (hostname: string) => hostname.split('.').splice(-2).join('.');
const getDomainInThreeLevels = (hostname: string) => hostname.split('.').splice(-3).join('.');

export const getDomainScore = async (hostname: string): Promise<Score> => {
  hostname = getTrimmedHostname(hostname);

  try {
    const data = await chrome.storage.local.get('domainScores');
    return data.domainScores[hostname].toString().replace('.', ',');
  } catch (_) {
    return '';
  }
};


export const isHiddenResource = async (url: URL): Promise<boolean> => {
  const site = getTrimmedHostname(url.hostname);
  const page = site + url.pathname;
  let isHidden = false;

  const permanentlyHiddenResources = await getPermanentlyHiddenResources();
  if (permanentlyHiddenResources.includes(site) || permanentlyHiddenResources.includes(page)) {
    isHidden = true;
  }

  const now = Date.now();
  const temporarilyHiddenResources = await getTemporarilyHiddenResources();
  let cleanupExecuted = false;

  for (const type of [page, site]) {
    if (temporarilyHiddenResources.hasOwnProperty(type)) {
      const resourceAvailabilityTimestamp = temporarilyHiddenResources[type];

      if (!resourceAvailabilityTimestamp) {
        throw new Error(`Availability timestamp for resource '${type}' was not found or is invalid!`);
      }

      if (now < resourceAvailabilityTimestamp) {
        isHidden = true;
      }
      if (now >= resourceAvailabilityTimestamp) {
        delete temporarilyHiddenResources[type];
        cleanupExecuted = true;
      }
    }
  }

  if (cleanupExecuted) {
    await chrome.storage.local.set({temporarilyHiddenResources});
  }

  return isHidden;
};


export const getTrimmedHostname = (hostname: string) => {
  return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
};

export const getPermanentlyHiddenResources = async (): Promise<PermanentlyHiddenResources> => {
  const stored = await chrome.storage.local.get('permanentlyHiddenResources');
  return stored.permanentlyHiddenResources as PermanentlyHiddenResources || [];
};

export const getTemporarilyHiddenResources = async (): Promise<TemporarilyHiddenResources> => {
  const stored = await chrome.storage.local.get('temporarilyHiddenResources');
  return stored.temporarilyHiddenResources as TemporarilyHiddenResources || {};
};
