const cheerio = require('cheerio')

const UmanohoneError = require('./error')

/**
 * Finds the required product data through the provided cheerio `$` object.
 *
 * @param {CheerioStatic} $ The cheerio object to use.
 */
function parse($) {
  return {
    url: _url($),
    image: _image($),
    title: _title($),
    description: _description($),
    price: _price($),
    discount: _discount($),
    availability: _availability($),
    preorder: _preorder($),
    details: _details($)
  }
}

module.exports = parse

/**
 * Gets the product page URL from the cheerio page `$`.
 * @param {CheerioStatic} $
 * @returns {string}
 */
function _url($) {
  return $('meta[property="og:url"]').prop('content')
}

/**
 * Gets the product image URL from the cheerio page `$`.
 * @param {CheerioStatic} $
 * @returns {string}
 */
function _image($) {
  return $('meta[property="og:image"]').prop('content').replace(/^https?:/i, '')
}

/**
 * Gets the product title from the cheerio page `$`.
 * @param {CheerioStatic} $
 * @returns {string}
 */
function _title($) {
  return $('meta[property="og:title"]').prop('content')
}

/**
 * Gets the product description from the cheerio page `$`.
 * @param {CheerioStatic} $
 */
function _description($) {
  const hasReadMore = $('.short-description .full-desc').length > 0

  if (hasReadMore) {
    $('.short-description .full-desc a').remove()
  }

  const element = hasReadMore ?
    $('.short-description .full-desc') :
    $('.short-description .std')

  return element.text().trim()
}

/**
 * Gets the price information from the cheerio page `$`.
 * @param {CheerioStatic} $
 */
function _price($) {
  const regularPrice = $('.regular-price .price')
  const oldPrice = $('.old-price .price')

  const priceString = (regularPrice.length > 0 ? regularPrice : oldPrice).text()
  return _priceToInt(priceString)
}

/**
 * Gets the discount information from the cheerio page `$`.
 * @param {CheerioStatic} $
 */
function _discount($) {
  if ($('.product-shop .special-price').length === 0) {
    return null
  }

  const priceString = $('.product-shop .special-price .price').text()
  const price = _priceToInt(priceString)

  const percentageString = $('.product-shop  .special-price .special-price-save')
    .text()
    .replace('%', '')
    .replace('save', '')
    .trim()
  const percentage = Number.parseInt(percentageString, 10)

  return {price, percentage}
}

/**
 * Gets the product availability from the cheerio page `$`.
 * @param {CheerioStatic} $
 * @returns {string}
 */
function _availability($) {
  if ($('.availability.in-stock').length > 0) {
    return 'in_stock'
  }

  if ($('.availability.out-of-stock').length > 0) {
    return 'out_stock'
  }

  throw new UmanohoneError('UMA_OUTDATED', 'Unable to find availability')
}

/**
 * Gets the preorder information from the cheerio page `$`.
 * @param {CheerioStatic} $
 */
function _preorder($) {
  return $('.ribbon-big-preorder').length > 0
}

/**
 * Gets the product details from the cheerio page `$`.
 * @param {CheerioStatic} $
 */
function _details($) {
  const rows = $('#product-attribute-specs-table tr').toArray()

  const details = rows.map(tr => {
    const key = cheerio(tr).children('th').text()
    const value = cheerio(tr).children('td').text()
    return {key, value}
  })
  return details
}

/**
 * Helper to convert price string (`Rp 12.345`) to number.
 * @param {string} str
 */
function _priceToInt(str) {
  const numberStr = str.replace('Rp', '').replace('.', '').trim()
  return Number.parseInt(numberStr, 10)
}
