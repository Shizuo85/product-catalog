import orderModel from '../models/order.model';

class OrderRepo {
    async create(data: any) {
        return await orderModel.create(data);
    }

    async findOne(filter: any) {
        return await orderModel.findOne(filter);
    }

    async findOneSelect(filter: any, select: any = {}) {
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
}

export default new OrderRepo();
