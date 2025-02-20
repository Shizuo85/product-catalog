import { Request, Response, NextFunction } from 'express';

import orderService from '../services/order.service';

class OrderController {
    async createOrder(req: Request, res: Response, next: NextFunction) {
            try {
                const user = await orderService.createOrder(req.body);
                return res.status(201).json(user);
            } catch (err) {
                return next(err);
            }
        }
    
        async fetchOrders(req: Request, res: Response, next: NextFunction) {
            try {
                const user = await orderService.fetchOrders(req.query);
                return res.status(200).json(user);
            } catch (err) {
                return next(err);
            }
        }
    
        async editOrder(req: Request, res: Response, next: NextFunction) {
            try {
                const user = await orderService.editOrder({
                    ...req.params,
                    ...req.body,
                });
                return res.status(200).json(user);
            } catch (err) {
                return next(err);
            }
        }
}

export default new OrderController();
