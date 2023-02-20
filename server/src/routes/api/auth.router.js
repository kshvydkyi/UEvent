import { Router } from "express";
import authController from "../../controllers/authController.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import tryCatch from "../../utils/tryCacth.utils.js";
import { registerValidateChainMethod } from "../../validations/user.validation.js";


const authRouter = Router();

authRouter.post(
    '/register', 
    registerValidateChainMethod, 
    validateRequestSchema,
    tryCatch(authController.register.bind(authController))
);

export default authRouter;