import { Router } from "express";
import {tryCatch, tryCatchPagination} from "../../utils/tryCacth.utils.js";
import notificationController from "../../controllers/notificationController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAccess, isAccessOrAdmin, isAdmin } from "../../middleware/isAccess.middleware.js";
import { isNotExistById, isTitleExist } from "../../scripts/roleChecking.script.js";
import NotificationService from "../../services/notification.service.js";
import UserService from "../../services/user.service.js";
import { createCompanyValidationChainMethod, updateCompanyValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";

const notificationRouter = Router();

//Select All(For All)
notificationRouter.get(
    '/',
    tryCatch(notificationController.selectAll.bind(notificationController))
);

//Select ById(For All)
notificationRouter.get(
    '/:id',
    isNotExistById(NotificationService),
    tryCatch(notificationController.selectById.bind(notificationController))
);

notificationRouter.get(
    '/user-notifications/:id',
    isNotExistById(UserService),
    tryCatch(notificationController.selectByUserId.bind(notificationController))
);


notificationRouter.post(
    '/:token',
    isAutorised,
    tryCatch(notificationController.create.bind(notificationController))
);


//Delete by id 
notificationRouter.delete(
    '/:id/:token',
    isAutorised,
    isNotExistById(NotificationService),
    tryCatch(notificationController.deleteById.bind(notificationController))
);

export default notificationRouter;