import { Types } from 'mongoose';
import orderRepo from '../repository/order.repo';
import productRepo from '../../product/repository/product.repo';

class OrderService {
    async createOrder(data: any) {
        const product: any = await productRepo.findOne(
            {
                _id: { $eq: data.id },
            },
            {
                inventory: 1,
            }
        );

        if (!product) {
            const err: any = new Error('Product not found');
            err.status = 404;
            throw err;
        }

        if (data.quantity > product.inventory) {
            const err: any = new Error('Insufficient inventory');
            err.status = 400;
            throw err;
        }

        const orderId = new Types.ObjectId();

        await Promise.all([
            orderRepo.create({
                product: data.id,
                _id: orderId,
                quantity: data.quantity,
            }),
            productRepo.updateOne(
                {
                    _id: { $eq: data.id },
                },
                {
                    inventory: product.inventory - data.quantity,
                }
            ),
        ]);

        return {
            message: 'success',
            order: orderId
        };
    }
    
    async fetchOrders(data: any) {
        const query: any = {
            product: new Types.ObjectId(data.id),
        };

        if (data.status) {
            query.status = data.status
        }

        const sort: any = {};

        if (data.sort === 'desc') {
            sort.createdAt = -1;
        } else {
            sort.createdAt = 1;
        }

        const result = await orderRepo.fetchOrders(
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

    async editOrder(data: any) {
        const review: any = await orderRepo.updateOne(
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

export default new OrderService();
