import response from "../middleware/response.middleware.js"
import { isExistUtils } from "../utils/isExist.utils.js"

export const isTitleExist = (Service) => async (req, res, next) => {
    const isRole = await isExistUtils(Service, 'title', req.body.title);
    if(isRole){
        return response(409, {message: "such title already exist"}, res)
    }
    next();
}

export const isNotExistById = (Service) => async (req, res, next) => {
    const isRole = await isExistUtils(Service, 'id', req.params.id);
    if(!isRole) {
        return response(404, {message: "Data not exist"}, res)
    }
    next();
}