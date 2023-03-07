export function shortString(id: string): string {
  if (!id) return ''
  return id.slice(0,5) + '...' + id.slice(id.length - 4)
}
export function capitalize(str: string): string {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}