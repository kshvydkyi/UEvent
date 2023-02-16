import response from "../middleware/response.middleware.js";

const tryCatch =
    (controller) => async (req, res, next) => {
        try {
            const result = await controller(req, res);
            response(200, { values: result || 'Success' }, res);
        } catch (error) {
            response(400, { error }, res);
            return next(error);
        }
    };

export default tryCatch;