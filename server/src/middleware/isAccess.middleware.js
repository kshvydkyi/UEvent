import jwt from 'jsonwebtoken';
import response from './response.middleware.js';

export const isAccessUserService = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.id !== userData.userId) {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAccess = (Service) => async (req, res, next) => {
    const service = new Service();
    const result = await service.selectById(req.params.id);
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if (result.user_id !== userData.userId) {
        return response(403, { message: 'access denied' }, res);
    }
    next();
};

export const isAdmin = (req, res, next) => {
    const userData = jwt.verify(req.params.token, 'jwt-key');
    if(userData.role !== 'admin'){
        return response(403, { message: 'access denied' }, res);
    }
    next();
}
