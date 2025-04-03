import { Router } from 'express';

import orderController from '../modules/orders/controllers/order.controller';
import orderMiddleware from '../modules/orders/middleware/order.middleware';

import generalMiddleware from '../modules/general/middleware/general.middleware';

const orderRouter = Router();

/**
 * @swagger
 * /api/v1/orders/create/{id}:
 *   post:
 *     summary: Create an order for a product
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to order
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *                 description: How many to order (must be available in inventory)
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *               order: "611f1f77bcf86cd799439022"
 *       400:
 *         description: Low stock
 *       422:
 *         description: Invalid quantity
 *       404:
 *         description: Product not found
 */

orderRouter.post(
    '/create/:id',
    generalMiddleware.sanitizeParams,
    orderMiddleware.createOrder,
    orderController.createOrder
);

/**
 * @swagger
 * /api/v1/orders/all/{id}:
 *   get:
 *     summary: Get paginated and filtered orders for a product
 *     description: |
 *       - Returns paginated orders with sorting options
 *       - Allows filtering by order status
 *       - Includes pagination metadata
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to fetch orders for
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: status
 *         description: Filter by order status
 *         schema:
 *           type: string
 *           enum: [pending, shipped, delivered, cancelled]
 *           example: "shipped"
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
 *       - in: query
 *         name: sort
 *         description: Sort direction
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *     responses:
 *       200:
 *         description: Paginated orders with metadata
 *         content:
 *           application/json:
 *             example:
 *               message: "Success"
 *               data:
 *                 orders:
 *                   - _id: "611f1f77bcf86cd799439022"
 *                     quantity: 2
 *                     order_date: "2023-01-15T10:30:00Z"
 *                     status: "shipped"
 *                 total_orders: 25
 *                 page: 2
 *                 total_pages: 3
 *       422:
 *         description: Invalid query parameters
 */
orderRouter.get(
    '/all/:id',
    generalMiddleware.sanitizeParams,
    orderMiddleware.fetchOrders,
    orderController.fetchOrders
  );

/**
 * @swagger
 * /api/v1/orders/edit/{id}:
 *   patch:
 *     summary: Update an existing order
 *     description: |
 *       - Updates order details
 *       - Returns success message
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The order ID to update
 *         example: "611f1f77bcf86cd799439022"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "shipped"
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *               quantity:
 *                 type: integer
 *                 example: 3
 *                 minimum: 1
 *               trackingNumber:
 *                 type: string
 *                 example: "UPS123456789"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Review not found"
 *               status: 404
 *       422:
 *         description: Invalid update data
 */

orderRouter.patch(
  '/edit/:id',
  generalMiddleware.sanitizeParams,
  orderMiddleware.editOrder,
  orderController.editOrder
);

export default orderRouter;
