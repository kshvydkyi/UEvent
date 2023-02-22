import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import companyController from "../../controllers/companyController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAdmin } from "../../middleware/isAccess.middleware.js";
import { isNotExistById } from "../../scripts/roleChecking.script.js";
import CompanyService from "../../services/company.service.js";

const companyRouter = Router();

companyRouter.get(
    '/',
    tryCatch(companyController.selectAll.bind(companyController))
);
companyRouter.get(
    '/:id',
    isNotExistById(CompanyService),
    tryCatch(companyController.selectById.bind(companyController))
);
companyRouter.post(
    '/:token',
    isAutorised,
    tryCatch(companyController.create.bind(companyController))
);
companyRouter.delete(
    '/:id/:token',
    isAutorised,
    isAdmin,
    tryCatch(companyController.deleteById.bind(companyController))
);

export default companyRouter;