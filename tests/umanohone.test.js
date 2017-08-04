import test from 'ava'
import umanohone from '../'

test('Successful scraping should be successful', async t => {
  await umanohone('grey-jingga-days-of-violet')
  t.pass('Scrape successful')
})

test('Scraping 404 should throw UMA_NOENT', async t => {
  const {code} = await t.throws(umanohone('none'))
  t.is(code, 'UMA_NOENT')
})

test('Scraping false should throw UMA_BADOPT', async t => {
  const {code} = await t.throws(umanohone(false))
  t.is(code, 'UMA_BADOPT')
})

test('Scraping null should throw UMA_BADOPT', async t => {
  const {code} = await t.throws(umanohone(null))
  t.is(code, 'UMA_BADOPT')
})

test('Scraping undefined should throw UMA_BADOPT', async t => {
  const {code} = await t.throws(umanohone(undefined))
  t.is(code, 'UMA_BADOPT')
})

test('Scraping empty string should throw UMA_BADOPT', async t => {
  const {code} = await t.throws(umanohone(undefined))
  t.is(code, 'UMA_BADOPT')
})
