const execFile = require('child_process').execFile
const fse = require('fs-extra')
const pngquant = require('pngquant-bin-wrapper')

module.exports = function compress (options) {
  const input = options.input
  const output = options.output
  const quantity = options.quantity
  let quantityStr = (typeof quantity === 'string') ? quantity : '60-80'
  return new Promise((resolve, reject) => {
    execFile(pngquant, ['--quality=' + quantityStr, '-o', output, input], (error, stdout, stderr) => {
      const result = {
        error,
        stdout,
        stderr,
        input,
        output,
        mimeType: 'png',
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
