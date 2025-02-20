import { createLogger, format, config, transports } from 'winston';

const { combine, splat, json, timestamp, errors, cli, printf } = format;

const myFormat = printf(({ level, timestamp, message, ...v }: any) => {
    return `[${level}]: <${new Date(timestamp).toUTCString()}> ${message}\n${
        Object.keys(v).length ? JSON.stringify(v, null, 2) : ''
    }`;
});

const logTransports: any = [];
const console = new transports.Console({ format: combine(cli(), myFormat) });
logTransports.push(console);
export const logger = createLogger({
    level: 'debug',
    levels: config.npm.levels,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        errors({ stack: true }),
        splat(),
        json({ space: 2 })
    ),
    transports: logTransports,
});
