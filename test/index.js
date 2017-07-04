const path = require('path')
const test = require('ava')
const tempy = require('tempy')
const compress = require('..')

test('compress a jpg', async t => {
  const result = await compress.jpg({
    input: path.join(__dirname, 'fixtures', 'test.jpg'),
    output: path.join(tempy.directory(), 'test.jpg'),
    quantity: '80'
  })
  t.true(result.inputSize > result.outputSize)
})

test('compress a png', async t => {
  const result = await compress.png({
    input: path.join(__dirname, 'fixtures', 'test.png'),
    output: path.join(tempy.directory(), 'test.png'),
    quantity: '60-80'
  })
  t.true(result.inputSize > result.outputSize)
})

test('compress a gif', async t => {
  const result = await compress.gif({
    input: path.join(__dirname, 'fixtures', 'test.gif'),
    output: path.join(tempy.directory(), 'test.gif')
  })
  t.true(result.inputSize > result.outputSize)
})

test('compress a picture by extname', async t => {
  const result1 = await compress.process({
    input: path.join(__dirname, 'fixtures', 'test.jpg'),
    output: path.join(tempy.directory(), 'test.jpg')
  })
  const result2 = await compress.process({
    input: path.join(__dirname, 'fixtures', 'test.png'),
    output: path.join(tempy.directory(), 'test.png')
  })
  const result3 = await compress.process({
    input: path.join(__dirname, 'fixtures', 'test.gif'),
    output: path.join(tempy.directory(), 'test.gif')
  })
  t.true((result1.inputSize > result1.outputSize) &&
    (result2.inputSize > result2.outputSize) &&
    (result3.inputSize > result3.outputSize))
})
