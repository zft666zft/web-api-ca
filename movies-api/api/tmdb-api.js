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

// Fetch movie recommendations
export const getMovieRecommendations = async (movieId, page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&page=${page}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch movie recommendations.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch similar movies
export const getSimilarMovies = async (movieId, page = 1) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&page=${page}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch similar movies.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch movie cast
export const getMovieCast = async (movieId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch movie cast.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch movie credits (cast and crew)
export const getMovieCredits = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Failed to fetch movie credits.");
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

// Fetch movie videos
export const getMovieVideos = async (movieId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch movie videos.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};



//Actor


// Fetch actor details
export const getActorDetails = async (actorId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch actor details.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch actor movies
export const getActorMovies = async (actorId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch actor movies.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch actors by name
export const getActorsByName = async (name) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/search/person?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(name)}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch actors by name.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch actors by gender
export const getActorsByGender = async (gender) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/discover/person?api_key=${API_KEY}&language=en-US&with_gender=${gender}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch actors by gender.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch actors with popularity range
export const getActorsByPopularityRange = async (minPopularity, maxPopularity) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/discover/person?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&vote_average.gte=${minPopularity}&vote_average.lte=${maxPopularity}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch actors by popularity range.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch actors with popularity above a threshold
export const getActorsByPopularityThreshold = async (popularity) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/discover/person?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&vote_average.gte=${popularity}`
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || 'Failed to fetch actors by popularity threshold.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
