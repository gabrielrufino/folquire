const folquire = require('..')

describe('#Folquire module', () => {
  test('Should require an folder synchronously', () => {
    const result = folquire(__dirname + '/folder')

    expect(result).toStrictEqual({
      add: require('./folder/add'),
      subtract: require('./folder/subtract'),
      multiply: require('./folder/multiply'),
      divide: require('./folder/divide'),
      consoleLog: require('./folder/console-log'),
    })
  })

  test('Should require an folder asynchronously', async () => {
    const result = await folquire(__dirname + '/folder', { async: true })

    expect(result).toStrictEqual({
      add: require('./folder/add'),
      subtract: require('./folder/subtract'),
      multiply: require('./folder/multiply'),
      divide: require('./folder/divide'),
      consoleLog: require('./folder/console-log'),
    })
  })
})
