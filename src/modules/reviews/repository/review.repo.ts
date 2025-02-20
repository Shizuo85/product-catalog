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
}

export default new ReviewRepo();
