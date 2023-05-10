// check domains
export const isFakeNewsDomain = (domains: Record<string, string>, hostname: string)  => {
  // check sites - one domain .com
  const domain_tld = getDomainInTwoLevels(hostname);
  if (isInList(domains, domain_tld)) {
    return true;
  }

  // check sites like - double domain .co.uk
  const subdomainInDomainTld = getDomainInThreeLevels(hostname);

  return isInList(domains, subdomainInDomainTld);
};

const isInList = (domains: Record<string, string>, host: string) =>  Object.keys(domains).indexOf(host) !== -1 ;
const getDomainInTwoLevels = (hostname:string) => hostname.split('.').splice(-2).join('.');
const getDomainInThreeLevels = (hostname:string) => hostname.split('.').splice(-3).join('.');
