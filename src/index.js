const fs = require('fs');

const filterIgnoredModules = require('./helpers/filter-ignored-modules');
const filterModules = require('./helpers/filter-modules');
const mapModules = require('./helpers/map-modules');

/**
 * Requires all the modules from a folder
 * @param {String} folder
 * @returns {Object}
 */
module.exports = (folder, { async = false, ignore = [] } = {}) => {
  if (typeof folder !== 'string') {
    throw new TypeError('Folder must be an string');
  }

  if (typeof async !== 'boolean') {
    throw new TypeError('Async must be a boolean');
  }

  if (!Array.isArray(ignore)) {
    throw new TypeError('Ignore must be an array');
  }

  if (async) {
    return fs
      .promises
      .readdir(folder)
      .then((files) => files.filter(filterModules))
      .then((modules) => modules.filter(filterIgnoredModules(ignore)))
      .then((modules) => modules.map(mapModules(folder)))
      .then(Object.fromEntries)
      .catch((error) => error);
  }

  return Object.fromEntries(
    fs
      .readdirSync(folder)
      .filter(filterModules)
      .filter((filterIgnoredModules(ignore)))
      .map(mapModules(folder)),
  );
};
