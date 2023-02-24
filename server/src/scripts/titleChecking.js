import response from "../middleware/response.middleware.js";
import { isExistUtils } from "../utils/isExist.utils.js";

export const isSameTitle = (Service) => async (req, res, next) => {
    const service = new Service();
    const item = await service.selectById(req.params.id);
    const isTitle = await isExistUtils(Service, 'title', req.body.title);
    if(isTitle && req.body.title !== item.title){
        return response(409, {message: 'This title already exists'}, res);
    }
    next();
}