import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import eventController from "../../controllers/eventController.js";
import { isAccess, isAccessCompanyOrAdmin, isAdmin } from "../../middleware/isAccess.middleware.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import EventService from "../../services/event.service.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { eventCreateValidationChainMethod, updateEventValidationChainMethod } from "../../validations/event.validation.js";
import uploadEventImage from '../../utils/uploadEventImage.js';
import CompanyService from "../../services/company.service.js";

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
    eventCreateValidationChainMethod,
    validateRequestSchema,
    tryCatch(eventController.create.bind(eventController))
);

eventRouter.post(
    '/add-image/:token',
    isAutorised,
    uploadEventImage.single('image'),
    tryCatch(eventController.addPoster.bind(eventController))
);

eventRouter.patch(
    '/:id/:token',
    isAutorised,
    updateEventValidationChainMethod,
    validateRequestSchema,
    isAccessCompanyOrAdmin(CompanyService), 
    tryCatch(eventController.update.bind(eventController))
);

eventRouter.patch(
    '/event-image/:id/:token',
    isAutorised,
    isAccessCompanyOrAdmin(CompanyService), 
    uploadEventImage.single('image'),
    tryCatch(eventController.update_event_pic.bind(eventController))
);

//Delete by id (Only for admin)
eventRouter.delete(
    '/:id/:token',
    isAutorised,
    isAccessCompanyOrAdmin(CompanyService), 
    isNotExistById(EventService),
    tryCatch(eventController.deleteById.bind(eventController))
);

export default eventRouter;