import Joi from 'joi';

class ReviewSchema {
    createReview = Joi.object({
        rating: Joi.number().integer().min(0).max(5).required(),
        review: Joi.string().required(),
    });

    fetchReviews = Joi.object({
        rating: Joi.number().integer().min(0).max(5),
        sort: Joi.string().valid('asc', 'desc'),
        limit: Joi.number(),
        page: Joi.number(),
    });

    editReview = Joi.object({
        rating: Joi.number().integer().min(0).max(5).required(),
        review: Joi.string().required(),
    }).or('rating', 'review');
}

export default new ReviewSchema();
