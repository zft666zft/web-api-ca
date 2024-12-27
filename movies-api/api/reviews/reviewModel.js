import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// 定义 reviews 集合的 schema
const ReviewSchema = new Schema({
    movieId: {
        type: Number,
        ref: 'Movies',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
