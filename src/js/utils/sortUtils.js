/**
 * Returns sorting parameters for venue listings based on a selected option.
 *
 * @param {string} option - Sorting option key (e.g., "newest", "name-asc").
 * @returns {{ sortField: string, sortOrder: string }} Object with sortField and sortOrder properties.
 */
export function getSortParams(option) {
  switch (option) {
    case 'newest':
      return { sortField: 'created', sortOrder: 'desc' };
    case 'name-asc':
      return { sortField: 'name', sortOrder: 'asc' };
    case 'name-desc':
      return { sortField: 'name', sortOrder: 'desc' };
    case 'price-asc':
      return { sortField: 'price', sortOrder: 'asc' };
    case 'price-desc':
      return { sortField: 'price', sortOrder: 'desc' };
    case 'stars-asc':
      return { sortField: 'rating', sortOrder: 'asc' };
    case 'stars-desc':
      return { sortField: 'rating', sortOrder: 'desc' };
    default:
      return { sortField: 'created', sortOrder: 'desc' };
  }
}
