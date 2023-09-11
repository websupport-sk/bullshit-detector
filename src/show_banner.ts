import {DomainDetail, HideDuration, HideRequest, HideType} from './types';

export function showBanner(domainDetail: DomainDetail, hostname = '')  {

  // label code, not people
  main: {
    const usesFrameset = document.body.nodeName === 'FRAMESET';
    if (usesFrameset) {
      handleFramesetWebsites();
    } else {
      const shadowRoot = createShadowDOM();
      loadFonts();
      showBanner(shadowRoot, domainDetail, hostname);
      addEventListeners(shadowRoot);
    }
  }

  function handleFramesetWebsites(): void {
    const choice = confirm(`Bullshit Detector: Táto stránka je nedôveryhodná so skóre ${domainDetail.score}.\n\n` +
          'Želáte si zistiť viac na webe konspiratori.sk?');
    if (choice) {
      window.open(domainDetail.reportUrl, '_blank');
    }
  }

  function createShadowDOM(): ShadowRoot {
    const shadowHost = document.createElement('div');
    shadowHost.style.zIndex = '2147483647';
    shadowHost.style.position = 'fixed';
    shadowHost.style.top = '0';
    shadowHost.style.left = '0';
    document.body.prepend(shadowHost);
    return shadowHost.attachShadow({mode: 'closed'});
  }

  function loadFonts(): void {
    const fontFaces = [
      {name: 'Normal', weight: '400'},
      {name: 'Bold', weight: '700'},
      {name: 'ExtraBold', weight: '800'}
    ];

    for (const fontFace of fontFaces) {
      const fontUrl = chrome.runtime.getURL(`src/assets/fonts/WebsupportSans-${fontFace.name}.woff2`);
      document.fonts.add(
        new FontFace(
          'WebsupportSans',
          `url('${fontUrl}')`,
          {weight: fontFace.weight}
        )
      );
    }
  }


  function showBanner(shadowRoot, domainDetail, hostname): void {
    shadowRoot.innerHTML = `
        <link
            type="text/css"
            href="${chrome.runtime.getURL('src/assets/styles/styles_of_beyond.css')}"
            rel="stylesheet"
        >
        <div id="bd-banner">
          <div class="container">
            <div class="main-row">
              <div class="padding-left">
                <p class="title text-big text-extra-bold">Nedôveryhodný web!</p>
                <div>
                  <p class="subtitle text-medium">
                    Zvýšte opatrnosť, táto stránka je zaradená v zozname
                    <br>
                    nedôveryhodných webov so skórei
                  </p>
                  <div style="display: inline-block">
                    <div class="score-wrapper">
                      <span class="score text-medium text-bold">${domainDetail.score}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cary-wrapper">
                <img src="${chrome.runtime.getURL('src/assets/img/cary.png')}" alt="cary logo" id="cary" class="cary" />
              </div>
            </div>
            <div id="bottom-row">
              <div class="left padding-left">
                <a href="${domainDetail.reportUrl}" target="_blank">
                  <span class="text-red">zistite viac na</span> konspiratori.sk
                </a>
              </div>
              <div class="center">
                <button id="close-button" class="text-red">zavriet</button>
                <button id="expand-button">&nbsp;</button>
              </div>
            </div>
            <div id="collapsible-row">
              <div class="left">
              </div>
              <div class="center">
                <span>Chcem skryť toto upozornenie na
                    <select id="hide-type" class="text-red">
                      <option value="page">tejto stránke</option>
                      <option value="site">celom webe ${getTrimmedHostname(hostname)}</option>
                    </select>
                  na
                  <select id="hide-duration" class="text-red">
                      <option value="day">24 hodín</option>
                      <option value="week">týždeň</option>
                      <option value="kim_nesmazu">neobmedzene dlho</option>
                  </select>
                </span>
                <button id="hide-button">skryť</button>
              </div>
              <div class="right">
                <a href="https://whois.domaintools.com/${getTrimmedHostname(hostname)}"
                 target="_blank"
                 class="external-link"
                 >
                  podrobnosti o registrácii domény
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
  }

  function addEventListeners(shadowRoot): void {

    const hideButton = shadowRoot.getElementById('hide-button');
    const closeButton = shadowRoot.getElementById('close-button');
    const expandButton = shadowRoot.getElementById('expand-button');

    closeButton.addEventListener('click', function (){ closeBanner(shadowRoot); });
    expandButton.addEventListener('click', function (){ toggleCollapsibleRow(shadowRoot); });
    hideButton.addEventListener('click', async function (){ await hideBanner(shadowRoot); });

    function toggleCollapsibleRow(shadowRoot) {
      const collapsibleRow = shadowRoot.getElementById('collapsible-row');
      const expandButton = shadowRoot.getElementById('expand-button');

      collapsibleRow.classList.toggle('open');
      expandButton.classList.toggle('rotate');
    }

    function closeBanner(shadowRoot) {
      const bdBanner = shadowRoot.getElementById('bd-banner');

      bdBanner.classList.toggle('hiding');
      setTimeout(async function () {
        bdBanner.remove();
        await chrome.runtime.sendMessage({
          messageType: 'closeWarningNotice'
        });
      }, 500);
    }

    async function hideBanner(shadowRoot): Promise<void> {
      const hideType: HideType = shadowRoot.getElementById('hide-type').value;
      const hideDuration: HideDuration = shadowRoot.getElementById('hide-duration').value;
      const url = new URL(window.location.href);
      const hostname = getTrimmedHostname(url.hostname);

      let hiddenResource = hostname;

      if (hideType === 'page') {
        hiddenResource = hostname.concat(url.pathname);
      } // if hideType is site, hiddenResource is merely the hostname

      await chrome.runtime.sendMessage({
        messageType: 'hideRequest',
        hideType,
        hideDuration,
        hiddenResource,
      } as HideRequest);

      closeBanner(shadowRoot);
    }
  }

  function getTrimmedHostname(hostname: string): string {
    return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
  }
}
