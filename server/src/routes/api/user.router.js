import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import userController from "../../controllers/userController.js";

const userRouter = Router();

userRouter.get('/', tryCatch(userController.selectAll.bind(userController)));
userRouter.get('/:user_id', tryCatch(userController.selectById.bind(userController)));
userRouter.post('/', tryCatch(userController.create.bind(userController)));
userRouter.delete('/:user_id', tryCatch(userController.deleteById.bind(userController)));

export default userRouter;

