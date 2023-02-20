import response from './response.middleware.js';

const ErrorHandler = (error, req, res, next) =>
  response(400, { message: error.message }, res);

export default ErrorHandler;