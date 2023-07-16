const path = require('path');

const camelCase = require('camelcase');

module.exports = (folder) => (module) => (
  [camelCase(module.replace('.js', '')), require(path.join(folder, module))]
);
