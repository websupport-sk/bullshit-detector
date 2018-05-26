var link_report = "https://www.konspiratori.sk/nahlasenie-stranky.php";
var link_about = "https://www.websupport.sk/bullshit-detector";
var link_konspiratori = "https://www.konspiratori.sk/";
var link_websupport = "https://www.websupport.sk/";

function setLink(elementId, url) {
    document.getElementById(elementId).href = url;
}

function setText(key) {
    document.getElementById(key).innerHTML = chrome.i18n.getMessage(key);
}

setLink("dialog_report", link_report);
setLink("dialog_about", link_about);
setLink("dialog_konspiratori", link_konspiratori);
setLink("dialog_websupport", link_websupport);

setText("dialog_doubts");
setText("dialog_check");
setText("dialog_report");
setText("dialog_about");
