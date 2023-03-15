import { Router } from "express";
import {tryCatch, tryCatchPagination} from "../../utils/tryCacth.utils.js";
import locationController from "../../controllers/locationController.js";
import LocationService from "../../services/location.service.js";

import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { createLocationValidationChainMethod } from "../../validations/location.validation.js";
import { uploadLocationImage } from '../../utils/uploadImage.js';

const locationRouter = Router();

locationRouter.get(
    '/',
    tryCatch(locationController.selectAll.bind(locationController))
);

locationRouter.get(
    '/:id',
    tryCatch(locationController.selectById.bind(locationController))
);

locationRouter.post(
    '/:token',
    isAutorised,

    createLocationValidationChainMethod,
    validateRequestSchema,
    tryCatch(locationController.create.bind(locationController))
);

locationRouter.post(
    '/add-image/:token',
    isAutorised,
    uploadLocationImage.single('image'),
    tryCatch(locationController.add_pic.bind(locationController))
);

locationRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAdmin,
    validateRequestSchema,
    tryCatch(locationController.update.bind(locationController))
);

locationRouter.patch(
    '/location-image/:id/:token',
    isAutorised,
    uploadLocationImage.single('image'),
    tryCatch(locationController.update_pic.bind(locationController))
);

locationRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    tryCatch(locationController.deleteById.bind(locationController))
);

export default locationRouter;