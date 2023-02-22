import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import uploadAvatarImage from '../../utils/uploadAvatarImage.js';
import userController from "../../controllers/userController.js";
import { isAccessUserService, isAdmin } from "../../middleware/isAccess.middleware.js";
import UserService from "../../services/user.service.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { registerValidateChainMethod } from "../../validations/user.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";

const userRouter = Router();

userRouter.get(
    '/', 
    tryCatch(userController.selectAll.bind(userController))
);
userRouter.get(
    '/:id',
    isNotExistById(UserService),
    tryCatch(userController.selectById.bind(userController))
);
userRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    registerValidateChainMethod,
    validateRequestSchema,
    tryCatch(userController.create.bind(userController))
);
userRouter.patch(
    '/avatar/:token',
    isAutorised,
    isAccessUserService(UserService),
    uploadAvatarImage.single('image'),
    tryCatch(userController.update_avatar.bind(userController))
);
userRouter.delete(
    '/:id/:token',
    isAutorised,
    isAccessUserService(UserService),
    tryCatch(userController.deleteById.bind(userController))
);

export default userRouter;

