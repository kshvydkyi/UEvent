import jwt from 'jsonwebtoken';
import response from './response.middleware.js';

export const isAutorised = async (req, res, next) => {
  const { token } = req.params;

  try {
    jwt.verify(token, 'jwt-key');
    next();
  } catch (e) {
    response(401, { message: 'unathorized user' }, res);
  }
};