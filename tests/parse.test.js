import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'
import test from 'ava'
import parse from '../lib/parse'

const pages = _loadPages()

for (const testcase of Object.keys(pages)) {
  const $ = pages[testcase]

  test(`${testcase}: parse should return the correct type for each fields`, t => {
    const {
      url,
      title,
      image,
      description,
      price,
      discount,
      availability,
      preorder,
      details
    } = parse($)

    t.is(typeof url, 'string')

    t.is(typeof image, 'string')

    t.is(typeof title, 'string')

    t.is(typeof description, 'string')

    t.is(typeof price, 'number')

    t.true(discount === null || typeof discount === 'object')
    if (discount) {
      const {price, percentage} = discount
      t.is(typeof price, 'number')
      t.is(typeof percentage, 'number')
    }

    t.true(availability === 'in_stock' || availability === 'out_stock')

    t.is(typeof preorder, 'boolean')

    t.true(Array.isArray(details))
    for (const {key, value} of details) {
      t.is(typeof key, 'string')
      t.is(typeof value, 'string')
    }
  })

  test(`${testcase}: parse should match snapshot`, t => {
    const result = parse($)
    t.snapshot(result)
  })
}

/**
 * Helper to load the testcase pages as cheerio element.
 */
function _loadPages() {
  const pages = {}

  const dir = path.resolve(__dirname, 'testcases')
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const test = file.replace('.html', '')
    const html = fs.readFileSync(path.resolve(dir, file))
    pages[test] = cheerio.load(html)
  }
  return pages
}
