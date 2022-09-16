function hasLength(any) {
  if (any === null)               { return false }
  if (typeof any === "undefined") { return false }
  return any.length > 0;
}
export { hasLength }
