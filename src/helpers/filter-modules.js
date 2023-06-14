module.exports = (file) => file !== 'index.js' && file.endsWith('.js') && !file.endsWith('.test.js');
