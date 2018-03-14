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
        this.formatLog = JSON.stringify;
        this.writeLog = console.log;

        this.trace = this.debug = this.info = this.warn = this.error = this.fatal = () => { };
        const level = levels.includes(this.options.level) ? this.options.level : 'debug';
        switch (level) {
            case 'trace':
                this.trace = (message, details) => this.output('trace', message, details);
            case 'debug':
                this.debug = (message, details) => this.output('debug', message, details);
            case 'info':
                this.info = (message, details) => this.output('info', message, details);
            case 'warn':
                this.warn = (message, details) => this.output('warn', message, details);
            case 'error':
                this.error = (message, details) => this.output('error', message, details);
            case 'fatal':
                this.fatal = (message, details) => this.output('fatal', message, details);
        }
    }

    output(level, message, details) {
        const head = {};
        const tail = Object.assign({}, details || {});

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

        head.message = message + '';
        delete tail.message;

        const log = Object.assign(head, tail);
        this.writeLog(this.formatLog(log));
    }
}

module.exports = Logger;
