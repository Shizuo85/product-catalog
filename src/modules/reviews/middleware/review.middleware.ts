import { Request, Response, NextFunction } from 'express';
import sanitizer from '../../../lib/sanitizer';

import reviewSchema from '../schemas/review.schema';

class ReviewMiddleware {
    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.body);
            await reviewSchema.createReview.validateAsync(req.body);
            return next();
        } catch (err: any) {
            err.status = 422;
            return next(err);
        }
    }

    async fetchReviews(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.query);
            await reviewSchema.fetchReviews.validateAsync(req.query);
            return next();
        } catch (err: any) {
            err.status = 422;
            return next(err);
        }
    }

    async editReview(req: Request, res: Response, next: NextFunction) {
        try {
            sanitizer(req.body);
            await reviewSchema.editReview.validateAsync(req.body);
            return next();
        } catch (err: any) {
            err.status = 422;
            return next(err);
        }
    }
}

export default new ReviewMiddleware();
