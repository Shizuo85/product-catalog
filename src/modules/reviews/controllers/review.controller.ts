import { Request, Response, NextFunction } from 'express';

import reviewService from '../services/review.service';

class ReviewController {
    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await reviewService.createReview({
                ...req.body,
                product: req.params.id,
            });
            return res.status(201).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async fetchReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await reviewService.fetchReviews({...req.query, ...req.params});
            return res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    async editReview(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await reviewService.editReview({
                ...req.params,
                ...req.body,
            });
            return res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }
}

export default new ReviewController();
