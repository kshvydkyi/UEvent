import response from './response.middleware.js';

export const isNotExist = (service, field, value) => async (req, res, next) => {
    console.log(value);
  const result = await service.isExist(field, value);
  if (!result) {
    return response(404, { message: 'Can`t find data' }, res);
  }
  next();
};

export const isExist = (service, field, value) => async (req, res, next) => {
    const result = await service.isExist(field, value);
    if (result[0]) {
      return response(409, { message: 'User with this login already exists' }, res);
    }
    next();
  };
