const cheerio = require('cheerio')
const request = require('request-promise-native')

const UmanohoneError = require('./error')

/**
 * Given a product slug `name`, returns the HTML loaded into cheerio.
 *
 * @param {string} name The product slug to be requested.
 */
async function load(name) {
  const uri = `http://www.gramedia.com/${name}.html`

  // Disable simple and enable resolveWithFullResponse
  // (we want to check the status code).
  const {statusCode, body} = await request({
    uri,
    simple: false,
    resolveWithFullResponse: true
  })

  // Throw UMA_NOENT if 404.
  if (statusCode === 404) {
    throw new UmanohoneError(
      'UMA_NOENT',
      `Cannot find page for '${name}' (URI: ${uri})`
    )
  }

  // Load the result body into cheerio.
  return cheerio.load(body)
}

module.exports = load
