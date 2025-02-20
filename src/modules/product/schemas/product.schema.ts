import Joi from 'joi';

class ProductSchema {
    createProduct = Joi.object({
        name: Joi.string().required(),
        category: Joi.string()
            .valid('shirts', 'skirts', 'socks', 'shorts', 'sweater')
            .required(),
        variant: Joi.string().valid('s', 'l', 'xl', 'xxl', 'xxxl').required(),
        inventory: Joi.number().min(0).required(),
    });

    fetchProducts = Joi.object({
        search: Joi.string(),
        category: Joi.string().valid(
            'shirts',
            'skirts',
            'socks',
            'shorts',
            'sweater'
        ),
        variant: Joi.string().valid('s', 'l', 'xl', 'xxl', 'xxxl'),
        limit: Joi.number(),
        page: Joi.number(),
    });
    editProduct = Joi.object({
        name: Joi.string(),
        category: Joi.string().valid(
            'shirts',
            'skirts',
            'socks',
            'shorts',
            'sweater'
        ),
        variant: Joi.string().valid('s', 'l', 'xl', 'xxl', 'xxxl'),
        inventory: Joi.number().min(0),
    }).or('name', 'category', 'variant', 'inventory');
}

export default new ProductSchema();
