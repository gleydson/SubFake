import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { privateKey } from '../credentials/auth';

export default class AuthMiddleware {
  async checkToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: 'Token not provided' });
    }

    const [authType, token] = authHeader.trim().split(' ');

    if (authType !== 'Bearer') {
      return res.status(401).send({ message: 'Expected a Bearer token' });
    }

    try {
      const decoded = await promisify(jwt.verify)(token, privateKey);

      req.userId = decoded.id;

      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).send({
          message: `JWT expired: ${error.name}`,
          expiredAt: error.expiredAt,
        });
      } else if (error.name === 'JsonWebTokenError') {
        return res
          .status(401)
          .send({ message: `JWT malformed: ${error.name}` });
      } else if (error.name === 'NotBeforeError') {
        return res
          .status(401)
          .send({ message: `JWT not active: ${error.name}`, date: error.date });
      }

      return res.status(401).send({ message: `Invalid token: ${error}` });
    }
  }
}
