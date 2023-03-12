import response from "../middleware/response.middleware.js";
import { isExistUtils } from "../utils/isExist.utils.js";

export const checkTicket = (Service) => async (req,res,next) => {
    const isTicket = await isExistUtils(Service, 'secret_code', req.params.secretCode);
    if(!isTicket){
        return response(404, {message: "Ticket do not exist"}, res);
    }
    next();
}