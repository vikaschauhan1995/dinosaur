import { getLocalStorageDataByKey } from './getLocalStorageDataByKey.js';
import { HIGH_SCORE_LOCALSTORAGE_KEY } from './const.js';

export function getHighScore() {
  const n = parseInt(getLocalStorageDataByKey(HIGH_SCORE_LOCALSTORAGE_KEY));
  if (n) {
    if (typeof n === 'number') {
      return n;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}