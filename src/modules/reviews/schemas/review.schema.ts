import Joi from 'joi';

class ReviewSchema {
    createReview = Joi.object({
        rating: Joi.number().min(0).max(5).required(),
        review: Joi.string().required(),
    });
    fetchReviews = Joi.object({});
    editReview = Joi.object({});
}

export default new ReviewSchema();
