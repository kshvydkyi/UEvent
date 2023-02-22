import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import eventController from "../../controllers/eventController.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import EventService from "../../services/event.service.js";

const eventRouter = Router();

eventRouter.get(
    '/',
    tryCatch(eventController.selectAll.bind(eventController))
);
eventRouter.get(
    '/:id',
    isNotExistById(EventService),
    tryCatch(eventController.selectById.bind(eventController))
);
eventRouter.post(
    '/:token',
    isAutorised,
    tryCatch(eventController.create.bind(eventController))
);
eventRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    isNotExistById(EventService),
    tryCatch(eventController.deleteById.bind(eventController))
);

export default eventRouter;