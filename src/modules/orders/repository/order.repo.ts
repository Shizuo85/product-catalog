import orderModel from '../models/order.model';

class OrderRepo {
    async create(data: any) {
        return await orderModel.create(data);
    }

    async findOne(filter: any, select: any = {}) {
        return await orderModel.findOne(filter).select(select);
    }

    async updateOne(filter: any, data: any) {
        return await orderModel.findOneAndUpdate(filter, data, {
            upsert: false,
        });
    }

    async updateOneAndReturn(filter: any, data: any, select: any = {}) {
        return await orderModel
            .findOneAndUpdate(filter, data, { new: true, upsert: false })
            .select(select);
    }

    async findOneAndDelete(filter: any) {
        return await orderModel.findOneAndDelete(filter);
    }

    async fetchOrders(filter: any, limit: number, page: number, sort: any) {
        const [{ orders, count }] = await orderModel.aggregate([
            {
                $match: filter,
            },
            {
                $project: {
                    _id: 1,
                    quantity: 1,
                    order_date: "$createdAt",
                    status: 1
                },
            },
            {
                $sort: sort,
            },
            {
                $facet: {
                    orders: [
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

        const total_orders = count[0]?.count ?? 0;
        const total_pages = Math.ceil(total_orders / limit);

        return {
            orders,
            total_orders,
            page,
            total_pages,
        };
    }
}

export default new OrderRepo();
