import jwt from 'jsonwebtoken';

import { config } from '../config/project.config.js';

import { logger } from '../src/utils/logger.utils.js';

const verifyToken = () => (req, res, next) => {
  try {
    const authorization = req.header('Authorization');
    const token = authorization.split('Bearer ')[1];
    if (!token) {
      logger.warn('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }
    logger.info(`Fetching usuario with token: ${token}`);

    const { email } = jwt.verify(token, config.jwt.secret);
    req.usuario = { email };

    next();
  } catch (error) {
    logger.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default { verifyToken };
