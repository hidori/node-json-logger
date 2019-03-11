'use strict';

const test = require('ava');
const Logger = require('./index');

class Console {
    constructor() {
        this.lines = [];
        this.log = message => this.lines.push(message);
        this.clear = () => this.lines = [];
        this.last = () => (this.lines.length > 0) ? this.lines[this.lines.length - 1] : null;
    }
}

test('Logger output a log in the format designed.', t => {
    const level = [
        'trace',
        'debug',
        'info',
        'warn',
        'error',
        'fatal',
    ];
    const console = new Console();
    const logger = new Logger({ level: 'trace' });
    const timestamp = "2001-03-14T01:00:00.000Z";
    logger.timestamp = () => timestamp;
    logger.writeln = o => console.log(JSON.stringify(o));

    level.forEach(l => {
        {
            level.forEach(l => {
                logger[l]();
                t.is(console.last(), `{"timestamp":"${timestamp}","level":"${l}"}`);
            });
        }

        {
            const message = `${l}.`;
            const message1 = `${l}.1`;
            const message2 = `${l}.2`;
            logger[l](message, message1, message2);

            const expected = `{"timestamp":"${timestamp}","level":"${l}","message":"${l}.","message1":"${l}.1","message2":"${l}.2"}`;
            const actual = console.last();
            t.is(expected, actual);
        }

        {
            const data1 = { data1: `${l}#1` };
            const data2 = { data2: `${l}#2` };
            logger[l](data1, data2);

            const expected = `{"timestamp":"${timestamp}","level":"${l}","data1":"${data1.data1}","data2":"${data2.data2}"}`;
            const actual = console.last();
            t.is(expected, actual);
        }

        {
            const message = `${l}.`;
            const message1 = `${l}.1`;
            const message2 = `${l}.2`;
            const data1 = { data1: `${l}#1` };
            const data2 = { data2: `${l}#2` };
            logger[l](message, data1, message1, data2, message2);

            const expected = `{"timestamp":"${timestamp}","level":"${l}","message":"${l}.","data1":"${data1.data1}","message1":"${l}.1","data2":"${data2.data2}","message2":"${l}.2"}`;
            const actual = console.last();
            t.is(expected, actual);
        }
    });
});

test('Logger output a log on the log level as configured.', t => {
    const config = [
        { options: undefined, expected: [true, false, false, false, false, false] },
        { options: {}, expected: [true, false, false, false, false, false] },
        { options: { level: 'trace' }, expected: [false, false, false, false, false, false] },
        { options: { level: 'debug' }, expected: [true, false, false, false, false, false] },
        { options: { level: 'info' }, expected: [true, true, false, false, false, false] },
        { options: { level: 'warn' }, expected: [true, true, true, false, false, false] },
        { options: { level: 'error' }, expected: [true, true, true, true, false, false] },
        { options: { level: 'fatal' }, expected: [true, true, true, true, true, false] },
        { options: { level: 'none' }, expected: [true, true, true, true, true, true] },
        { options: { level: 'unknown*level' }, expected: [true, false, false, false, false, false] },
    ];
    config.forEach(c => {
        const console = new Console();
        const logger = new Logger(c.options);
        const timestamp = "2001-03-14T01:00:00.000Z";
        logger.timestamp = () => timestamp;
        logger.writeln = o => console.log(JSON.stringify(o));

        logger.trace('trace.');
        t.true((console.last() === null) === c.expected[0]);

        logger.debug('debug.');
        t.true((console.last() === null) === c.expected[1]);

        logger.info('info.');
        t.true((console.last() === null) === c.expected[2]);

        logger.warn('warn.');
        t.true((console.last() === null) === c.expected[3]);

        logger.error('error.');
        t.true((console.last() === null) === c.expected[4]);

        logger.fatal('fatal.');
        t.true((console.last() === null) === c.expected[5]);
    });
    t.pass();
});

test('Timestamp can be disiable with config.', t => {
    const level = [
        'trace',
        'debug',
        'info',
        'warn',
        'error',
        'fatal',
    ];
    const console = new Console();
    const logger = new Logger({ level: 'trace', timestamp: false });
    const timestamp = "2001-03-14T01:00:00.000Z";
    logger.timestamp = () => timestamp;
    logger.writeln = o => console.log(JSON.stringify(o));

    level.forEach(l => {
        const message = `${l}.`;
        logger[l](message);

        const expected = `{"level":"${l}","message":"${message}"}`;
        const actual = console.last();
        t.is(expected, actual);
    });
});

test('Timezone can be declared with config.', t => {
    const level = [
        'trace',
        'debug',
        'info',
        'warn',
        'error',
        'fatal',
    ];
    const console = new Console();
    const logger = new Logger({ level: 'trace', timezone: 'America/Sao_Paulo' });
    const timestamp = "2001-03-14T01:00:00.000Z";
    logger.timestamp = () => timestamp;
    logger.writeln = o => console.log(JSON.stringify(o));

    level.forEach(l => {
        const message = `${l}.`;
        logger[l](message);

        const expected = `{"timestamp":"${timestamp}","level":"${l}","message":"${message}"}`;
        const actual = console.last();
        t.is(expected, actual);
        t.is('America/Sao_Paulo', logger.options.timezone);
    });
});

test('Logger name can be set', t => {
    const console = new Console();
    const logger = new Logger({ level: 'info', loggerName: 'server/index.js' });
    const timestamp = "2001-03-14T01:00:00.000Z";
    logger.timestamp = () => timestamp;
    logger.writeln = o => console.log(JSON.stringify(o));

    logger.info('Hello world!');
    const expected = `{"timestamp":"${timestamp}","level":"info","loggerName":"server/index.js","message":"Hello world!"}`;
    const actual = console.last();
    t.is(expected, actual);
});
