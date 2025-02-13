![Folquire banner](./assets/folquire.png)

# Folquire

[![Black Tech by Gabriel Rufino](https://img.shields.io/badge/Black_Tech-by_Gabriel_Rufino_%F0%9F%96%A4-white?style=flat-square&labelColor=444444)](https://gabrielrufino.com)
[![CI](https://github.com/gabrielrufino/folquire/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielrufino/folquire/actions/workflows/ci.yml)
[![CD](https://github.com/gabrielrufino/folquire/actions/workflows/cd.yml/badge.svg)](https://github.com/gabrielrufino/folquire/actions/workflows/cd.yml)

Requires all the modules from a folder

### Getting started

To install run this command:

```sh
npm install folquire
```

Let's see an example. Suppose we have the following folder structure:

```
+-- math
|  +-- add.js
|  +-- subtract.js
|  +-- multiply.js
|  +-- divide.js
+-- index.js
```

<small>index.js</small>

```js
'use strict'

const { join } = require('path')
const folquire = require('folquire')

const math = folquire(join(__dirname, 'math'))

math.add(1, 2)      // 2
math.subtract(8, 4) // 4
math.multiply(6, 7) // 42
math.divide(20, 10) // 2
```

### Async folquire

<small>index.js</small>

```js
'use strict'

const { join } = require('path')
const folquire = require('folquire')

folquire(join(__dirname, 'math'))
  .then(math => {
    math.add(1, 2)      // 2
    math.subtract(8, 4) // 4
    math.multiply(6, 7) // 42
    math.divide(20, 10) // 2
  })
```

### Ignore modules

```js
'use strict'

const { join } = require('path')
const folquire = require('folquire')

const modules = folquire(join(__dirname, 'math'), {
  ignore: ['add.js']
})
```
