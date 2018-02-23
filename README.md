node-json-logger
----
write logs as JSON to STDOUT

# Usage
Install package:
```sh
npm install -s hidori/node-json-logger
```

Import and use:
```js
const Logger = require('./index');

const logger = new Logger();
logger.info('info.');
logger.info('info.', { data: "data." });
```
Output:
```json
{"level":"info","message":"info."}
{"level":"info","message":"info.","details":{"data":"data."}}
```

# Configuration
Output levels:
```js
const logger = new Logger({ level: 'info'});
```

Note:
* 'trace' will be output `trace`,`debug`,`info`,`warn`,`error`,`fatal`.
* 'debug' will be output `debug`,`info`,`warn`,`error`,`fatal`.
* 'info' will be output `info`,`warn`,`error`,`fatal`.
* 'warn' will be output `warn`,`error`,`fatal`.
* 'error' will be output `error`,`fatal`.
* 'fatal' will be output `fatal`.

Addendum fields:
```js
const logger = new Logger({
    level: 'info',
    addendum: {
        source: 'You can inject some fields statically.',
    },
});
```

Output:
```json
{"level":"info","message":"info.","source":"You can inject some fields."}
{"level":"warn","message":"warn.","source":"You can inject some fields."}
{"level":"error","message":"error.","source":"You can inject some fields."}
{"level":"fatal","message":"fatal.","source":"You can inject some fields."}
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
