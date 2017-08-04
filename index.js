const UmanohoneError = require('./lib/error')
const load = require('./lib/load')
const parse = require('./lib/parse')

/**
 * @typedef {object} UmanohoneOptions
 * @property {string} name
 */

/**
 * Scrapes the Gramedia page from `options.name`.
 * @param {UmanohoneOptions} options
 */
async function umanohone(options = {}) {
  if (options === null || typeof options !== 'object') {
    options = {name: options}
  }
  const {name} = options

  // Check name for falsy.
  if (!name) {
    throw new UmanohoneError('UMA_BADOPT', name)
  }

  // Load and parse the page.
  const $ = await load(name)
  return parse($)
}

module.exports = umanohone
