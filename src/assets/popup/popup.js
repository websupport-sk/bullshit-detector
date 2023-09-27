const deleteWhitelistButton = document.getElementById('delete-whitelist');
const updateDatabaseButton = document.getElementById('update-database');

deleteWhitelistButton.addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage({
    messageType: 'deleteWhitelistRequest',
  });
  if (response.success) {
    alert('Resetovanie skrývania banneru prebehlo úspešne.\n\n' +
      'Banner sa bude zobrazovať na všetkých nedôveryhodných stránkach.');
  }
});

updateDatabaseButton.addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage({
    messageType: 'updateDatabaseRequest',
  });

  if (response?.success) {
    showLastDatabaseUpdateTime(response.lastUpdate);
    alert('Databáza bola úspešne aktualizovaná.');
  }
});

function showLastDatabaseUpdateTime(date) {
  const lastDatabaseUpdateDateElement = document.getElementById('last-database-update-date');
  lastDatabaseUpdateDateElement.textContent = date;
}

(async function displayLastDatabaseUpdateTime() {
  const response = await chrome.runtime.sendMessage({
    messageType: 'getLastDatabaseUpdateRequest',
  });

  if (response?.success) {
    showLastDatabaseUpdateTime(response.lastUpdate);
  }
})();
