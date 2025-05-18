/**
 * Returns a placeholder image URL if the provided URL is falsy.
 *
 * @param {string|null|undefined} imageUrl - The original image URL.
 * @returns {string} The original URL or the placeholder URL.
 */
export function getPlaceholderImage(imageUrl) {
  const placeholder = '/full-logo.svg';
  return imageUrl || placeholder;
}