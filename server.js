const micro = require('micro')
const umanohone = require('./')

const statusCodes = {
  UMA_NOENT: 404,
  UMA_UNKNOWN: 500,
  UMA_OUTDATED: 501
}

module.exports = async (req, res) => {
  const options = await micro.json(req)

  try {
    return await umanohone(options)
  } catch (err) {
    const {code, message} = err
    micro.send(res, statusCodes[code] || 500, {code, message})
  }
}
