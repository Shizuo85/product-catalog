import { Router } from 'express';

import reviewController from '../modules/reviews/controllers/review.controller';
import reviewMiddleware from '../modules/reviews/middleware/review.middleware';

import generalMiddleware from '../modules/general/middleware/general.middleware';

const reviewRouter = Router();

/**
 * @swagger
 * /api/v1/reviews/create/{id}:
 *   post:
 *     summary: Create a product review
 *     description: |
 *       - Requires valid rating (0-5) and review text
 *       - Returns the new review ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID being reviewed
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - review
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4
 *                 description: Rating (0-5 stars)
 *               review:
 *                 type: string
 *                 example: "Great product quality"
 *                 minLength: 1
 *     responses:
 *       201:
 *         description: Review created
 *         content:
 *           application/json:
 *             example:
 *               message: "Product reviewed succesfully"
 *               review: "611f1f77bcf86cd799439022"
 *       400:
 *         description: |
 *           Possible errors:
 *           - Missing/invalid rating or review
 *           - Rating outside 0-5 range
 */

reviewRouter.post(
    '/create/:id',
    generalMiddleware.sanitizeParams,
    reviewMiddleware.createReview,
    reviewController.createReview
  );

  /**
 * @swagger
 * /api/v1/reviews/all/{id}:
 *   get:
 *     summary: Get product reviews
 *     description: |
 *       - Filter by rating
 *       - Sort by rating (asc/desc)
 *       - Paginated results
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to fetch reviews for
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: rating
 *         description: Filter by star rating (0-5)
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *           example: 4
 *       - in: query
 *         name: sort
 *         description: Sort direction
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *       - in: query
 *         name: limit
 *         description: Items per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: page
 *         description: Page number
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: Paginated reviews
 *         content:
 *           application/json:
 *             example:
 *               message: "Success"
 *               data:
 *                 reviews:
 *                   - _id: "611f1f77bcf86cd799439022"
 *                     rating: 4
 *                     review: "Great quality"
 *                 total_reviews: 15
 *                 page: 1
 *                 total_pages: 2
 */

reviewRouter.get(
    '/all/:id',
    generalMiddleware.sanitizeParams,
    reviewMiddleware.fetchReviews,
    reviewController.fetchReviews
);

/**
 * @swagger
 * /api/v1/reviews/edit/{id}:
 *   patch:
 *     summary: Update a review
 *     description: |
 *       - Requires at least rating or review field
 *       - Validates rating range (0-5)
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID to update
 *         schema:
 *           type: string
 *           example: "611f1f77bcf86cd799439022"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: "Updated review text"
 *             required:
 *               - rating
 *     responses:
 *       200:
 *         description: Review updated
 *         content:
 *           application/json:
 *             example:
 *               message: "success"
 *       422:
 *         description: |
 *           Possible errors:
 *           - Invalid rating (not 0-5)
 *           - Missing both rating and review
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Review not found"
 *               status: 404
 */

reviewRouter.patch(
    '/edit/:id',
    generalMiddleware.sanitizeParams,
    reviewMiddleware.editReview,
    reviewController.editReview
  );

export default reviewRouter;
