import winston from 'winston';

// Define log levels for different environments
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Create Winston logger instance
const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'pokedex-backend' },
  transports: [
    // Write all logs to console in development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
  ],
});

// Add file transports for production
if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );

  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Helper functions for structured logging
export class Logger {
  static error(message: string, error?: Error, context?: Record<string, unknown>) {
    logger.error(message, {
      error: error?.message,
      stack: error?.stack,
      ...context
    });
  }

  static warn(message: string, context?: Record<string, unknown>) {
    logger.warn(message, context);
  }

  static info(message: string, context?: Record<string, unknown>) {
    logger.info(message, context);
  }

  static debug(message: string, context?: Record<string, unknown>) {
    logger.debug(message, context);
  }

  // Specific methods for common use cases
  static authError(action: string, email?: string, error?: Error) {
    this.error(`Authentication ${action} failed`, error, { email, action });
  }

  static serviceError(service: string, method: string, error?: Error, context?: Record<string, unknown>) {
    this.error(`${service}.${method} failed`, error, { service, method, ...context });
  }

  static externalAPIError(api: string, endpoint: string, error?: Error) {
    this.error(`External API call failed`, error, { api, endpoint });
  }

  static databaseError(operation: string, table?: string, error?: Error) {
    this.error(`Database operation failed`, error, { operation, table });
  }
}

export default logger;