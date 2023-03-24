export const getDomains = (): Record<string, string> => {

  let lastDatabaseUpdate = parseInt(localStorage.getItem('lastDatabaseUpdate')!);
  let domainScores = JSON.parse(localStorage.getItem('domainScores')!);

  const incompleteData = lastDatabaseUpdate === null || isNaN(lastDatabaseUpdate) || domainScores === null;
  const obsoleteData = Date.now() - lastDatabaseUpdate > 1000 * 60 * 60 * 24 * 7; // 7 days

  if (incompleteData || obsoleteData) {
    domainScores = fetchAndStoreDomains();
  }

  return domainScores;
};


async function fetchAndStoreDomains(): Promise<Record<string, string>> {
  let domainScores: Record<string, string> = {};

  try {
    const domainsFile = await fetch('http://127.0.0.1:8887/zoznam.txt');
    const text = await domainsFile.text();

    const lines = text.split('\n');

    for (const line of lines) {
      let url: string, score: string;
      [url, score] = line.split(',');
      domainScores[url] = score;
    }

    localStorage.setItem('domainScores', JSON.stringify(domainScores));
    saveLastDatabaseUpdateTimeStamp();
  } catch (error) {
    // todo load fallback scores from file
  }

  // TODO we are expecting to get this in form of array
  return domainScores;
}


function saveLastDatabaseUpdateTimeStamp(): void {
  const currentTimeStamp = Date.now();
  localStorage.setItem('lastDatabaseUpdate', currentTimeStamp.toString());
}
