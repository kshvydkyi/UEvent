import { Router } from "express";
import {tryCatch, tryCatchPagination} from "../../utils/tryCacth.utils.js";
import promocodeController from "../../controllers/promocodeController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAccessCompanyOrAdmin, isAdmin } from "../../middleware/isAccess.middleware.js";
import { titleValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";
import ThemeService from "../../services/theme.service.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import PromocodeService from "../../services/promocode.service.js";
import CompanyService from "../../services/company.service.js";

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

promocodeRouter.get(
    '/company/promocodes/:id',
    tryCatchPagination(promocodeController.selectByCompanyId.bind(promocodeController), 9)
);

promocodeRouter.post(
    '/:token',
    isAutorised,
    isAccessCompanyOrAdmin(CompanyService),
    validateRequestSchema,
    tryCatch(promocodeController.create.bind(promocodeController))
);

promocodeRouter.patch(
    '/:id/:token',
    isAutorised,
    isAccessCompanyOrAdmin(CompanyService),
    validateRequestSchema,
    tryCatch(promocodeController.update.bind(promocodeController))
);

//Delete by id (Only for admin)
promocodeRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(PromocodeService),
    tryCatch(promocodeController.deleteById.bind(promocodeController))
);

promocodeRouter.patch(
    '/decrease/minus-one/:id/',
    tryCatch(promocodeController.decrease.bind(promocodeController))
);

export default promocodeRouter;