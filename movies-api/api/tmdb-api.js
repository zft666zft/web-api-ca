import fetch from 'node-fetch';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_KEY;


//Movie

// Fetch movies with pagination
export const getMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch movies.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch specific movie details
export const getMovie = async (id) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch movie details.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch genres
export const getGenres = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch genres.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch movie images
export const getMovieImages = async (id) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${id}/images?api_key=${API_KEY}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch movie images.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};



// Fetch upcoming movies
export const getUpcomingMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch upcoming movies.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch trending movies
export const getTrendingMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch trending movies.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


// Fetch hot movies
export const getHotMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch hot movies.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch top-rated movies
export const getTopRatedMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch top-rated movies.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};




//reviews

// Fetch movie reviews
export const getMovieReviews = async (id) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch movie reviews.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};