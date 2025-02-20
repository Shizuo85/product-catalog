import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['shirts', 'skirts', 'socks', 'shorts', 'sweater'],
            requied: true
        },
        variant: {
            type: String,
            enum: ['s', 'l', 'xl', 'xxl', 'xxxl'],
            requied: true 
        },
        inventory: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    { timestamps: true }
);

productSchema.index({ name: 1, category: 1, variant: 1 });

export default mongoose.model('product', productSchema);
