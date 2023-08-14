import { DomainDetail, HideRequest } from '../types/types';

export const showWarning = (domainDetail: DomainDetail, hostname = '') => {
  const bullshit_detector = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // todo if this is imported, the browser throws a runtime error, look into it please
  const getTrimmedHostname = (hostname: string) => {
    return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
  };
  // notification area
  const content = `
    <div
        id="${bullshit_detector}"
        style='display: inline-block; color: #ffffff; background-color: #2b3743; z-index: 2147483647; width: 100%; top: 0; left: 0; padding: 0 !important; text-align: center; font-size: 14px; line-height: 1.5; font-family: Arial, Helvetica, sans-serif; -webkit-box-shadow: 0 10px 10px 0 rgba(0,0,0,0.5); -moz-box-shadow: 0 10px 10px 0 rgba(0,0,0,0.5); box-shadow: 0 10px 10px 0 rgba(0,0,0,0.5); position: fixed; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none;'
    >
      <div style='float: left; width: 30%; text-align: right;'>
        <img src='data:image/gif;base64,R0lGODlhNQHPAPf/AP3dprPN2+nx6cLZ5Jy0vvzKcZ7OyfTMymRscyMtN7dtcTtETNmIiWlES+R5dv379KDB0dxcWazOl0lSbury9u7u7I5MUPXU01hicNxYVfn4+OrFxKnK2nKFiqXG1uFjYPHt7MPFy+va2Le8wb3X4ue6uKmutLlVVfz8/Pr6+su7wo6Umvrj45WruszW0pyip+Ts7O3s65SZonJ6gff29q+zucXH0Nrn6fvq6sFoajQ6Rerq6LPR3qhRU+vk49NaWPG3tuno5rO2uh4nL+Pu8vT28dKprpORne2kotx+fs3j5b3Bxa3M27pJQ9Pk7N3p6peJk7BEPd5kYZaywdPj5/Dv7uydm4eNk96Eg5y8zIK1YygzPuLezv7+/uqTkf329s7iwoCHjsnd5I6su/X19NXa2/X5+tpfXcmzup6/z/Ly8emOjKbI2Pj48xsmSdTW2d9rabnU3/Tz8+qsqktSW8hYV7fN2uBgXeekosbKzaTRzO/19/H4+P75+fHw8PD08OJoZZm0xLzM16J6gkc9RpOls+NraFxBSeTl58xSTdaVmNJiYfn5+KPF1OPm6NDT1efp6+BeW+rt7r3e2+WOjPf09Jy6yv78/OWenNzbztvd4vn8/NClqeZ/fdvp8K/O3N/g5K7L2eRwbdKssEBMXOLk5/zv7+iIhp6+zeSJh8je6PHx8KDAzq7W0vPy8bbK1+Xk4uygn+Hj5vDx899nZe7x8NKCfp2hsNLo5qOor8ZOSbPZ1eeFg9bc1vCxr/Dk409XYN9wb7rQ1tdWUjdBX5u6you1suzr6vf7/OPi4KvL2tjd1ZKwv/u/VnuxWvz8+5u7y/b29Zy8y/f39p+/z/r6+ZmFjv/68qLD0/r5+f/47Jq4yJu6yPzVkB8qTCQvUP308/39/f3+/pzFg8fCy9vd3+SUkvP09Z29zJC7uOezscvPz/Dp6PTf3vn5+b/Y4qvF0/X29pe3xuGal+mYltNaVtiOjriZnefm5PHw7xkhKafJ2eBdWis3Q////////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUIzNjI3QTEyMTA2MTFFN0I5NUNEREQwMDIyRjlCNUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUIzNjI3QTIyMTA2MTFFN0I5NUNEREQwMDIyRjlCNUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RjlCMjk4ODIxMDQxMUU3Qjk1Q0RERDAwMjJGOUI1QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQjM2MjdBMDIxMDYxMUU3Qjk1Q0RERDAwMjJGOUI1QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5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AAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAAh+QQFAwD/ACwAAAAAAQABAAAIBAD/BQQAIfkEBQMA/wAsAAAAAAEAAQAACAQA/wUEACH5BAUDAP8ALAAAAAABAAEAAAgEAP8FBAA7'
            alt="Ilustračný obrázok"
        >
      </div>
      <div style='float: left; padding-left: 60px;'>
        <div style='color: #ffffff; text-align: left; text-transform: uppercase; padding-top: 65px; font-size: 24px; font-style: normal; font-variant: normal; font-weight: 500;line-height: 31px; letter-spacing: 1px;'>
          Zvýšte opatrnosť!<br/>
          Táto stránka je zaradená v zozname<br>
          nedôveryhodných webov so skóre <span style="color: #DA5653">${domainDetail.score}</span>.<br/>
        </div>
        <span style='color: #ffffff; text-align:left; float:left; font-size:14px; padding-top:25px; padding-bottom:5px;'>
        Zistite viac na <a href="${domainDetail.reportUrl}" target='_blank' style='color: #6fa79e; font-weight: bold; text-decoration: underline;'>konspiratori.sk</a>
        </span>
        <span id='bullshit_detector_dismiss' style='color: #ffffff; text-align: left; float: right; font-size: 14px; padding-top: 25px; padding-bottom: 5px;text-decoration: underline;cursor: pointer;'>
        Zavrieť upozornenie
        </span>
        <br style='clear: left;' />
        <div>
          <a href=https://whois.domaintools.com/${getTrimmedHostname(hostname)} target="_blank">
            Podrobnosti o registracii domeny
          </a>
        </div>
        chcem skryt toto upozornenie na
        <select id="hide-type">
            <option value="page">tejto stranke</option>
            <option value="site">celom webe ${getTrimmedHostname(hostname)}</option>
        </select>
        na
        <select id="hide-duration">
            <option value="day">24 hodin</option>
            <option value="week"">tyzden</option>
            <option value="indefinitely">Neobmedzene dlho</option>
        </select>
        <button id="test-button">Skryť</button>
      </div>
    </div>
  `;

  document.body.innerHTML = content + document.body.innerHTML;

  function closeWarning() {
    document.getElementById(bullshit_detector).remove();
  }

  // close notification
  const close = document.getElementById('bullshit_detector_dismiss');
  close.addEventListener('click', closeWarning);

  // close notification
  const test = document.getElementById('test-button');
  test.addEventListener('click',async function() {
    // @ts-ignore
    const hideType = document.getElementById('hide-type').value;
    // @ts-ignore
    const hideDuration = document.getElementById('hide-duration').value;
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

    closeWarning();
  });
};


