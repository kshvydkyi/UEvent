import response from "../middleware/response.middleware.js"
import { isExistUtils } from "../utils/isExist.utils.js"

export const isRoleExist = (Service) => async (req, res, next) => {
    const isRole = await isExistUtils(Service, 'title', req.body.title);
    if(isRole){
        return response(409, {message: "role with such title already exist"}, res)
    }
    next();
}

export const isRoleNotExist = (Service) => async (req, res, next) => {
    const isRole = await isExistUtils(Service, 'id', req.params.id);
    if(!isRole) {
        return response(409, {message: "role with such title not exist"}, res)
    }
    next();
}