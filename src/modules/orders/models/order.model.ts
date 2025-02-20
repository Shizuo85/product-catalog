import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            requied: true
        },
        status: {
            type: String,
            enum: ["shipped","delivered", "canceled"],
            requied: true 
        },
    },
    { timestamps: true }
);

orderSchema.index({ product: 1 });

export default mongoose.model('order', orderSchema);
