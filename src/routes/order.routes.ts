import { Router } from 'express';

import orderController from '../modules/orders/controllers/order.controller';
import orderMiddleware from '../modules/orders/middleware/order.middleware';

import generalMiddleware from '../modules/general/middleware/general.middleware';

const orderRouter = Router();

orderRouter.post(
    '/create',
    orderMiddleware.createOrder,
    orderController.createOrder
);

orderRouter.get(
    '/all',
    orderMiddleware.fetchOrders,
    orderController.fetchOrders
);

orderRouter.patch(
    '/edit/:id',
    generalMiddleware.sanitizeParams,
    orderMiddleware.editOrder,
    orderController.editOrder
);

export default orderRouter;
