
import { Router } from "express";
import tryCatch from "../../utils/tryCacth.utils.js";
import themeController from "../../controllers/themeController.js";

const themeRouter = Router();

themeRouter.get('/', tryCatch(themeController.selectAll.bind(themeController)));
themeRouter.get('/:theme_id', tryCatch(themeController.selectById.bind(themeController)));
themeRouter.post('/', tryCatch(themeController.create.bind(themeController)));
themeRouter.delete('/:theme_id', tryCatch(themeController.deleteById.bind(themeController)));

export default themeRouter;