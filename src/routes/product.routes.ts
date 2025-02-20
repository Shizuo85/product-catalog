import { Router } from 'express';

import productController from '../modules/product/controllers/product.controller';
import productMiddleware from '../modules/product/middleware/product.middleware';

import generalMiddleware from '../modules/general/middleware/general.middleware';

const productRouter = Router();

productRouter.post(
    '/create',
    productMiddleware.createProduct,
    productController.createProduct
);

productRouter.get(
    '/all',
    productMiddleware.fetchProducts,
    productController.fetchProducts
);

productRouter.patch(
    '/edit/:id',
    generalMiddleware.sanitizeParams,
    productMiddleware.editProduct,
    productController.editProduct
);

export default productRouter;
