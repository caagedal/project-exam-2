/**
 * Sanitizes an email address by trimming whitespace and removing invalid characters.
 *
 * @param {string} email - The email address to sanitize.
 * @returns {string} The sanitized email address.
 */
export default function sanitizeMail(email) {
  const trimmed = email.trim();
  return trimmed.replace(/[^a-zA-Z0-9@.!#$%&'*+/=?^_`{|}~-]/g, '');
}