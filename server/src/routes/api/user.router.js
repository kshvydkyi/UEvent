import { Router } from "express";
import userController from "../../controllers/userController.js";


const userRouter = Router();

userRouter.post('/register', userController.register.bind(userController));

export default userRouter;

