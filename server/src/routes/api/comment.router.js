import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import commentController from "../../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get('/', tryCatch(commentController.selectAll.bind(commentController)));
commentRouter.get('/:id', tryCatch(commentController.selectById.bind(commentController)));
commentRouter.post('/', tryCatch(commentController.create.bind(commentController)));
commentRouter.delete('/:id', tryCatch(commentController.deleteById.bind(commentController)));

export default commentRouter;