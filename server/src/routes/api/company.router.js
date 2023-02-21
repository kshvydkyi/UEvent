import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import companyController from "../../controllers/companyController.js";

const companyRouter = Router();

companyRouter.get('/', tryCatch(companyController.selectAll.bind(companyController)));
companyRouter.get('/:id', tryCatch(companyController.selectById.bind(companyController)));
companyRouter.post('/', tryCatch(companyController.create.bind(companyController)));
companyRouter.delete('/:id', tryCatch(companyController.deleteById.bind(companyController)));

export default companyRouter;