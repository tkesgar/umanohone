import test from 'ava'
import load from '../lib/load'

test('Successful Gramedia page request should succeed', async t => {
  await load('grey-jingga-days-of-violet')
  t.pass('Request successful')
})

test('404 Gramedia page request should throw UMA_NOENT', async t => {
  const {code} = await t.throws(load('none'))
  t.is(code, 'UMA_NOENT')
})
