// check domains
function isFakeNewsDomain(domains, hostname) {
    // check sites - one domain .com
    var domain_tld = getDomainInTwoLevels(hostname);
    if (isInList(domains, domain_tld)) {
        return 1;
    }

    // check sites like - double domain .co.uk
    var subdomain_domain_tld = getDomainInThreeLevels(hostname);
    if (isInList(domains, subdomain_domain_tld)) {
        return 1;
    }
    return 0;
}

function isInList(domains, host) {
    return (domains.indexOf(host) !== -1);
}

function getDomainInTwoLevels(hostname) {
    return hostname.split('.').splice(-2).join('.');
}

function getDomainInThreeLevels(hostname) {
    return hostname.split('.').splice(-3).join('.');
}
