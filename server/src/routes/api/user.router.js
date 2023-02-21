import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import uploadAvatarImage from '../../utils/uploadAvatarImage.js';
import userController from "../../controllers/userController.js";
import { isAccessUserService } from "../../middleware/isAccess.middleware.js";
import UserService from "../../services/user.service.js";

const userRouter = Router();

userRouter.get('/', tryCatch(userController.selectAll.bind(userController)));
userRouter.get('/:id', tryCatch(userController.selectById.bind(userController)));
userRouter.post('/', tryCatch(userController.create.bind(userController)));
userRouter.patch('/avatar/:token', uploadAvatarImage.single('image'), tryCatch(userController.update_avatar.bind(userController)));
userRouter.delete('/:id/:token', isAccessUserService(UserService), tryCatch(userController.deleteById.bind(userController)));

export default userRouter;

