import { Router } from 'express';

import reviewController from '../modules/reviews/controllers/review.controller';
import reviewMiddleware from '../modules/reviews/middleware/review.middleware';

import generalMiddleware from '../modules/general/middleware/general.middleware';

const reviewRouter = Router();

reviewRouter.post(
    '/create/:id',
    generalMiddleware.sanitizeParams,
    reviewMiddleware.createReview,
    reviewController.createReview
);

reviewRouter.get(
    '/all/:id',
    generalMiddleware.sanitizeParams,
    reviewMiddleware.fetchReviews,
    reviewController.fetchReviews
);

reviewRouter.patch(
    '/edit/:id',
    generalMiddleware.sanitizeParams,
    reviewMiddleware.editReview,
    reviewController.editReview
);

export default reviewRouter;
