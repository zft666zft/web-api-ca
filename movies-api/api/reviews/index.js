import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel.js';
import { getMovieReviews } from '../tmdb-api';

const router = express.Router();


//TMDB

// Fetch reviews for a specific movie from TMDB
router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const tmdbReviews = await getMovieReviews(id);

    if (tmdbReviews.results.length > 0) {
        res.status(200).json(tmdbReviews.results);
    } else {
        res.status(404).json({
            message: `No reviews found for movie with ID ${id} on TMDB.`,
            status_code: 404
        });
    }
}));



// //MongoDB

// // Get all reviews for a specific movie from MongoDB
// router.get('/movie/:movieId', asyncHandler(async (req, res) => {
//     const { movieId } = req.params;

//     const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });

//     if (reviews.length > 0) {
//         res.status(200).json(reviews);
//     } else {
//         res.status(404).json({
//             message: `No reviews found for movie with ID ${movieId}.`,
//             status_code: 404
//         });
//     }
// }));

// // Add a new review
// router.post('/movie/:movieId', asyncHandler(async (req, res) => {
//     const { movieId } = req.params;
//     const { author, content, rating } = req.body;

//     const newReview = await Review.create({
//         movieId,
//         author,
//         content,
//         rating
//     });

//     res.status(201).json(newReview);
// }));

export default router;
