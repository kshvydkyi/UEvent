import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import themeController from "../../controllers/themeController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAccess, isAdmin } from "../../middleware/isAccess.middleware.js";

const themeRouter = Router();

themeRouter.get(
    '/',

    tryCatch(themeController.selectAll.bind(themeController))
);
themeRouter.get(
    '/:id',
    tryCatch(themeController.selectById.bind(themeController))
);
themeRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    tryCatch(themeController.create.bind(themeController))
);
themeRouter.delete(
    '/:id/:token',
    isAutorised,
    isAccess,
    tryCatch(themeController.deleteById.bind(themeController))
);

export default themeRouter;