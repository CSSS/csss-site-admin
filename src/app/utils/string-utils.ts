/**
 * Slugify function, based off the backend's version.
 * @param text - Text to slugify
 * @returns The text slugified.
 */
export function slugify(text: string): string {
  return text
    .trim()
    .replace(/[/&]/g, '') // remove / and &
    .replace(/[\W_]+/g, '-'); // replace non-word characters and underscores with hyphen
}

/**
 * Returns an ISO 8601 datetime string without timezone information.
 * @param date - Date to convert
 * @returns string in ISO 8601 format without timezone info
 */
export function isoNaiveDatetime(date: Date | undefined): string | undefined {
  return date?.toISOString().slice(0, -1) ?? undefined;
}
