import { Router } from "express";
import {tryCatch} from "../../utils/tryCacth.utils.js";
import uploadAvatarImage from '../../utils/uploadAvatarImage.js';
import userController from "../../controllers/userController.js";
import { isAccessUserService, isAdmin, isAccessOrAdminUserService} from "../../middleware/isAccess.middleware.js";
import UserService from "../../services/user.service.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { registerValidateChainMethod, updateProfileDataValidationChainMethod } from "../../validations/user.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import { isSameUserData } from "../../scripts/userChecking.script.js";

const userRouter = Router();


//Select All 
userRouter.get(
    '/', 
    tryCatch(userController.selectAll.bind(userController))
);

//Select By Id 
userRouter.get(
    '/:id',
    isNotExistById(UserService),
    tryCatch(userController.selectById.bind(userController))
);

//Create (Only for admin)
userRouter.post(
    '/:token',
    isAutorised,
    isAdmin,
    registerValidateChainMethod,
    validateRequestSchema,
    tryCatch(userController.create.bind(userController))
);

//Update Avatar (Only for self user and admin)
userRouter.patch(
    '/avatar/:token',
    isAutorised,
    isAccessOrAdminUserService(UserService),
    uploadAvatarImage.single('image'),
    tryCatch(userController.update_avatar.bind(userController))
);

//Update by id (Only for self user and admin)
userRouter.patch(
    '/:id/:token',
    isAutorised,
    isAccessOrAdminUserService(UserService),
    updateProfileDataValidationChainMethod,
    validateRequestSchema,
    isSameUserData(UserService),
    tryCatch(userController.update.bind(userController))
);

//Delete by id (Only for admin)
userRouter.delete(
    '/:id/:token',
    isAutorised,
    isAccessUserService(UserService),
    tryCatch(userController.deleteById.bind(userController))
);

export default userRouter;

