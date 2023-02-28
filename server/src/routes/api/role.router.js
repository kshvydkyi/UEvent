import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import roleController from "../../controllers/roleController.js";
import { roleValidationChainMethod } from "../../validations/role.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import RoleService from "../../services/role.service.js";
import { isTitleExist, isNotExistById } from "../../scripts/roleChecking.script.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { titleValidationChainMethod } from "../../validations/company.validation.js";
import { isSameTitle } from "../../scripts/titleChecking.js";

const roleRouter = Router();

//Select All(For All)
roleRouter.get(
    '/',
    tryCatch(roleController.selectAll.bind(roleController))
);

//Select By Id(For All)
roleRouter.get(
    '/:id',
    isNotExistById(RoleService),
    tryCatch(roleController.selectById.bind(roleController))
);

roleRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    roleValidationChainMethod,
    validateRequestSchema,
    isTitleExist(RoleService),
    tryCatch(roleController.create.bind(roleController))
);

roleRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAdmin,
    titleValidationChainMethod,
    validateRequestSchema,
    isSameTitle(RoleService),
    tryCatch(roleController.update.bind(roleController))
);

//Delete by id (Only for admin)
roleRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(RoleService),
    tryCatch(roleController.deleteById.bind(roleController))
);

export default roleRouter;