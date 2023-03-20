import { Router } from "express";
import {tryCatch} from "../../utils/tryCacth.utils.js";
import promocodeController from "../../controllers/promocodeController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { titleValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";
import ThemeService from "../../services/theme.service.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";

const promocodeRouter = Router();

promocodeRouter.get(
    '/',
    tryCatch(promocodeController.selectAll.bind(promocodeController))
);

promocodeRouter.get(
    '/:id',
    tryCatch(promocodeController.selectById.bind(promocodeController))
);

promocodeRouter.get(
    '/selectByEventId/:id',
    tryCatch(promocodeController.selectByEventId.bind(promocodeController))
);

promocodeRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    validateRequestSchema,
    tryCatch(promocodeController.create.bind(promocodeController))
);

promocodeRouter.patch(
    '/:token',
    isAutorised,
    isAdmin,
    validateRequestSchema,
    isSameTitle(ThemeService),
    tryCatch(promocodeController.update.bind(promocodeController))
);

//Delete by id (Only for admin)
promocodeRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(ThemeService),
    tryCatch(promocodeController.deleteById.bind(promocodeController))
);

promocodeRouter.patch(
    '/decrease/:id/',
    tryCatch(promocodeController.decrease.bind(promocodeController))
);

export default promocodeRouter;