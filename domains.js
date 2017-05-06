var domains = [];

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.konspiratori.sk/assets/downloads/zoznam.txt');
xhr.send(null);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var data = xhr.responseText;
      domains = data.split(/\r?\n/);
      console.log("Načítaných "+domains.length+" domén.")
    } else {
      console.log('Nepodarilo sa načítať zoznam domén: ' + xhr.status);
    }
  }
};