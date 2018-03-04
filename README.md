[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Build Status](https://travis-ci.org/rcmdnk/travis-test.svg?branch=master)](https://travis-ci.org/rcmdnk/travis-test)
[![Maintainability](https://api.codeclimate.com/v1/badges/1dd1bfe212c8d70c9b8b/maintainability)](https://codeclimate.com/github/hidori/node-json-logger/maintainability)

node-json-logger
----
output logs as JSON to STDOUT

# Install
```sh
npm install -s node-json-logger
```
# Usage
```js
const Logger = require('node-json-logger');
const logger = new Logger();

logger.info('info.');
logger.info('info.', { data: 'data.' });
```
Output:
```json
{"level":"info","message":"info."}
{"level":"info","message":"info.","details":{"data":"data."}}
```

# API
## xxx
Output log. xxx is one of the [Levels](#Levels)
```
logger.xxx(message, details)
```
Arguments:
* message: Specify log message as string.
* details: Specify log details as object (optional).

# Configuration
## level
Specify log output level (optional, default is `debug`).
```js
const Logger = require('node-json-logger');
const logger = new Logger({ level: 'error'});

logger.trace('trace.');
logger.debug('debug.');
logger.info('info.');
logger.warn('warn.');
logger.error('error.');
logger.fatal('fatal.');
```
Output:
```json
{"level":"error","message":"error."}
{"level":"fatal","message":"fatal."}
```
Level and output:
| level                | trace | debug | info | warn | error | fatal |
|:---------------------|:------|:------|:-----|:-----|:------|:------|
| `{ level: 'trace' }` | O     | O     | O    | O    | O     | O     |
| `{ level: 'debug' }` | -     | O     | O    | O    | O     | O     |
| `{ level: 'info' }`  | -     | -     | O    | O    | O     | O     |
| `{ level: 'warn' }`  | -     | -     | -    | O    | O     | O     |
| `{ level: 'error' }` | -     | -     | -    | -    | O     | O     |
| `{ level: 'fatal' }` | -     | -     | -    | -    | -     | O     |

## addendum
Spcify staic addeundum field. this is optional.
```js
const Logger = require('node-json-logger');
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

# <a href="#"></a>Levels
* trace
* debug
* info
* warn
* error
* fatal

# License
MIT

Copyright &copy;2018 Hiroaki SHIBUKI a.k.a. [hidori](https://github.com/hidori)
