import { Router } from "express";

import generalController from "../modules/general/controllers/general.controller";

const generalRouter = Router();

generalRouter.all("/", generalController.default);

export default generalRouter;