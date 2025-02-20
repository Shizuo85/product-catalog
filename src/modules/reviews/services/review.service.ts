import { Types } from 'mongoose';
import reviewRepo from '../repository/review.repo';

class ReviewService {
    async createReview(data: any) {
        const new_review = new Types.ObjectId();
        await reviewRepo.create({
            _id: new_review,
            ...data,
        });

        return {
            message: 'Product reviewed succesfully',
            review: new_review,
        };
    }
    async fetchReviews(data: any) {
        const query: any = {
            product: new Types.ObjectId(data.id),
        };

        if (data.rating) {
            query.rating = Math.abs(Number(data.rating) || 3);
        }

        const sort: any = {};

        if (data.sort === 'desc') {
            sort.rating = -1;
        } else {
            sort.rating = 1;
        }

        const result = await reviewRepo.fetchReviews(
            query,
            Math.abs(Number(data.limit) || 10),
            Math.abs(Number(data.page) || 1),
            sort
        );

        return {
            message: 'Success',
            data: {
                ...result,
            },
        };
    }

    async editReview(data: any) {
        const review: any = await reviewRepo.updateOne(
            {
                _id: { $eq: data.id },
            },
            data
        );

        if (!review) {
            const err: any = new Error('Review not found');
            err.status = 404;
            throw err;
        }

        return {
            message: 'success',
        };
    }
}
export default new ReviewService();
