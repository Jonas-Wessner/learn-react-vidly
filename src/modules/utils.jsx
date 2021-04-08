export function empty(obj) {
  if (obj === null || obj === undefined) return true;

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  return Object.keys(obj).length === 0;
}
