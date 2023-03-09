import response from "../middleware/response.middleware.js";

export const tryCatch =
    (controller) => async (req, res, next) => {
        try {
            const result = await controller(req, res);
            response(200, { values: result || 'Success' }, res);
        } catch (error) {
            response(500, { error: error }, res);
            return next(error);
        }
    };

export const tryCatchPagination =
    (controller) => async (req, res, next) => {
        try {
            const { page } = req.query;
            const parsedPage = page ? Number(page) : 1;
            const perPage = 8;
            const allPages = await controller(req, res);

            const promiseData = await Promise.all(allPages);
            const totalPages = Math.ceil(  promiseData.length / perPage);
            const usersFilter =  promiseData.slice(
                parsedPage * perPage - perPage,
                parsedPage * perPage
            );
            response(200, {meta: { page: Number(page), perPage: Number(perPage), totalPages },
            data: usersFilter}, res);
        } catch (error) {
            response(500, { error: error }, res);
            return next(error);
        }
    };
