import { Types } from 'mongoose';
import productRepo from '../repository/product.repo';

class ProductService {
    async createProduct(data: any) {
        const name: any = new RegExp('^' + data.name + '$', 'i');

        const product = await productRepo.findOne({
            name: { $in: [name] },
        });

        if (product) {
            const err: any = new Error('This product already exists');
            err.status = 400;
            throw err;
        }

        const new_prod = new Types.ObjectId();
        await productRepo.create({
            _id: new_prod,
            ...data,
        });

        return {
            message: 'Product created succesfully',
            product: new_prod,
        };
    }

    async fetchProducts(data: any) {
        const query: any = {};

        if (data.search) {
            query.name = { $regex: data.search, $options: 'i' };
        }

        if (data.category) {
            query.category = data.category;
        }

        if (data.variant) {
            query.variant = data.variant;
        }

        const result = await productRepo.fetchProducts(
            query,
            Math.abs(Number(data.limit) || 10),
            Math.abs(Number(data.page) || 1)
        );

        return {
            message: 'Success',
            data: {
                ...result,
            },
        };
    }

    async editProduct(data: any) {
        if (data.name) {
            let name = new RegExp('^' + data.name + '$', 'i');

            const check = await productRepo.findOne({
                name: { $in: [name] },
            });

            if (check) {
                const err: any = new Error('This product already exists');
                err.status = 400;
                throw err;
            }
        }

        const product: any = await productRepo.updateOne(
            {
                _id: { $eq: data.id },
            },
            data
        );

        if (!product) {
            const err: any = new Error('Product not found');
            err.status = 404;
            throw err;
        }

        return {
            message: 'success',
        };
    }
}

export default new ProductService();
