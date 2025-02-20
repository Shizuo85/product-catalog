import productModel from '../models/product.model';

class ProductRepo {
    async create(data: any) {
        return await productModel.create(data);
    }

    async findOne(filter: any) {
        return await productModel.findOne(filter);
    }

    async findOneSelect(filter: any, select: any = {}) {
        return await productModel.findOne(filter).select(select);
    }

    async updateOne(filter: any, data: any) {
        return await productModel.findOneAndUpdate(filter, data, {
            upsert: false,
        });
    }

    async updateOneAndReturn(filter: any, data: any, select: any = {}) {
        return await productModel
            .findOneAndUpdate(filter, data, { new: true, upsert: false })
            .select(select);
    }

    async findOneAndDelete(filter: any) {
        return await productModel.findOneAndDelete(filter);
    }

    async fetchProducts(filter: any, limit: number, page: number) {
        const [{ products, count }] = await productModel.aggregate([
            {
                $match: filter,
            },
            {
                $lookup: {
                    from: 'reviews',
                    let: { productId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$product', '$$productId'] },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                averageRating: { $avg: '$rating' },
                                reviews: { $sum: 1 }
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                averageRating: { $round: ['$averageRating', 2] },
                                reviews: 1
                            },
                        },
                    ],
                    as: 'reviews',
                },
            },
            {
                $addFields: {
                    rating: { $ifNull: [{ $arrayElemAt: ['$reviews.averageRating', 0] }, 0] },
                    reviews: { $ifNull: [{ $arrayElemAt: ['$reviews.reviews', 0] }, 0] }
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    let: { productId: '$_id' },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ['$product', '$$productId'] } },
                        },
                        {
                            $count: 'orderCount', 
                        },
                    ],
                    as: 'orders',
                },
            },
            {
                $addFields: {
                    orders: { $ifNull: [{ $arrayElemAt: ['$orders.orderCount', 0] }, 0] }
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    category: 1,
                    inventory: 1,
                    variant: 1,
                    rating: 1,
                    orders: 1,
                    reviews: 1
                },
            },
            {
                $sort: {
                    createdAt: 1,
                    inventory: 1,
                },
            },
            {
                $facet: {
                    products: [
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
                },
            },
        ]);

        const total_count = count[0]?.count ?? 0;
        const total_pages = Math.ceil(total_count / limit);

        return {
            products,
            total_count,
            page,
            total_pages,
        };
    }
}

export default new ProductRepo();
