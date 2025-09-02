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
