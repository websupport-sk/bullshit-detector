const link_report = 'https://konspiratori.sk/nahlasenie-stranky';
const link_about = 'https://www.websupport.sk/bullshit-detector';
const link_konspiratori = 'https://www.konspiratori.sk/';
const link_websupport = 'https://www.websupport.sk/';
document.getElementById('report').href = link_report;
document.getElementById('about').href = link_about;
document.getElementById('konspiratori').href = link_konspiratori;
document.getElementById('websupport').href = link_websupport;
const deleteHideSettingsButton = document.getElementById('delete_hide_settings');
const updateDatabaseButton = document.getElementById('update-database');

deleteHideSettingsButton.addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage({
    messageType: 'deleteHideSettingsRequest',
  });
  if (response.success) {
    const indicator = document.getElementById('delete_hide_settings_success');
    indicator.style.display = 'block';
    deleteHideSettingsButton.disabled = true;
  }
});


function showLastDatabaseUpdateTime(date) {
  const lastDatabaseUpdateDateElement = document.getElementById('last-database-update-date');
  lastDatabaseUpdateDateElement.textContent = date;
}

function showNextDatabaseUpdateTime(date) {
  const nextDatabaseUpdateDateElement = document.getElementById('next-database-update-date');
  nextDatabaseUpdateDateElement.textContent = date;
}

updateDatabaseButton.addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage({
    messageType: 'updateDatabaseRequest',
  });

  if (response.success) {
    showLastDatabaseUpdateTime(response.lastUpdate);
    showNextDatabaseUpdateTime(response.nextUpdate);
  }
});

(async function displayLastDatabaseUpdateTime() {
  const response = await chrome.runtime.sendMessage({
    messageType: 'getLastDatabaseUpdateRequest',
  });

  if (response?.success) {
    showLastDatabaseUpdateTime(response.lastUpdate);
    showNextDatabaseUpdateTime(response.nextUpdate);
  }
})();




