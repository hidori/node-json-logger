'use strict';

const Level = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

class Logger {
    constructor(options) {
        this.options = options || {};
        this.options.level = (this.options.level || 'debug').toLowerCase();
        this.options.addendum = this.options.addendum || {};
        this.options.log = this.options.log || console.log;
        const level = (this.options.level in Level) ? this.options.level : 'debug';
        this.trace = this.debug = this.info = this.warn = this.error = this.fatal = () => { };
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
        this.log = message => this.options.log(message);
    }

    output(level, message, details) {
        const addendum = Object.assign({}, this.options.addendum);
        delete addendum.level;
        delete addendum.message;
        delete addendum.details;
        const data = Object.assign(Object.assign({ level : level }, addendum), details
            ? { message: message, details: details }
            : { message: message },
            addendum);
        this.log(JSON.stringify(data));
    }
}

module.exports = Logger;
