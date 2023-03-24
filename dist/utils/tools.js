"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFakeNewsDomain = void 0;
// check domains
const isFakeNewsDomain = (domains, hostname) => {
    // check sites - one domain .com
    const domain_tld = getDomainInTwoLevels(hostname);
    if (isInList(domains, domain_tld)) {
        return true;
    }
    // check sites like - double domain .co.uk
    const subdomain_domain_tld = getDomainInThreeLevels(hostname);
    return isInList(domains, subdomain_domain_tld) ? true : false;
};
exports.isFakeNewsDomain = isFakeNewsDomain;
const isInList = (domains, host) => domains.indexOf(host) !== -1;
const getDomainInTwoLevels = (hostname) => hostname.split('.').splice(-2).join('.');
const getDomainInThreeLevels = (hostname) => hostname.split('.').splice(-3).join('.');
//# sourceMappingURL=tools.js.map