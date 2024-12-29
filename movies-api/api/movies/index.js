import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getGenres,
    getMovies,
    getMovie,
    getUpcomingMovies,
    getTrendingMovies,
    getHotMovies,
    getTopRatedMovies,
    getMovieImages,
    getMovieRecommendations, 
    getSimilarMovies,
    getMovieCast, 
    getMovieCredits, 
    getMovieVideos
  } from '../tmdb-api';
  

const router = express.Router();


//Get from TMDB

//Pagination for movies from TMDB
router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const movies = await getMovies(page);
    res.status(200).json(movies);
}));

//Get specific movie details from TMDB
router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));

//Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

//Get hot movies from TMDB
router.get('/tmdb/hot', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const hotMovies = await getHotMovies(page);
    res.status(200).json(hotMovies);
}));

//Get top-rated movies from TMDB
router.get('/tmdb/top-rated', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const topRatedMovies = await getTopRatedMovies(page);
    res.status(200).json(topRatedMovies);
}));

//Get trending movies from TMDB
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const trendingMovies = await getTrendingMovies(page);
    res.status(200).json(trendingMovies);
}));

//Get movie genres 
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const movieGenres = await getGenres(); 
    res.status(200).json(movieGenres); 
}));


//Get movie images from TMDB
router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

// Route to fetch movie recommendations
router.get('/tmdb/recommendations/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const { page = 1 } = req.query;
    try {
        const recommendations = await getMovieRecommendations(movieId, page);
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

// Route to fetch similar movies
router.get('/tmdb/similar/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const { page = 1 } = req.query;
    try {
        const similarMovies = await getSimilarMovies(movieId, page);
        res.status(200).json(similarMovies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

// Route to fetch movie cast
router.get('/tmdb/cast/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    try {
        const cast = await getMovieCast(movieId);
        res.status(200).json(cast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

// Route to fetch movie credits (cast and crew)
router.get('/tmdb/credits/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    try {
        const credits = await getMovieCredits(movieId);
        res.status(200).json(credits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));

// Route to fetch movie videos
router.get('/tmdb/videos/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    try {
        const videos = await getMovieVideos(movieId);
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}));


//Get from MongoDB

//Pagination for movies from MongoDB
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

//Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

//Get movies by language
router.get('/language/:lang', asyncHandler(async (req, res) => {
    const { lang } = req.params;
    const { limit = 10 } = req.query;
    const moviesByLanguage = await movieModel.find({ original_language: lang }).limit(+limit);
    res.status(200).json(moviesByLanguage);
}));

//Get movies by popularity
router.get('/popularity/:min/:max', asyncHandler(async (req, res) => {
    const { min, max } = req.params;
    const moviesByPopularity = await movieModel.find({
        popularity: { $gte: +min, $lte: +max }
    }).sort({ popularity: -1 });
    res.status(200).json(moviesByPopularity);
}));

//Get movies by year of release
router.get('/release-year/:year', asyncHandler(async (req, res) => {
    const { year } = req.params;

    // Match the year using the regular
    const moviesByYear = await movieModel.find({
        release_date: { $regex: `^${year}` } 
    });

    if (moviesByYear.length > 0) {
        res.status(200).json(moviesByYear);
    } else {
        res.status(404).json({ message: `No movies found for the year ${year}.`, status_code: 404 });
    }
}));

//Get movies by vote_average
router.get('/vote_average/:min/:max', asyncHandler(async (req, res) => {
    const { min, max } = req.params;

    const moviesByRating = await movieModel.find({
        vote_average: { $gte: +min, $lte: +max } 
    }).sort({ vote_average: -1 }); 

    if (moviesByRating.length > 0) {
        res.status(200).json(moviesByRating);
    } else {
        res.status(404).json({ message: `No movies found with rating between ${min} and ${max}.`, status_code: 404 });
    }
}));

//Get movies with vote_average greater than a certain value
router.get('/highly_rated/:threshold', asyncHandler(async (req, res) => {
    const { threshold } = req.params;

    const ratingThreshold = +threshold;
    if (isNaN(ratingThreshold)) {
        return res.status(400).json({ message: "Threshold must be a valid number." });
    }

    const highlyRatedMovies = await movieModel.find({
        vote_average: { $gt: ratingThreshold }
    }).sort({ vote_average: -1 }); 

    if (highlyRatedMovies.length > 0) {
        res.status(200).json(highlyRatedMovies);
    } else {
        res.status(404).json({ 
            message: `No movies found with a rating above ${ratingThreshold}.`, 
            status_code: 404 
        });
    }
}));

//Get movies by vote_count
router.get('/vote_count/:min/:max', asyncHandler(async (req, res) => {
    const { min, max } = req.params;

    const moviesByReviews = await movieModel.find({
        vote_count: { $gte: +min, $lte: +max } 
    }).sort({ vote_count: -1 }); 

    if (moviesByReviews.length > 0) {
        res.status(200).json(moviesByReviews);
    } else {
        res.status(404).json({ message: `No movies found with review count between ${min} and ${max}.`, status_code: 404 });
    }
}));

//Get movies with popularity greater than a certain value
router.get('/popular/:threshold', asyncHandler(async (req, res) => {
    const { threshold } = req.params;

    const popularityThreshold = +threshold;
    if (isNaN(popularityThreshold)) {
        return res.status(400).json({ message: "Threshold must be a valid number." });
    }

    try {
        const popularMovies = await movieModel.find({
            popularity: { $gt: popularityThreshold }
        }).sort({ popularity: -1 }); 

        if (popularMovies.length > 0) {
            res.status(200).json(popularMovies);
        } else {
            res.status(404).json({ message: `No movies found with popularity above ${popularityThreshold}.` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching popular movies.", error: error.message });
    }
}));

//Get films of a certain genre 
router.get('/genre/:genreId', asyncHandler(async (req, res) => {
    const { genreId } = req.params;
    const { limit = 10 } = req.query;
    const moviesByGenre = await movieModel.find({ genre_ids: genreId }).limit(+limit);
    res.status(200).json(moviesByGenre);
}));

//Get similar content for films
router.get('/:id/similar', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        const similarMovies = await movieModel.find({ genre_ids: { $in: movie.genre_ids } }).limit(10);
        res.status(200).json(similarMovies);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

export default router;
