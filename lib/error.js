class UmanohoneError extends Error {
  /**
   * Creates a new UmanohoneError.
   *
   * @param {string} code
   * @param {string} message
   */
  constructor(code, message) {
    super(message)
    this.name = 'UmanohoneError'

    this.code = code
  }
}

module.exports = UmanohoneError
