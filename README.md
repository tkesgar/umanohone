# umanohone

> **DEPRECATED**: Gramedia has a completely new layout based on React, so this module can't be used anymore.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Umanohone is a module to query information about Gramedia products. It works by scraping the page available at [Gramedia store page][gramedia].

Until Gramedia has an official API for use, this should do.

## Usage

Install with npm:

```bash
$ npm install umanohone
```

Then use the module:

```js
import umanohone from 'umanohone'

const options = {name: 'grey-jingga-days-of-violet'}
const result = await umanohone(options)
```

## API

### Options

#### `name`: string

The URL page slug (`http://www.gramedia.com/{name}.html`).

### Return value

On a successful scraping, Umanohone will return an object with these properties:

  - `url`: the Gramedia page URL containing the product
  - `image`: a URL to the product image; can be `null` if no product image is available
  - `title`: the display-friendly product name
  - `description`: the product description
  - `price`: the regular product price (without any discount applied)
  - `discount`: the object describing any discount if available, `null` otherwise
    - `price`: the price with discount applied as written on the page (not calculated)
    - `percentage`: number of discount percentage (e.g. `15` for 15% discount)
  - `status`: the product availability (currently either `in_stock` or `out_stock`)
  - `preorder`: `true` if the product is available as preorder, `false` otherwise
  - `details`: an array of objects that corresponds to the table available at "Product Details" section in the page

### Errors

On failure, Umanohone will throw an `Error` object containing `message` (human-friendly error message) and `code`. The `code` value is one of these possible values:

- `UMA_NOENT`: no Gramedia page with the provided `name`.
- `UMA_UNKNOWN`: unknown error occured.
- `UMA_OUTDATED`: failed to find the required data in the page, usually because the page layout has changed.

If you encountered `UMA_UNKNOWN` or `UMA_OUTDATED`, please create an issue in the [GitHub issues page][issue].

### Samples

#### Grey & Jingga - Days of Violet

```js
{
  name: 'grey-jingga-days-of-violet'
}
```

```json
{
  "url": "http://www.gramedia.com/grey-jingga-days-of-violet.html",
  "image": "//wpc.21684.lambdacdn.net/.../grey-dan-jingga---days-of-violet.jpg",
  "title": "Grey & Jingga - Days of Violet",
  "description": "\"Kisah ini adalah tentang dirinya.\nTentang hari-harinya ... dengan keceriaan.\"",
  "price": 35000,
  "discount": {
    "price": 29750,
    "percentage": 15
  },
  "availability": "in_stock",
  "preorder": false,
  "details": [
    {
      "key": "Publisher",
      "value": "M&C!"
    },
    {
      "key": "Cover Type",
      "value": "SOFT COVER"
    }
  ]
}
```

#### Neon Genesis Evangelion 13

```js
{
  name: 'neon-genesis-evangelion-13'
}
```

```json
{
  "url": "http://www.gramedia.com/neon-genesis-evangelion-13.html",
  "image": "//wpc.21684.lambdacdn.net/.../202956800_xl.jpg",
  "title": "Neon Genesis Evangelion 13",
  "description": "",
  "price": 22500,
  "discount": {
    "price": 19125,
    "percentage": 15
  },
  "availability": "out_stock",
  "preorder": false,
  "details": [
    {
      "key": "Publisher",
      "value": "KADOKAWA SHOTEN"
    },
    {
      "key": "Estimated Weight",
      "value": "0.15 kg"
    },
    {
      "key": "Publish Date",
      "value": "Nov 29, 2013"
    }
  ]
}
```

## Notes

The values provided in `details` are not uniform between pages, so you should not rely on these values. All values are provided as strings without any processing.

## Versioning

This project follows [semver][semver].

However, since Gramedia might changes their website without notice and breaking the scraper, you should always use the latest version available.

Major changes will only be issued if I really have to remove or change a property field.

## Contributing

Feel free to contribute on this module! Help is currently required on:

- additional tests
- scraping on non-book pages (e.g. mobile phones, stationery)

If you prefer working not on the codes, you can also help on other things such as proofreading this documentation, suggesting tests, or checking the Gramedia pages for improvements.

In addition, if you are someone working with or in Gramedia, please ask your superiors to create an API for Gramedia :)

## Umanohone why?

"Umanohone" is the name of a [certain fictional book store][denkigai].

## License

Licensed under [MIT License][license].

[denkigai]: https://myanimelist.net/anime/24031/Denki-gai_no_Honya-san
[gramedia]: http://www.gramedia.com/
[issue]: https://github.com/tkesgar/umanohone/issues
[license]: https://github.com/tkesgar/umanohone/blob/master/LICENSE
[semver]: http://semver.org/
