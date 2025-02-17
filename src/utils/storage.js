/**
 * Saves data to localStorage. 
 * @param {String} key - storage key
 * @param {*} value - store value
 * @example
 * setLocal('user', { name: 'Imogen', id: 3});
 */
export function setLocal(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 
 * @param {string} key 
 * @returns Parsed data or null if no data found
 */
export function getLocal(key){
    const retrivedValue = localStorage.getItem(key);
    return retrivedValue ? JSON.parse(retrivedValue) : null;
}

/**
 * Removes key from localStorage
 * @param {string} key 
 * @example
 * removeLocal('user');
 */
export function removeLocal(key){
    localStorage.removeItem(key);
}

/**
 * Clears all data from localStorage
 */
export function clearLocal(){
    localStorage.clear();
}