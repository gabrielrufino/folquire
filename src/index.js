'use strict'

const camelCase = require('camelcase')
const fs = require('fs')
const path = require('path')

const filterModules = file => file !== 'index.js' && file.endsWith('.js') && !file.endsWith('.test.js')
const mapModules = folder => module => (
  [camelCase(module.replace('.js', '')), require(path.join(folder, module))]
)

/**
 * Requires all the modules from a folder
 * @param {String} folder
 * @returns {Object}
 */
module.exports = (folder, { async = false, ignore = [] } = {}) => {
  if (!Array.isArray(ignore)) {
    throw new TypeError('Ignore must be an array')
  }

  const filterIgnoredModules = module => !ignore.includes(module)

  if (async) {
    return fs
      .promises
      .readdir(folder)
      .then(files => files.filter(filterModules))
      .then(modules => modules.filter(filterIgnoredModules))
      .then(modules => modules.map(mapModules(folder)))
      .then(Object.fromEntries)
      .catch(error => error)
  }

  return Object.fromEntries(
    fs
      .readdirSync(folder)
      .filter(filterModules)
      .filter(filterIgnoredModules)
      .map(mapModules(folder))
  )
}
