const path = require('path')

const jpg = require('./compress/jpg')
const png = require('./compress/png')
const gif = require('./compress/gif')

exports.jpg = jpg
exports.png = png
exports.gif = gif

exports.process = function (options) {
  const { input } = options
  const ext = path.extname(input)
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return jpg(options)
    case '.png':
      return png(options)
    case '.gif':
      return gif(options)
  }
}
