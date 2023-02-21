import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import formatController from "../../controllers/formatController.js";

const formatRouter = Router();

formatRouter.get('/', tryCatch(formatController.selectAll.bind(formatController)));
formatRouter.get('/:id', tryCatch(formatController.selectById.bind(formatController)));
formatRouter.post('/', tryCatch(formatController.create.bind(formatController)));
formatRouter.delete('/:id', tryCatch(formatController.deleteById.bind(formatController)));

export default formatRouter;