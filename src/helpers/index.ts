export const parseBoolean = (value: string | boolean | undefined, defaultValue: boolean) => {
  if (typeof value === 'undefined') {
    return defaultValue
  }
  if (typeof value === 'boolean') {
    return value
  }
  switch (value.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true
    case 'false':
    case 'no':
    case '0':
      return false
    default:
      return defaultValue
  }
}
export const parseString = (value: string | boolean | undefined, defaultValue: string) => {
  if (typeof value === 'undefined') {
    return defaultValue
  }
  if (typeof value === 'boolean') {
    return defaultValue
  }
  if (typeof value === 'string') {
    return value
  }
}
