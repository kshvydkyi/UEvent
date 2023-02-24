import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import companyController from "../../controllers/companyController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAccess, isAccessOrAdmin, isAdmin } from "../../middleware/isAccess.middleware.js";
import { isNotExistById, isTitleExist } from "../../scripts/roleChecking.script.js";
import CompanyService from "../../services/company.service.js";
import UserService from "../../services/user.service.js";
import { createCompanyValidationChainMethod, updateCompanyValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";

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
companyRouter.get(
    '/user-companies/:id',
    isNotExistById(UserService),
    tryCatch(companyController.selectByUserId.bind(companyController))
);
companyRouter.post(
    '/:token',
    isAutorised,
    createCompanyValidationChainMethod,
    validateRequestSchema,
    isTitleExist(CompanyService),
    tryCatch(companyController.create.bind(companyController))
);

companyRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAccess,
    updateCompanyValidationChainMethod,
    validateRequestSchema,
    isSameTitle(CompanyService),
    tryCatch(companyController.update.bind(companyController))
);
companyRouter.delete(
    '/:id/:token',
    isAutorised,
    isAccessOrAdmin(CompanyService),
    isNotExistById(CompanyService),
    tryCatch(companyController.deleteById.bind(companyController))
);

export default companyRouter;