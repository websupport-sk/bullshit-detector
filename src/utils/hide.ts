import {HideRequest} from '../types/types';
import {getPermanentlyHiddenResources, getTemporarilyHiddenResources} from './tools';

export const hideRequestHandler = async (request: HideRequest) => {
  if (request.hideDuration === 'indefinitely') {
    const oldList = await getPermanentlyHiddenResources();
    const newList = [request.hiddenResource].concat(oldList);
    await chrome.storage.local.set({ permanentlyHiddenResources: newList });
    return;
  }

  const hideExpirationDate = new Date();

  switch (request.hideDuration) {
  case 'day':
    hideExpirationDate.setHours(hideExpirationDate.getHours() + 24);
    break;
  case 'week':
    hideExpirationDate.setHours(hideExpirationDate.getHours() + 24 * 7);
    break;
  }

  const oldList = await getTemporarilyHiddenResources();
  const newList = {...oldList, [request.hiddenResource]: hideExpirationDate.getTime()};
  await chrome.storage.local.set({ temporarilyHiddenResources: newList });
};

export const deleteHideSettings = async () => {
  await chrome.storage.local.remove([ 'temporarilyHiddenResources', 'permanentlyHiddenResources']);
};

