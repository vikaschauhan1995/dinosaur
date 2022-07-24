import { getLocalStorageDataByKey } from './getLocalStorageDataByKey.js';
import { setLocalStorageDataByKey } from './setLocalStorageDataByKey.js';
import { HIGH_SCORE_LOCALSTORAGE_KEY } from './const.js';
import { getHighScore } from './getHighScore.js';

export function isHighScore(score) {
  const oldHighScore = getHighScore();
  if (oldHighScore < score) {
    // debugger;
    setLocalStorageDataByKey(HIGH_SCORE_LOCALSTORAGE_KEY, score);
  }
}