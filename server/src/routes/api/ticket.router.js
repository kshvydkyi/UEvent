import { Router } from "express";
import ticketController from "../../controllers/ticketController.js";
import { tryCatch } from "../../utils/tryCacth.utils.js";

const ticketRouter = Router()

ticketRouter.get(
    '/',
    tryCatch(ticketController.selectAll.bind(ticketController))
)

ticketRouter.get(
    '/:id',
    tryCatch(ticketController.selectById.bind(ticketController))
)

ticketRouter.get(
    '/byUserId/:user_id',
    tryCatch(ticketController.selectByUserId.bind(ticketController))
)

export default ticketRouter;