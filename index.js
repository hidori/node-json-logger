'use strict';

const moment = require('moment');

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

class Logger {
    constructor(options) {
        this.options = Object.create(options || {});
        this.options.timestamp = (this.options.timestamp === undefined) ? true : !!this.options.timestamp;
        this.options.level = (this.options.level || 'debug').toLowerCase();
        this.options.source = this.options.source || undefined;

        this.getTimestamp = () => moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        this.stringifyLog = JSON.stringify;
        this.writeLog = console.log;

        this.trace = this.debug = this.info = this.warn = this.error = this.fatal = () => { };
        const level = levels.includes(this.options.level) ? this.options.level : 'debug';
        switch (level) {
            case 'trace':
                this.trace = message => this.output('trace', message);
            case 'debug':
                this.debug = message => this.output('debug', message);
            case 'info':
                this.info = message => this.output('info', message);
            case 'warn':
                this.warn = message => this.output('warn', message);
            case 'error':
                this.error = message => this.output('error', message);
            case 'fatal':
                this.fatal = message => this.output('fatal', message);
        }
    }

    output(level, message) {
        message = message || {};

        if (typeof message === 'string') {
            message = { message: message };
        }

        const head = {};
        const tail = Object.assign({}, message || {});

        if (this.options.timestamp) {
            head.timestamp = this.getTimestamp();
            delete tail.timestamp;
        }

        head.level = level;
        delete tail.level;

        if (this.options.source !== undefined) {
            head.source = this.options.source;
            delete tail.source;
        }

        const log = Object.assign(head, tail);
        this.writeLog(this.stringifyLog(log));
    }
}

module.exports = Logger;
