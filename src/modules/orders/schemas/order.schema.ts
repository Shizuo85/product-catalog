import Joi from 'joi';

class OrderSchema {
    createOrder = Joi.object({
        quantity: Joi.number().integer().min(1).required(),
    });

    fetchOrders = Joi.object({
        status: Joi.string().valid(
            'processing',
            'shipped',
            'delivered',
            'canceled'
        ),
        sort: Joi.string().valid('asc', 'desc'),
        limit: Joi.number(),
        page: Joi.number(),
    });

    editOrder = Joi.object({
        status: Joi.string().valid(
            'processing',
            'shipped',
            'delivered',
            'canceled'
        ).required()
    });
}

export default new OrderSchema();
