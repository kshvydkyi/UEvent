import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import themeController from "../../controllers/themeController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAccess, isAdmin } from "../../middleware/isAccess.middleware.js";
import { isTitleExist } from "../../scripts/roleChecking.script.js";
import { titleValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";

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
    titleValidationChainMethod,
    validateRequestSchema,
    tryCatch(themeController.create.bind(themeController))
);
themeRouter.patch(
    '/:token',
    isAutorised,
    isAdmin,
    isTitleExist(themeController),
    titleValidationChainMethod,
    validateRequestSchema,
    tryCatch(themeController.update.bind(themeController))
);
themeRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    tryCatch(themeController.deleteById.bind(themeController))
);

export default themeRouter;