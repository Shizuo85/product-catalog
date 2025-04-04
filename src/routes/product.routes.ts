import { Router } from 'express';

import productController from '../modules/product/controllers/product.controller';
import productMiddleware from '../modules/product/middleware/product.middleware';

import generalMiddleware from '../modules/general/middleware/general.middleware';

const productRouter = Router();

/**
 * @swagger
 * /api/v1/product/create:
 *   post:
 *     summary: Create a new product
 *     description: |
 *       - Checks for duplicate product names (case-insensitive)
 *       - Returns the new product ID
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Premium Headphones"
 *               category:
 *                 type: string
 *                 example: "shirts"
 *                 enum: [shirts, skirts, socks, shorts, sweater]
 *               variant:
 *                 type: string
 *                 example: "s"
 *                 enum: [s, l, xl, xxl, xxxl]
 *               inventory:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             example:
 *               message: "Product created succesfully"
 *               product: "507f1f77bcf86cd799439011"
 *       400:
 *         description: |
 *           Possible errors:
 *           - Product already exists
 *           - Missing required fields
 *         content:
 *           application/json:
 *             example:
 *               error: "This product already exists"
 *               status: 400
 *       500:
 *         description: Internal Server Error
 */

productRouter.post(
    '/create',
    productMiddleware.createProduct,
    productController.createProduct
);

/**
 * @swagger
 * /api/v1/product/all:
 *   get:
 *     summary: Get filtered products
 *     description: |
 *       - Supports search by name (case-insensitive)
 *       - Filter by category/variant
 *       - Paginated results
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Search by product name
 *         schema:
 *           type: string
 *           example: "headphone"
 *       - in: query
 *         name: category
 *         description: Filter by category
 *         schema:
 *           type: string
 *           example: "shirts"
 *           enum: [shirts, skirts, socks, shorts, sweater]
 *       - in: query
 *         name: variant
 *         description: Filter by variant
 *         schema:
 *           type: string
 *           example: "s"
 *           enum: [s, l, xl, xxl, xxxl]
 *       - in: query
 *         name: page
 *         description: Page number (1-based)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Items per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated product list
 *         content:
 *           application/json:
 *             example:
 *               message: "Success"
 *               data:
 *                 products:
 *                   - _id: "507f1f77bcf86cd799439011"
 *                     name: "Premium Headphones"
 *                     category: "electronics"
 *                 total_products: 25
 *                 page: 2
 *                 total_pages: 3
 *       500:
 *         description: Internal Server Error
 */

productRouter.get(
    '/all',
    productMiddleware.fetchProducts,
    productController.fetchProducts
);

/**
 * @swagger
 * /api/v1/product/edit/{id}:
 *   patch:
 *     summary: Update a product
 *     description: |
 *       - Checks for duplicate names before update
 *       - Partial updates supported
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to update
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Headphones"
 *               category:
 *                 type: string
 *                 example: "audio"
 *               inventory:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *       400:
 *         description: |
 *           Possible errors:
 *           - Product name already exists
 *         content:
 *           application/json:
 *             example:
 *               error: "This product already exists"
 *               status: 400
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

productRouter.patch(
    '/edit/:id',
    generalMiddleware.sanitizeParams,
    productMiddleware.editProduct,
    productController.editProduct
);

export default productRouter;
