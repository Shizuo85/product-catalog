import { Request, Response, NextFunction } from 'express';

import productService from '../services/product.service';

class ProductController {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await productService.createProduct(req.body);
            return res.status(201).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async fetchProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await productService.fetchProducts(req.query);
            return res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async editProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await productService.editProduct({
                ...req.params,
                ...req.body,
            });
            return res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }
}

export default new ProductController();
