export function isCapitalize(str: string) {
  if (str.length === 0) return false;

  return str[0] === str[0].toUpperCase();
}
