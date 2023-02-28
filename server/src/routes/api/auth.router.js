import { Router } from "express";
import authController from "../../controllers/authController.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { ifEmailExist, ifUserExist, ifUserNotExist } from "../../scripts/userChecking.script.js";
import UserService from "../../services/user.service.js";
import tryCatch from "../../utils/tryCacth.utils.js";
import { emailValidationChainMethod, loginValidateChainMethod, registerValidateChainMethod, updatePasswordValidateChainMethod } from "../../validations/user.validation.js";


const authRouter = Router();

authRouter.post(
    '/register',
    registerValidateChainMethod,
    validateRequestSchema,
    ifUserExist(UserService),
    tryCatch(authController.register.bind(authController))
);

authRouter.post(
    '/active-email/:token',
    tryCatch(authController.activeEmail.bind(authController))
);

authRouter.post(
    '/login',
    loginValidateChainMethod,
    validateRequestSchema,
    ifUserNotExist(UserService),
    tryCatch(authController.login.bind(authController))
)

authRouter.post(
    '/reset-password',
    emailValidationChainMethod,
    validateRequestSchema,
    ifEmailExist(UserService),
    tryCatch(authController.passwordReset.bind(authController))
)

//Delete by id (Only for admin)
authRouter.post(
    '/reset-password/:token',
    updatePasswordValidateChainMethod,
    validateRequestSchema,
    tryCatch(authController.passwordResetWithConfirmToken.bind(authController))
)

export default authRouter;