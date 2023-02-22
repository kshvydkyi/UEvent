import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import commentController from "../../controllers/commentController.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import CommentService from "../../services/comment.service.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAccess, isAdmin } from "../../middleware/isAccess.middleware.js";

const commentRouter = Router();

commentRouter.get(
    '/',
    tryCatch(commentController.selectAll.bind(commentController))
);
commentRouter.get(
    '/:id',
    isNotExistById(CommentService),
    tryCatch(commentController.selectById.bind(commentController))
);
commentRouter.post(
    '/:token',
    isAutorised,
    tryCatch(commentController.create.bind(commentController))
);
commentRouter.delete(
    '/:id/:token',
    isAutorised,
    isAccess,
    isNotExistById(CommentService),
    tryCatch(commentController.deleteById.bind(commentController))
);

export default commentRouter;