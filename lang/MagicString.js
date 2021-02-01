const MagicString = (str) => {
  let _string = str

  if (typeof _string !== 'string') throw new Error('Must be a string.')

  return {
    capitalize() {
      return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    },
  }
}

export default MagicString
