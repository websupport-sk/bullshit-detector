// last update 2022-07-11
// RegEx (,).*
var domains = [
  'vigilantcitizen.com',
  'protiprudu.org',
  'aeronet.news',
  'biblik.sk',
  'orgo-net.blogspot.sk',
  'aeronet.cz',
  'conspi.cz',
  'nwoo.org',
  'geneticka-vakcina.com',
  'arfa.cz',
  'exopolitika.cz',
  'badatel.net',
  'czechfreepress.cz',
  'qanon.sk',
  'zemavek.sk',
  'stratenaeuropa.sk',
  'bnw-nwo.wz.cz',
  'protiprud.sk',
  'protiproud.cz',
  'blokprotiislamizaci.cz',
  'afinabul.blog.cz',
  'prvopodstata.com',
  'stalo-se.cz',
  'slobodavockovani.sk',
  'magnificat.sk',
  'nekorektni-tv.cz',
  'veksvetla.cz',
  'sho.sk',
  'tadesco.org',
  'nadhlad.com',
  'pravdive.eu',
  'bezpolitickekorektnosti.cz',
  'freeglobe.cz',
  'stop5g.cz',
  'svobodnenoviny.eu',
  'vedomec.com',
  'anti-illuminati.wbl.sk',
  'leva-net.webnode.cz',
  'vlasteneckenoviny.cz',
  'novarepublika.cz',
  'rukojmi.cz',
  'rozhladna.org',
  'yournewswire.com',
  'kralicianora.org',
  'slobodnyvysielac.sk',
  'ezopress.sk',
  'prekladyodlesa.sk',
  'pokec24.cz',
  'obcianskytribunal.sk',
  'infowars.cz',
  'idemvolit.sk',
  'tadesco.cz',
  'eurasia24.cz',
  'nemesis.sk',
  'euronoviny.eu',
  'zahadnysvet.sk',
  'dobajedu.cz',
  'tartaria.sk',
  'energieupramene.blogspot.sk',
  'planetajednoduchost.sk',
  'dostojneslovensko.eu',
  'ac24.cz',
  'informace.top',
  'petrabostlova.wordpress.com',
  'alternativnimagazin.cz',
  'isstras.eu',
  'infokuryr.cz',
  'zvtv.sk',
  'cz24.news',
  'voxpopuliblog.cz',
  'prehladsprav.sk',
  'picuscapital.sk',
  'suenee.cz',
  'megazine.cz',
  'je-to-inak.livejournal.com',
  'naturalnews.com',
  'necenzurovane.net',
  'priznakytransformace.cz',
  'nadlani.org',
  'mysteria.sk',
  'freedomeurope.eu',
  'lifenews.sk',
  'samvojakvpoli.sk',
  'otevrisvoumysl.cz',
  'naseveru.org',
  'eurabia.cz',
  'euportal.cz',
  'euserver.cz',
  'proevropu.com',
  'cestyksobe.cz',
  'ceskoaktualne.cz',
  'pravyprostor.cz',
  'infovojna.bz',
  'podtatransky-kurier.sk',
  'sk.news-front.info',
  'kulturblog.sk',
  'karolinaloskotova.blog.cz',
  'nejhorsi.cz',
  'osud.cz',
  'ers.blog.cz',
  'infovojna.sk',
  'rudovasky.com',
  'tydenikobcanskepravo.cz',
  'procproto.cz',
  'bajecnezeny.sk',
  'casopis-sifra.cz',
  'svetkolemnas.info',
  'vipnoviny.cz',
  'kanal22.cz',
  'poockovani.cz',
  'inenoviny.sk',
  'ceskavec.com',
  'freepub.cz',
  'dt24.cz',
  'zdraveforum.cz',
  'rizikaockovania.sk',
  'slovanskenoviny.sk',
  'desitka.org',
  'radyzdravie.sk',
  'skrytapravda.cz',
  'priezor.com',
  'panobcan.sk',
  'slobodnyvyber.sk',
  'nazorobcana.sk',
  'silavedomia.sk',
  'stopislam.eu',
  'badatelia.com',
  'zvedavec.org',
  'cz.sputniknews.com',
  'southfront.org',
  'nejvic-info.cz',
  'euroasie.info',
  'wmmagazin.cz',
  'wertyzreport.cz',
  'e-republika.cz',
  'obcansky-tydenik.cz',
  'cbreurope.sk',
  'cestacloveka.sk',
  'mcaris.net',
  'paratdnes.cz',
  'venuska.cz',
  'biosferaklub.info',
  'medzicas.sk',
  'gloria.tv',
  'otvoroci.com',
  'extraplus.sk',
  'lajkit.cz',
  'bajecnezdravie.sk',
  'radyprezdravie.sk',
  'radyprezeny.sk',
  'eurorespekt.sk',
  'faktyadokazy.cc',
  'mocvedomi.cz',
  'datel.sk',
  'breitbart.com',
  'drsne.sk',
  'slovenskeslovo.sk',
  'domacaliecba.sk',
  'themindunleashed.com',
  'alatyr.sk',
  'slovinfos.sk',
  'dennik-dnes.sk',
  'magazinslovensko.online',
  'reformy.cz',
  'aktuality24.sk',
  'legalizuj.to',
  'narodninoviny.cz',
  'fresher.sk',
  'radynadzlato.sk',
  'outsidermedia.cz',
  'arindrexler.com',
  'lucasperny.blog.pravda.sk',
  'ceskozdrave.cz',
  'odbornakomisia.sk',
  'resetheus.org',
  'torden.sk',
  'eportal.cz',
  'skspravy.sk',
  'elektrosmog.voxo.eu',
  'politickemimovladky.sk',
  'dolezite.sk',
  'napalete.sk',
  'vylectese.cz',
  'bajecnylekar.sk',
  'christianitas.sk',
  'magazin1.sk',
  'gancovky.sk',
  'veci-verejne.sk',
  'jenona.tiscali.cz',
  'zpravodaj24.eu',
  'rozhlady.sk',
  'woman.tiscali.cz',
  'slovenskoaktualne.sk',
  'meapatria.sk',
  'kupredudominulosti.cz',
  'ipribeh.cz',
  'slovakexportregister.eu',
  'ozonyx.cz',
  'sknews.sk',
  'armadnymagazin.sk',
  'weeks.cz',
  'prvnizpravy.cz',
  'davdva.sk',
  'svedomi-naroda.cz',
  'mimoriadnespravy.sk',
  'resso.sk',
  'somzena.sk',
  'vitalitis.cz',
  'stredoevropan.cz',
  'medicalcentrum.eu',
  'nitranoviny.sk',
  'spravodaj.net',
  'withform.cz',
  'trendweb.sk',
  'hrot.info',
  'precitaj.si',
  'babickinerady.sk',
  'svobodnymonitor.cz',
  'bajecnylekar.cz',
  'parlamentne-volby-2016.sk',
  'pravda24.cz',
  'farmazdravi.cz',
  'presstv.sk',
  'zlapanda.cz',
  'eurodenik.cz',
  'onlineslecna.sk',
  'bajecnyzivot.sk',
  'dennikpolitika.sk',
  'prosvet.cz',
  'halonoviny.com',
  'polemag.sk',
  'epochtimes.cz'
];
