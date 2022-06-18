export default (entry) => {
  let watcher

  const handle = (watch) => {
    watcher = (handler) => watch(handler)
  }

  const perform = (handler) => {
    const ge = watcher(handler)
    return ge.next().value
  }

  entry(perform, handle)
}
