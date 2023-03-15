import { Router } from "express";
import {tryCatch, tryCatchPagination} from "../../utils/tryCacth.utils.js";
import companyController from "../../controllers/companyController.js";
import { isAutorised } from "../../middleware/isAuthorized.middleware.js";
import { isAccess, isAccessOrAdmin, isAdmin } from "../../middleware/isAccess.middleware.js";
import { isNotExistById, isTitleExist } from "../../scripts/roleChecking.script.js";
import CompanyService from "../../services/company.service.js";
import UserService from "../../services/user.service.js";
import { createCompanyValidationChainMethod, updateCompanyValidationChainMethod } from "../../validations/company.validation.js";
import { validateRequestSchema } from "../../middleware/validateRequestSchema.middleware.js";
import { isSameTitle } from "../../scripts/titleChecking.js";
import { uploadCompanyImage } from '../../utils/uploadImage.js';


const companyRouter = Router();

//Select All(For All)
companyRouter.get(
    '/',
    tryCatch(companyController.selectAll.bind(companyController))
);

//Select ById(For All)
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

companyRouter.get(
    '/user-companies/company/:id',
    isNotExistById(UserService),
    tryCatch(companyController.selectUsersByCompanyId.bind(companyController))
);

companyRouter.post(
    '/:token',
    isAutorised,
    createCompanyValidationChainMethod,
    validateRequestSchema,
    isTitleExist(CompanyService),
    tryCatch(companyController.create.bind(companyController))
);

companyRouter.post(
    '/add-image/:token',
    isAutorised,
    uploadCompanyImage.single('image'),
    tryCatch(companyController.add_pic.bind(companyController))
);

companyRouter.post(
    '/addUser/:token',
    isAutorised,
    isAccess,
    tryCatch(companyController.addUser.bind(companyController))
);

companyRouter.patch(
    '/:id/:token',
    isAutorised, 
    isAccess(CompanyService),
    updateCompanyValidationChainMethod,
    validateRequestSchema,
    isSameTitle(CompanyService),
    tryCatch(companyController.update.bind(companyController))
);

companyRouter.patch(
    '/company-image/:id/:token',
    isAutorised,
    uploadCompanyImage.single('image'),
    tryCatch(companyController.update_pic.bind(companyController))
);

//Delete by id (Only for admin)
companyRouter.delete(
    '/:id/:token',
    isAutorised,
    isAccessOrAdmin(CompanyService),
    isNotExistById(CompanyService),
    tryCatch(companyController.deleteById.bind(companyController))
);

export default companyRouter;