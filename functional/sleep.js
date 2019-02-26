export default (ms) => {
  // eslint-disable-next-line
  return new Promise((a, _) => {
    setTimeout(a, ms)
  })
}
