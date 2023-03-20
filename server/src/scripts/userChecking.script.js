import response from "../middleware/response.middleware.js";
import { isExistUtils } from "../utils/isExist.utils.js"

export const ifUserExist = (Service) => async (req, res, next) => {
    const isLogin = await isExistUtils(Service, 'login', req.body.login);
    const isEmail = await isExistUtils(Service, 'email', req.body.email);
    if (isLogin || isEmail) {
        return response(409, { message: "User with this login or email already exists" }, res);
    }
    next();
}

export const ifUserNotExist = (Service) => async (req, res, next) => {
    const isLogin = await isExistUtils(Service, 'login', req.body.login);
    if (!isLogin) {
        return response(404, { message: "User with this login not exist" }, res);
    }
    next();
}

export const ifEmailExist = (Service) => async (req, res, next) => {
    const isEmail = await isExistUtils(Service, 'email', req.body.email)
    if (!isEmail) {
        return response(404, { message: 'User with this email not exist' }, res)
    }
    next();
}

export const isSameUserData = (Service) => async (req, res, next) => {
    const service = new Service();
    const item = await service.selectById(req.params.id);
    const isLogin = await isExistUtils(Service, 'login', req.body.login);
    const isEmail = await isExistUtils(Service, 'email', req.body.email);
    if (isLogin && req.body.login !== item.login) {
        return response(409, { message: 'This login already exists' }, res);
    }
    else if (isEmail && req.body.email !== item.email) {
        return response(409, { message: 'This email already exists' }, res);
    }
    next();
}