[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Build Status: Node.js CI](https://github.com/hidori/node-json-logger/workflows/Node.js%20CI/badge.svg)](https://github.com/hidori/node-json-logger/actions?query=workflow%3A"Node.js+CI")
[![Coverage Status](https://coveralls.io/repos/github/hidori/node-json-logger/badge.svg)](https://coveralls.io/github/hidori/node-json-logger)
[![Maintainability](https://api.codeclimate.com/v1/badges/1dd1bfe212c8d70c9b8b/maintainability)](https://codeclimate.com/github/hidori/node-json-logger/maintainability)

# node-json-logger

Simply, output logs to STDOUT in JSON

## Install

```sh
npm i node-json-logger
```

## Usage

```js
const Logger = require('node-json-logger');
const logger = new Logger();

logger.info();
logger.info('message');
logger.info('message','message','message');
logger.info({ data: 'data' });
logger.info({ data1: 'data' }, { data2: 'data' });
logger.info('message', { data1: 'data' }, 'message', { data2: 'data' }, 'message');
```

Outputs:

```json
{"timestamp":"2001-03-14T01:00:00.000Z","level":"info"}
{"timestamp":"2001-03-14T01:00:00.000Z","level":"info","message":"message"}
{"timestamp":"2001-03-14T01:00:00.000Z","level":"info","message":"message","message1":"message","message2":"message"}
{"timestamp":"2001-03-14T01:00:00.000Z","level":"info","data":"data"}
{"timestamp":"2001-03-14T01:00:00.000Z","level":"info","data1":"data","data2":"data"}
{"timestamp":"2001-03-14T01:00:00.000Z","level":"info","message":"message","data1":"data","message1":"message","data2":"data","message2":"message"}
```

## API

```js
logger.xxx(message?, ...)
```

Note:

* xxx is one of the [Levels](#Levels)

Arguments:

* message: Specify a message as string or object.

## <a href="#Levels"></a>Levels

* trace
* debug
* info
* warn
* error
* fatal

## Configuration

### level

Specify output level. (optional, default is `debug`)

```js
const Logger = require('node-json-logger');
const logger = new Logger({ level: 'error'});

logger.trace('message');
logger.debug('message');
logger.info('message');
logger.warn('message');
logger.error('message');
logger.fatal('message');
```

Output:

```json
{"timestamp":"2001-03-14T01:00:00.000Z","level":"error","message":"message"}
{"timestamp":"2001-03-14T01:00:00.000Z","level":"fatal","message":"message"}
```

Level and output:

|                      | trace | debug | info | warn | error | fatal |
|:---------------------|:------|:------|:-----|:-----|:------|:------|
| `{ level: 'trace' }` | O     | O     | O    | O    | O     | O     |
| `{ level: 'debug' }` | -     | O     | O    | O    | O     | O     |
| `{ level: 'info' }`  | -     | -     | O    | O    | O     | O     |
| `{ level: 'warn' }`  | -     | -     | -    | O    | O     | O     |
| `{ level: 'error' }` | -     | -     | -    | -    | O     | O     |
| `{ level: 'fatal' }` | -     | -     | -    | -    | -     | O     |
| `{ level: 'none' }`  | -     | -     | -    | -    | -     | -     |

### loggerName

Specify the name of the logger. Useful when logging from different files.

```js
const Logger = require('node-json-logger');
const logger = new Logger({ loggerName: 'server/index.js' });

logger.info('message');
```

Output:

```json
{"timestamp":"2001-03-14T01:00:00.000Z","level":"info","loggerName":"server/index.js","message":"message"}
```

### timestamp

Specify enable or disable timestamp. (optional, default is true)

```js
const Logger = require('node-json-logger');
const logger = new Logger({ timestamp: false });

logger.info('message');
```

Output with disabled timestamp:

```json
{"level":"info","message":"message"}
```

### timezone

Specify locale timezone. (optional, default is UTC)

```js
const Logger = require('node-json-logger');
const logger = new Logger({timezone: 'America/Sao_Paulo'});

logger.info('message');
```

Output with specific timezone:

```json
{"timestamp":"2018-10-25T15:32:43.318Z","level":"info","message":"message"}
```

Same output with default timezone (UTC):

```json
{"timestamp":"2018-10-25T18:32:43.318Z","level":"info","message":"message"}
```

[Click here](https://momentjs.com/timezone/) to see the list with all available timezones.

## License

MIT

Copyright &copy;2018 Hiroaki SHIBUKI a.k.a. [hidori](https://github.com/hidori)
