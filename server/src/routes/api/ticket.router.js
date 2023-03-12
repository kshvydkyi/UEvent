import { Router } from "express";
import ticketController from "../../controllers/ticketController.js";
import { checkTicket } from "../../scripts/ticketChecking.js";
import TicketService from "../../services/ticket.service.js";
import {tryCatch, tryCatchPagination} from "../../utils/tryCacth.utils.js";

const ticketRouter = Router()

ticketRouter.get(
    '/',
    tryCatchPagination(ticketController.selectAll.bind(ticketController))
)

ticketRouter.get(
    '/:id',
    tryCatch(ticketController.selectById.bind(ticketController))
)

ticketRouter.get(
    '/byUserId/:user_id',
    tryCatchPagination(ticketController.selectByUserId.bind(ticketController))
)

ticketRouter.post(
    '/check-ticket/:secretCode',
    checkTicket(TicketService),
    tryCatch(ticketController.checkTicket.bind(ticketController))
)

export default ticketRouter;