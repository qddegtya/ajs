export default (ms) => {
   
  return new Promise((a, _) => {
    setTimeout(a, ms)
  })
}
