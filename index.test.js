'use strict';

const test = require('ava');

const Logger = require('./index');
const Console = class {
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
    let console = new Console();
    let logger = new Logger({ level: 'trace' });
    logger.log = console.log;

    level.forEach(l => {
        logger[l](`${l}.`);
        t.is(console.last(), `{"level":"${l}","message":"${l}."}`);

        logger[l](`${l}.`, { data: `${l}.` });
        t.is(console.last(), `{"level":"${l}","message":"${l}.","details":{"data":"${l}."}}`);
    });
});

test('Logger can output a log contains addendums.', t => {
    const level = [
        'trace',
        'debug',
        'info',
        'warn',
        'error',
        'fatal',
    ];
    let console = new Console();
    let logger = new Logger({
        level: 'trace',
        addendum: {
            source: 'source.',
        },
    });
    logger.log = console.log;

    level.forEach(l => {
        logger[l](`${l}.`);
        t.is(console.last(), `{"level":"${l}","source":"${logger.options.addendum.source}","message":"${l}."}`);

        logger[l](`${l}.`, { data: `${l}..` });
        t.is(console.last(), `{"level":"${l}","source":"${logger.options.addendum.source}","message":"${l}.","details":{"data":"${l}.."}}`);
    });
});

test('Logger output a log on the log level as configured.', t => {
    const config = [
        { options: {}, expected: [true, false, false, false, false, false] },
        { options: { level: 'trace' }, expected: [false, false, false, false, false, false] },
        { options: { level: 'debug' }, expected: [true, false, false, false, false, false] },
        { options: { level: 'info' }, expected: [true, true, false, false, false, false] },
        { options: { level: 'warn' }, expected: [true, true, true, false, false, false] },
        { options: { level: 'error' }, expected: [true, true, true, true, false, false] },
        { options: { level: 'fatal' }, expected: [true, true, true, true, true, false] },
        { options: { level: 'unknown*level' }, expected: [true, false, false, false, false, false] },
    ];
    config.forEach(c => {
        let console = new Console();
        let logger = new Logger(c.options);
        logger.log = console.log;

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
