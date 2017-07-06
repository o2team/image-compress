const execFile = require('child_process').execFile
const fse = require('fs-extra')
const mozjpeg = require('mozjpeg-bin-wrapper')

module.exports = function compress (options) {
  const input = options.input
  const output = options.output
  const quantity = options.quantity
  let quantityNum = (typeof quantity === 'number' ||
    !isNaN(parseInt(quantity, 10))) ? String(parseInt(quantity, 10)) : '80'

  return new Promise((resolve, reject) => {
    execFile(mozjpeg, ['-quality', quantityNum, '-outfile', output, input], (error, stdout, stderr) => {
      const result = {
        error,
        stdout,
        stderr,
        input,
        output,
        mimeType: 'jpg',
        inputSize: fse.statSync(input).size
      }
      if (!error) {
        result.outputSize = fse.statSync(output).size
        result.compression = parseFloat(((result.inputSize - result.outputSize) / result.inputSize).toFixed(2))
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
}
