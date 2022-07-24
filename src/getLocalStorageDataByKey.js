

export function getLocalStorageDataByKey(key) {
  const s = localStorage.getItem(key);
  if (s) {
    return s;
  } else {
    return undefined;
  }
}