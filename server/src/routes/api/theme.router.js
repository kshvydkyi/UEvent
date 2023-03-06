import { Router } from "express";
import {tryCatch} from "../../utils/tryCacth.utils.js";
import themeController from "../../controllers/themeController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { titleValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";
import ThemeService from "../../services/theme.service.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import RoleService from "../../services/role.service.js";

const themeRouter = Router();

//Select All(For All)
themeRouter.get(
    '/',
    tryCatch(themeController.selectAll.bind(themeController))
);

//Select By Id(For All)
themeRouter.get(
    '/:id',
    isNotExistById(RoleService),
    tryCatch(themeController.selectById.bind(themeController))
);

//Select By Id(For All)
themeRouter.get(
    '/event/:id',
    tryCatch(themeController.selectByEventId.bind(themeController))
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
    titleValidationChainMethod,
    validateRequestSchema,
    isSameTitle(ThemeService),
    tryCatch(themeController.update.bind(themeController))
);

//Delete by id (Only for admin)
themeRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(ThemeService),
    tryCatch(themeController.deleteById.bind(themeController))
);

export default themeRouter;