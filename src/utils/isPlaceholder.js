// Shared helper: data fields that haven't been filled in yet are written as
// "[ADD ...]" in the data files. Use this to skip rendering that field
// instead of showing the raw bracket text on the live site.
export function isPlaceholder(value) {
  return typeof value !== 'string' || value.trim().startsWith('[')
}
