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

// When using box-sizing: border-box; the popup in Chromium shrinks to an unusably narrow box.
// For this reason, a separate style sheet is used for the iPhone to handle body paddings,
// which would otherwise cause horizontal overflow in the modal sheet.
(function loadIphoneStyles() {
  if (navigator?.userAgent.includes('iPhone')) {
    const element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', 'iPhone.css');
    document.getElementsByTagName('head')[0].appendChild(element);
  }
}());
