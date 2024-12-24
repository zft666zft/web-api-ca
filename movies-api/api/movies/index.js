import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getMovies,
    getMovie,
    getTrendingMovies,
    getMovieRecommendations,
    getSimilarMovies,
    getMovieCredits,
    getMovieCast,
    getActorMovies,
    getHotMovies,
    getTopRatedMovies,
    getActorDetails,
    getMovieVideos,
    getMovieImages,
    getMovieReviews
  } from '../tmdb-api';
  

const router = express.Router();

//Pagination
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


// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

//Get upcoming movies
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Fetch hot movies from TMDB
router.get('/tmdb/movies/hot', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const hotMovies = await getHotMovies(page);
    res.status(200).json(hotMovies);
}));

// Fetch top-rated movies from TMDB
router.get('/tmdb/movies/top-rated', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const topRatedMovies = await getTopRatedMovies(page);
    res.status(200).json(topRatedMovies);
}));

// Fetch trending movies from TMDB
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const trendingMovies = await getTrendingMovies(page);
    res.status(200).json(trendingMovies);
}));

//Get movie genres 
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const movieGenres = await getGenres(); // 调用 TMDB API 获取电影类型
    res.status(200).json(movieGenres); // 返回 JSON 数据
}));

// Pagination for movies from TMDB
router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const movies = await getMovies(page);
    res.status(200).json(movies);
}));

// Fetch specific movie details from TMDB
router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));

// Fetch movie images from TMDB
router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

// Fetch movie reviews from TMDB
router.get('/tmdb/movie/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));


// Fetch movie recommendations from TMDB
router.get('/tmdb/movie/:id/recommendations', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const recommendations = await getMovieRecommendations(id, page);
    res.status(200).json(recommendations);
}));

// Fetch similar movies from TMDB
router.get('/tmdb/movie/:id/similar', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const similarMovies = await getSimilarMovies(id, page);
    res.status(200).json(similarMovies);
}));

// Fetch movie videos from TMDB
router.get('/tmdb/movie/:id/videos', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const videos = await getMovieVideos(id);
    res.status(200).json(videos);
}));

// Fetch movie credits (cast and crew) from TMDB
router.get('/tmdb/movie/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getMovieCredits(id);
    res.status(200).json(credits);
}));

// Fetch movie cast from TMDB
router.get('/tmdb/movie/:id/cast', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cast = await getMovieCast(id);
    res.status(200).json(cast);
}));

// Fetch actor details from TMDB
router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actorDetails = await getActorDetails(id);
    res.status(200).json(actorDetails);
}));

// Fetch actor movies from TMDB
router.get('/tmdb/actor/:id/movies', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actorMovies = await getActorMovies(id);
    res.status(200).json(actorMovies);
}));



export default router;
