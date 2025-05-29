const { join } = require('path');

const { faker } = require('@faker-js/faker');

const folquire = require('../src');

describe('#Folquire module', () => {
  test('Should require an folder synchronously', () => {
    const result = folquire(join(__dirname, 'folder'));

    expect(result).toStrictEqual({
      add: require('./folder/add'),
      subtract: require('./folder/subtract'),
      multiply: require('./folder/multiply'),
      divide: require('./folder/divide'),
      consoleLog: require('./folder/console-log'),
    });
  });

  test('Should require an folder asynchronously', async () => {
    const result = await folquire(join(__dirname, 'folder'), { async: true });

    expect(result).toStrictEqual({
      add: require('./folder/add'),
      subtract: require('./folder/subtract'),
      multiply: require('./folder/multiply'),
      divide: require('./folder/divide'),
      consoleLog: require('./folder/console-log'),
    });
  });

  describe('Parameter \'folder\'', () => {
    expect(() => {
      folquire(faker.helpers.arrayElement([
        faker.datatype.array(),
        faker.datatype.boolean(),
        faker.datatype.number(),
      ]));
    }).toThrowError(new TypeError('Folder must be a string'));
  });

  describe('Parameter \'async\'', () => {
    expect(() => {
      folquire(faker.datatype.string(), {
        async: faker.helpers.arrayElement([
          faker.datatype.array(),
          faker.datatype.string(),
          faker.datatype.number(),
        ]),
      });
    }).toThrowError(new TypeError('Async must be a boolean'));
  });

  describe('Parameter \'ignore\'', () => {
    test('Should throw an error when \'ignore\' is not an array', () => {
      expect(() => {
        folquire(join(__dirname, 'folder'), { ignore: 123 });
      }).toThrowError(new TypeError('Ignore must be an array'));
    });

    test('Should not import the modules specified in \'ignore\' parameter', () => {
      const result = folquire(join(__dirname, 'folder'), { ignore: ['add.js'] });

      expect(result).not.toHaveProperty('add', require('./folder/add'));
    });
  });
});
