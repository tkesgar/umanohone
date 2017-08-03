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
  if (typeof options === 'string') {
    options = {name: options}
  }
  const {name} = options

  const $ = await load(name)
  return parse($)
}

module.exports = umanohone
