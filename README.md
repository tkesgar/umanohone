# umanohone

Umanohone is a module to query information about Gramedia products. It works by scraping the page available at [Gramedia store page][gramedia].

Until Gramedia has an official API for use, this should do.

## Usage

### As node module

Run `npm install umanohone` to install this module as your `package.json` dependencies.

Once installed, you can use the module like this:

```js
import umanohone from 'umanohone'

const options = {name: 'grey-jingga-days-of-violet'}
const result = await umanohone(options)
```

Refer to the API section below for more details on options and result value.

### HTTP endpoint

Umanohone is also deployed using [zeit/micro][micro] server, available at http://tkesgar-umanohone.herokuapp.com.

The request should contain a JSON string representing the `options` object. The object will then be used as-is for the function call and returns the same JSON result with the API call.

### Deployment

You can deploy the endpoint at your computer or server by cloning this repository, install the required dependencies, and run the start script:

```bash
$ git clone https://github.com/tkesgar/umanohone
$ cd umanohone
$ npm install --production
$ npm start
```

Umanohone requires Node.js version `v7.6.0` or later to work due to the use of `async` functions. While no specific package manager are required, I use npm `5.x` and don't use Yarn.

## API

Umanohone is implemented as an `async` function. This means that you either have to use the Node version with `async` support (`>= 7.6.0`) or use some transpile-fu.

Umanohone also will not work in browser-side due to dependencies on several Node-only packages. Besides, the scraping requests will not work due to CORS protection available in most browsers nowadays.

### Options

Currently, Umanohone accepts an object containing a single field `name`, which is a string that contains the product URL slug. Umanohone will use this value to create the page URL to be parsed like this: `http://www.gramedia.com/{name}.html`.

Note that Umanohone module assumes that provided option values are valid. For the HTTP endpoint, if the options are invalid a HTTP 400 Bad Request will be returned with error code `UMA_BADREQ`.

### Return value

On successful scraping, Umanohone returns an object contaning the following properties:

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

Note that the values provided in `details` are not really uniform between pages, so you should not rely on these values. All values are provided as strings without any processing.

#### Sample: `umanohone({name: 'grey-jingga-days-of-violet'})`

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
    // more...
    {
      "key": "Cover Type",
      "value": "SOFT COVER"
    }
  ]
}
```

#### Sample: `umanohone({name: 'survive-shachiku-chan-1'})`

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

### Errors

On failure, Umanohone will throw an `Error` object. Aside from the standard `message` property which contains the human-friendly error description, a `code` property is provided with the following possible values:

- `UMA_NOENT`: no Gramedia page with the provided `name`.
- `UMA_UNKNOWN`: unknown error occured.
- `UMA_OUTDATED`: failed to find the required data in the page, usually because the page layout has changed.

For the HTTP endpoint, the returned response will contain `message` and `code`. Additionally, the returned HTTP status follows this mapping from the value of `code`:

- `UMA_NOENT`: 404 Not Found
- `UMA_UNKNOWN`: 500 Internal Server Error
- `UMA_OUTDATED`: 501 Not Implemented

If you encountered `UMA_UNKNOWN` or `UMA_OUTDATED` errors, please send me an [issue][issue].

## Versioning

While I'll try my best to follow [semver][semver] and maintain the API to be constant, Gramedia might changes their website without notice and breaking the scraper.

Usually this will result in a patch, but if the data is gone and cannot be obtained anymore I will have no choice but to issue a major version change.

In general, if you encountered problems even after using the latest patch version, try upgrading to the latest major version. You might also have to modify your application after upgrading.

## Contributing

Feel free to contribute on this module! Help is currently required on:

- additional tests
- scraping on non-book pages

If you don't prefer working on codes, you can also help on other things such as proofreading this documentation, run additional tests, or checking the Gramedia pages for improvements. Feel free to PM me!

In addition, if you are someone working with or in Gramedia, please ask your superiors to create an API for Gramedia :)

## FAQ

### Q: I encountered an error on non-book products.

Currently querying non-book products, such as electronic products or stationeries, is unsupported; the query might be successful or fail. This is because I currently have only implemented the scraping for book.

Feel free to help here if you want!

## Umanohone why?

"Umanohone" is the name of a [certain fictional book store][denkigai].

## License

Licensed under [MIT License][license].

[denkigai]: https://myanimelist.net/anime/24031/Denki-gai_no_Honya-san
[deploy]: https://tkesgar-umanohone.herokuapp.com
[gramedia]: http://www.gramedia.com/
[heroku-sleep]: https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping
[issue]: https://github.com/tkesgar/umanohone/issues
[license]: https://github.com/tkesgar/umanohone/blob/master/LICENSE
[semver]: http://semver.org/
