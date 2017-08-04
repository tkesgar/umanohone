/* eslint-disable quote-props */
const fs = require('fs')
const path = require('path')
const request = require('request')

const names = {
  'sample1': 'grey-jingga-days-of-violet',
  'sample2': 'survive-shachiku-chan-1',
  'sample3': 'kroma-magic-1-comic-anthology',
  'long-desc': 'alex-ferguson-autobiografi-saya-hc-spesialfootball',
  'out-stock': 'neon-genesis-evangelion-13',
  'no-image': 'tom-and-jerry-story-book-kereta-orient-expres',
  'no-desc': 'tom-and-jerry-story-book-kereta-orient-expres'
}

for (const test of Object.keys(names)) {
  const name = names[test]
  const uri = `http://www.gramedia.com/${name}.html`
  request.get(uri, (err, response) => {
    if (err) {
      throw err
    }

    const filename = path.resolve(__dirname, `../tests/testcases/${test}.html`)
    fs.writeFile(filename, response.body, err => {
      if (err) {
        throw err
      }

      console.log(`URI: ${uri}\nFile: ${filename}`)
    })
  })
}
