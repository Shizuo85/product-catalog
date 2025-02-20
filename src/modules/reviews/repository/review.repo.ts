import reviewModel from '../models/review.model';

class ReviewRepo {
    async create(data: any) {
        return await reviewModel.create(data);
    }

    async findOne(filter: any) {
        return await reviewModel.findOne(filter);
    }

    async findOneSelect(filter: any, select: any = {}) {
        return await reviewModel.findOne(filter).select(select);
    }

    async updateOne(filter: any, data: any) {
        return await reviewModel.findOneAndUpdate(filter, data, {
            upsert: false,
        });
    }

    async updateOneAndReturn(filter: any, data: any, select: any = {}) {
        return await reviewModel
            .findOneAndUpdate(filter, data, { new: true, upsert: false })
            .select(select);
    }

    async findOneAndDelete(filter: any) {
        return await reviewModel.findOneAndDelete(filter);
    }

    async fetchReviews(filter: any, limit: number, page: number, sort: any) {
        const [{ reviews, count, average_rating }] =
            await reviewModel.aggregate([
                {
                    $match: filter,
                },
                {
                    $project: {
                        _id: 1,
                        rating: 1,
                        review: 1,
                    },
                },
                {
                    $sort: sort,
                },
                {
                    $facet: {
                        reviews: [
                            {
                                $skip: (page - 1) * limit,
                            },
                            {
                                $limit: limit,
                            },
                        ],
                        count: [
                            {
                                $count: 'count',
                            },
                        ],
                        average_rating: [
                            {
                                $group: {
                                    _id: null,
                                    average_rating: { $avg: '$rating' },
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    average_rating: { $round: ['$average_rating', 2] },
                                },
                            },
                        ],
                    },
                },
            ]);

        const total_reviews = count[0]?.count ?? 0;
        const total_pages = Math.ceil(total_reviews / limit);

        return {
            reviews,
            total_reviews,
            page,
            total_pages,
            average_rating: average_rating[0]?.average_rating ?? 0,
        };
    }
}

export default new ReviewRepo();
