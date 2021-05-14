'use strict'

const camelCase = require('camelcase')
const fs = require('fs')

const filterModules = file => file.endsWith('.js') && !file.endsWith('.test.js')
const mapModules = folder => module => (
  [camelCase(module.replace('.js', '')), require(`${folder}/${module}`)]
)

/**
 * Requires all the modules from a folder
 * @param {String} folder
 */
module.exports = (folder, { async = false } = {}) => {
  if (async) {
    return fs
      .promises
      .readdir(folder)
      .then(files => files.filter(filterModules))
      .then(modules => modules.map(mapModules(folder)))
      .then(Object.fromEntries)
      .catch(error => error)
  }

  return Object.fromEntries(
    fs
      .readdirSync(folder)
      .filter(filterModules)
      .map(mapModules(folder))
  )
}
