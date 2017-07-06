const execFile = require('child_process').execFile
const fse = require('fs-extra')
const gifsicle = require('gifsicle-bin-wrapper')

module.exports = function compress (options) {
  'use strict'

  const input = options.input
  const output = options.output
  return new Promise((resolve, reject) => {
    execFile(gifsicle, ['-o', output, input], (error, stdout, stderr) => {
      const result = {
        error,
        stdout,
        stderr,
        input,
        output,
        mimeType: 'gif',
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
