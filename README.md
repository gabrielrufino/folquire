![Folquire banner](./assets/folquire.png)

# Folquire



Requires all the modules from a folder

### Getting started

To install run this command:

```bash
$ npm install folquire
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

---

Black Tech by [Gabriel Rufino](https://github.com/gabrielrufino) 🖤
