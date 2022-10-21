const camelCase = require('camelcase')
const path = require('path')

module.exports = folder => module => (
  [camelCase(module.replace('.js', '')), require(path.join(folder, module))]
)
