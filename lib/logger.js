'use strict';

const moment = require('moment-timezone');

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'none' ];

module.exports = class Logger {
    constructor(options) {
        this.options = Object.create(options || {});
        this.options.timestamp = this.options.timestamp !== false;
        this.options.timezone = this.options.timezone || false;
        this.options.level = (this.options.level || 'debug').toLowerCase();

        this.timestamp = () => this.options.timezone
            ? moment.tz(this.options.timezone).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            : moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        this.writeln = $object => console.log(JSON.stringify($object));

        this.head = level => {
            const data = {};
            if (this.options.timestamp) {
                data.timestamp = this.timestamp();
            }
            data.level = level;
            if (this.options.loggerName) {
                data.loggerName = this.options.loggerName;
            }
            return data;
        };

        this.trace = this.debug = this.info = this.warn = this.error = this.fatal = () => { };
        const level = levels.includes(this.options.level) ? this.options.level : 'debug';
        switch (level) {
            case 'trace':
                this.trace = function () { this.output('trace', Array.from(arguments)) };
            case 'debug':
                this.debug = function () { this.output('debug', Array.from(arguments)) };
            case 'info':
                this.info = function () { this.output('info', Array.from(arguments)) };
            case 'warn':
                this.warn = function () { this.output('warn', Array.from(arguments)) };
            case 'error':
                this.error = function () { this.output('error', Array.from(arguments)) };
            case 'fatal':
                this.fatal = function () { this.output('fatal', Array.from(arguments)) };
        }
    }

    output(level, $arguments) {
        const head = this.head(level);
        const $object = {};
        let i = 0;
        ([head].concat($arguments).concat([head])).forEach(_ => {
            if (typeof _ === 'string') {
                $object[`message${i == 0 ? '' : i}`] = _;
                i++;
            }
            else {
                Object.assign($object, _);
            }
        });
        this.writeln($object);
    }
};
