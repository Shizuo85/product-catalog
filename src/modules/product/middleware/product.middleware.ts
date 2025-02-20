import { Request, Response, NextFunction } from "express";
import sanitizer from "../../../lib/sanitizer";

import productSchema from "../schemas/product.schema";

class ProductMiddleware {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.body);
            await productSchema.createProduct.validateAsync(req.body);
            return next();
        } catch(err: any){
            err.status = 422;
            return next(err);
        }
    }

    async fetchProducts(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.query);
            await productSchema.fetchProducts.validateAsync(req.query);
            return next();
        } catch(err: any){
            err.status = 422;
            return next(err);
        }
    }

    async editProduct(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.body);
            await productSchema.editProduct.validateAsync(req.body);
            return next();
        } catch(err: any){
            err.status = 422;
            return next(err);
        }
    }
}

export default new ProductMiddleware();
