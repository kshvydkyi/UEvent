import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import roleController from "../../controllers/roleController.js";
import { roleValidationChainMethod } from "../../validations/role.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import RoleService from "../../services/role.service.js";
import { isRoleExist, isNotExistById } from "../../scripts/roleChecking.script.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";

const roleRouter = Router();

roleRouter.get(
    '/',
    tryCatch(roleController.selectAll.bind(roleController))
);
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
    isRoleExist(RoleService),
    tryCatch(roleController.create.bind(roleController))
);

roleRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(RoleService),
    tryCatch(roleController.deleteById.bind(roleController))
);

export default roleRouter;