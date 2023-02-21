import { request, Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import roleController from "../../controllers/roleController.js";
import { roleValidationChainMethod } from "../../validations/role.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
// import { isExist, isNotExist } from "../../middleware/isExist.middleware.js";
import RoleService from "../../services/role.service.js";
import { isRoleExist, isRoleNotExist } from "../../scripts/roleChecking.script.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";

const roleRouter = Router();

roleRouter.get('/', tryCatch(roleController.selectAll.bind(roleController)));
roleRouter.get(
    '/:id', 
    isRoleNotExist(RoleService), 
    tryCatch(roleController.selectById.bind(roleController))
);
roleRouter.post(
    '/:token',
    isAdmin, 
    roleValidationChainMethod, 
    validateRequestSchema, 
    isRoleExist(RoleService),
    tryCatch(roleController.create.bind(roleController))
);

roleRouter.delete(
    '/:id/:token',
    isAdmin, 
    isRoleNotExist(RoleService), 
    tryCatch(roleController.deleteById.bind(roleController))
);

export default roleRouter;