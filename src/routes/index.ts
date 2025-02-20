import { Router } from "express";

import generalRouter from "./general.routes";
import productRouter from "./product.routes";
import orderRouter from "./order.routes";
import reviewRouter from "./review.routes";

const router = Router();

router.use("/", generalRouter);
router.use("/order", orderRouter);
router.use("/review", reviewRouter);
router.use("/product", productRouter);

export default router;