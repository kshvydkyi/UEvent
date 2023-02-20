import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import event_itemController from "../../controllers/event_itemController.js";

const event_itemRouter = Router();

event_itemRouter.get('/', tryCatch(event_itemController.selectAll.bind(event_itemController)));
event_itemRouter.get('/:event_item_id', tryCatch(event_itemController.selectById.bind(event_itemController)));
event_itemRouter.post('/', tryCatch(event_itemController.create.bind(event_itemController)));
event_itemRouter.delete('/:event_item_id', tryCatch(event_itemController.deleteById.bind(event_itemController)));

export default event_itemRouter;