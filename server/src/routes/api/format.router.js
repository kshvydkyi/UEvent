import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import formatController from "../../controllers/formatController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isNotExistById, isTitleExist } from "../../scripts/roleChecking.script.js";
import FormatService from "../../services/format.service.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { titleValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";

const formatRouter = Router();

formatRouter.get(
    '/',
    tryCatch(formatController.selectAll.bind(formatController))
);
formatRouter.get(
    '/:id',
    isNotExistById(FormatService),
    tryCatch(formatController.selectById.bind(formatController))
);
formatRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    titleValidationChainMethod,
    validateRequestSchema,
    tryCatch(formatController.create.bind(formatController))
);
formatRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAdmin,
    isTitleExist(FormatService),
    titleValidationChainMethod,
    validateRequestSchema,
    tryCatch(formatController.update.bind(formatController))
);
formatRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(FormatService),
    tryCatch(formatController.deleteById.bind(formatController))
);

export default formatRouter;