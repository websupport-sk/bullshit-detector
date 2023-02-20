// check domains
export const isFakeNewsDomain = (domains, hostname)  => {
    // check sites - one domain .com
    const domain_tld = getDomainInTwoLevels(hostname);
    if (isInList(domains, domain_tld)) {
        return true;
    }

    // check sites like - double domain .co.uk
    const subdomain_domain_tld = getDomainInThreeLevels(hostname);

    return isInList(domains, subdomain_domain_tld) ? true : false
}

const isInList = (domains, host) =>  domains.indexOf(host) !== -1 ;
const getDomainInTwoLevels = (hostname) => hostname.split('.').splice(-2).join('.')
const getDomainInThreeLevels = (hostname) => hostname.split('.').splice(-3).join('.');
