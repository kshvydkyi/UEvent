import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import formatController from "../../controllers/formatController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import FormatService from "../../services/format.service.js";

const formatRouter = Router();

formatRouter.get(
    '/',
    tryCatch(formatController.selectAll.bind(formatController))
);
formatRouter.get(
    '/:id',
    isNotExistById(FormatService),
    tryCatch(formatController.selectById.bind(formatController))
);
formatRouter.post(
    '/:token',
    isAutorised,
    tryCatch(formatController.create.bind(formatController))
);
formatRouter.delete(
    '/:id/:token',
    isAutorised,
    isNotExistById(FormatService),
    tryCatch(formatController.deleteById.bind(formatController))
);

export default formatRouter;