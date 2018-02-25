[![Build Status](https://travis-ci.org/rcmdnk/travis-test.svg?branch=master)](https://travis-ci.org/rcmdnk/travis-test)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/1dd1bfe212c8d70c9b8b/maintainability)](https://codeclimate.com/github/hidori/node-json-logger/maintainability)

node-json-logger
----
write logs as JSON to STDOUT

# Usage
Install package:
```sh
npm install node-json-logger
```

Import and use:
```js
const Logger = require('./index');
const logger = new Logger();
logger.info('info.');
logger.info('info.', { data: 'data.' });
```
Output:
```json
{"level":"info","message":"info."}
{"level":"info","message":"info.","details":{"data":"data."}}
```

# Configuration
Output levels:
```js
const Logger = require('./index');
const logger = new Logger({ level: 'info'});
```

Note:
* 'trace' will be output `trace`,`debug`,`info`,`warn`,`error`,`fatal` logs.
* 'debug' will be output `debug`,`info`,`warn`,`error`,`fatal` logs.
* 'info' will be output `info`,`warn`,`error`,`fatal` logs.
* 'warn' will be output `warn`,`error`,`fatal` logs.
* 'error' will be output `error`,`fatal` logs.
* 'fatal' will be output `fatal` logs.

Addendum fields:
```js
const Logger = require('./index');
const logger = new Logger({
    addendum: {
        source: 'source.',
    },
});
logger.info('info.');
```

Output:
```json
{"level":"info","source":"source.","message":"info."}
```

# API
xxx could be any of [levels](#levels).
* `logger.xxx(message)` or `logger.xxx(message, details)`

# <a href="#levels"></a>Levels
* trace
* debug
* info
* warn
* error
* fatal

# License
MIT

Copyright &copy;Hiroaki SHIBUKI a.k.a. hidori
