import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            requied: true
        },
        review: {
            type: String,
            requied: true 
        },
    },
    { timestamps: true }
);

reviewSchema.index({ product: 1});

export default mongoose.model('review', reviewSchema);
