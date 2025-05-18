/**
 * Saves a value to localStorage under the specified key.
 *
 * @param {string} key - The storage key.
 * @param {*} value - The value to store (will be stringified).
 * @example
 * setLocal('user', { name: 'Imogen', id: 3 });
 */
export function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves and parses a JSON value from localStorage by key.
 *
 * @param {string} key - The storage key.
 * @returns {*} Parsed value, or null if not found.
 */
export function getLocal(key) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Removes a value from localStorage by key.
 *
 * @param {string} key - The storage key to remove.
 * @example
 * removeLocal('user');
 */
export function removeLocal(key) {
  localStorage.removeItem(key);
}

/**
 * Clears all data from localStorage.
 */
export function clearLocal() {
  localStorage.clear();
}