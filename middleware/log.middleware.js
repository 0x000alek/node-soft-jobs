import { logger as baseLogger } from '../src/utils/logger.utils.js';

const logger = () => (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  baseLogger.info(`${method} ${originalUrl} - request received`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    const message = `${method} ${originalUrl} ${statusCode} - request completed in ${duration}ms`;

    if (statusCode >= 500) {
      baseLogger.error(message);
    } else if (statusCode >= 400) {
      baseLogger.warn(message);
    } else {
      baseLogger.info(message);
    }
  });

  next();
};

export default { logger };
