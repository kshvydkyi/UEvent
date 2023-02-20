import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import eventController from "../../controllers/eventController.js";

const eventRouter = Router();

eventRouter.get('/', tryCatch(eventController.selectAll.bind(eventController)));
eventRouter.get('/:event_id', tryCatch(eventController.selectById.bind(eventController)));
eventRouter.post('/', tryCatch(eventController.create.bind(eventController)));
eventRouter.delete('/:event_id', tryCatch(eventController.deleteById.bind(eventController)));

export default eventRouter;