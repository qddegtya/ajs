const BC = require('@vm/bc')

class ${'name'} extends BC {
  init (commander) {

  }

  async do () {
    await console.log('Hello World.')
  }
}

${'name'}.command = "${'command'}"
${'name'}.alias = "${'alias'}"
${'name'}.description= "${'description'}"

module.exports = ${'name'}
