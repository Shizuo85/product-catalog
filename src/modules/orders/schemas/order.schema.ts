import Joi from 'joi';

class OrderSchema {
    createOrder = Joi.object({});
    fetchOrders = Joi.object({});
    editOrder = Joi.object({});
}

export default new OrderSchema();
