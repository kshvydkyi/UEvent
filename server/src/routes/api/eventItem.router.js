import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import event_itemController from "../../controllers/event_itemController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import EventItemService from "../../services/event_item.service.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";

const eventItemRouter = Router();

eventItemRouter.get(
    '/',
    tryCatch(event_itemController.selectAll.bind(event_itemController))
);
eventItemRouter.get(
    '/:id',
    isNotExistById(EventItemService),
    tryCatch(event_itemController.selectById.bind(event_itemController))
);
eventItemRouter.post(
    '/:token',
    isAutorised,
    tryCatch(event_itemController.create.bind(event_itemController))
);
eventItemRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(EventItemService),
    tryCatch(event_itemController.deleteById.bind(event_itemController))
);

export default eventItemRouter;