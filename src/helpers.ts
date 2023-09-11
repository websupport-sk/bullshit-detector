// check domains


export const getTrimmedHostname = (hostname: string) => {
  return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
};

