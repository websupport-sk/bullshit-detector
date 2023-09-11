// check domains
import {DomainDetail, DomainScores} from '../types/types';
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

export const getDomainDetail = async (hostname: string): Promise<DomainDetail> => {
  hostname = getTrimmedHostname(hostname);

  try {
    const data = await chrome.storage.local.get('domainScores');
    return data.domainScores[hostname];
  } catch (_) {
    return {score: '', reportUrl: ''};
  }
};


export const getTrimmedHostname = (hostname: string) => {
  return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
};

