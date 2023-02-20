import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import roleController from "../../controllers/roleController.js";
import { roleValidationChainMethod } from "../../validations/role.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";

const roleRouter = Router();

roleRouter.get('/', tryCatch(roleController.selectAll.bind(roleController)));
roleRouter.get('/:role_id', tryCatch(roleController.selectById.bind(roleController)));
roleRouter.post('/', roleValidationChainMethod, validateRequestSchema, tryCatch(roleController.create.bind(roleController)));
roleRouter.delete('/:role_id', tryCatch(roleController.deleteById.bind(roleController)));

export default roleRouter;