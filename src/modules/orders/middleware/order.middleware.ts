import { Request, Response, NextFunction } from 'express';
import sanitizer from '../../../lib/sanitizer';

import orderSchema from '../schemas/order.schema';

class OrderMiddleware {
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.body);
            await orderSchema.createOrder.validateAsync(req.body);
            return next();
        } catch (err: any) {
            err.status = 422;
            return next(err);
        }
    }

    async fetchOrders(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.query);
            await orderSchema.fetchOrders.validateAsync(req.query);
            return next();
        } catch (err: any) {
            err.status = 422;
            return next(err);
        }
    }

    async editOrder(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.body);
            await orderSchema.editOrder.validateAsync(req.body);
            return next();
        } catch (err: any) {
            err.status = 422;
            return next(err);
        }
    }
}

export default new OrderMiddleware();
