/**
 * set item in localstorage with ttl
 * @param key key to save in localstorage
 * @param value value to save in localstorage
 * @param ttl time to live in milliseconds. Default value is 0 and has no ttl.
 */
export function setItemWithExpiry(key, value, ttl = 0) {
  const now = new Date();
  const item = {value, expiry: ttl === 0 ? ttl : now.getTime() + ttl}
  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry(key) {
  const item = localStorage.getItem(key);
  if (!item) return;

  const {expiry, value} = JSON.parse(item);

  if (!expiry) return value;
  if (isExpired(expiry)) {
    localStorage.removeItem(key);
    return;
  }

  return value;
}

function isExpired(expiry) {
  if (expiry === 0) return false;
  const now = new Date();

  return now.getTime() > expiry;
}

