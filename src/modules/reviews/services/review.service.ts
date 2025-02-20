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
    async fetchReviews(data: any) {}
    async editReview(data: any) {}
}
export default new ReviewService();
