const BASE_URL = 'http://localhost:8080/api';

export const getMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/all?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch movies from backend');
    return response.json();
};

export const getMovie = async (id) => {
    const response = await fetch(`${BASE_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie details from backend');
    return response.json();
};


export const getGenres = async () => {
    const response = await fetch(`${BASE_URL}/genres`);
    if (!response.ok) throw new Error('Failed to fetch genres from backend');
    return response.json();
};


export const getMovieImages = async (id) => {
    const response = await fetch(`${BASE_URL}/movies/${id}/images`);
    if (!response.ok) throw new Error('Failed to fetch movie images from backend');
    return response.json();
};


export const getMovieReviews = async (id) => {
    const response = await fetch(`${BASE_URL}/reviews/tmdb/movie/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie reviews from backend');
    return response.json();
};

export const getUpcomingMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/upcoming?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch upcoming movies from backend');
    return response.json();
};

export const getTrendingMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movies/tmdb/trending?page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch trending movies from backend');
  return response.json();
};


export const getHotMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/popular?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch popular movies from backend');
    return response.json();
};

export const getTopRatedMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/top-rated?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch top-rated movies from backend');
    return response.json();
};

export const getMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movies/${movieId}/credits`);
  if (!response.ok) throw new Error('Failed to fetch movie credits from backend');
  return response.json();
};

export const getMovieCast = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movies/${movieId}/cast`);
    if (!response.ok) throw new Error('Failed to fetch movie cast from backend');
    return response.json();
};

export const getSimilarMovies = async (movieId, page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/${movieId}/similar?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch similar movies from backend');
    return response.json();
};

export const getMovieRecommendations = async (movieId, page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/${movieId}/recommendations?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch movie recommendations from backend');
    return response.json();
};

export const getActorDetails = async (actorId) => {
    const response = await fetch(`${BASE_URL}/actors/${actorId}`);
    if (!response.ok) throw new Error('Failed to fetch actor details from backend');
    return response.json();
};

export const getActorMovies = async (actorId) => {
    const response = await fetch(`${BASE_URL}/actors/${actorId}/movies`);
    if (!response.ok) throw new Error('Failed to fetch actor movies from backend');
    return response.json();
};

export const getMovieVideos = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movies/${movieId}/videos`);
    if (!response.ok) throw new Error('Failed to fetch movie videos from backend');
    return response.json();
};



// export const getMovies = (page = 1) => {
//   return fetch(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
//   )
//   .then((response) => {
//       if (!response.ok) {
//           return response.json().then((error) => {
//               throw new Error(error.status_message || "Something went wrong");
//           });
//       }
//       return response.json();
//   })
//   .catch((error) => {
//       throw error;
//   });
// };

  
//   export const getMovie = (args) => {
//     //console.log(args)
//     const [, idPart] = args.queryKey;
//     const { id } = idPart;
//     return fetch(
//       `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
//     ).then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error
//    });
//   };
  
//   export const getGenres = () => {
//     return fetch(
//       "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
//         process.env.REACT_APP_TMDB_KEY +
//         "&language=en-US"
//     ).then( (response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error
//    });
//   };
  
//   export const getMovieImages = ({ queryKey }) => {
//     const [, idPart] = queryKey;
//     const { id } = idPart;
//     return fetch(
//       `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
//     ).then( (response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error
//    });
//   };

//   export const getMovieReviews = ({ queryKey }) => {
//     const [, idPart] = queryKey;
//     const { id } = idPart;
//     return fetch(
//       `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
//     ).then( (response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error
//    });
//   };

//   export const getUpcomingMovies = (page=1) => {
//     return fetch(
//       `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((error) => {
//             throw new Error(error.status_message || "Something went wrong");
//           });
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };

//   export const getTrendingMovies = (page=1) => {
//     return fetch(
//       `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  
//     )
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((error) => {
//             throw new Error(error.status_message || "Something went wrong");
//           });
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };
  
//   export const getMovieRecommendations = (movieId,page=1) => {
//     return fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((error) => {
//             throw new Error(error.status_message || "Something went wrong");
//           });
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };
  
//   export const getSimilarMovies = (movieId,page=1) => {
//     return fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((error) => {
//             throw new Error(error.status_message || "Something went wrong");
//           });
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };

//   // 获取电影的演员列表
// export const getMovieCast = (movieId) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// export const getActorMovies = (actorId) => {
//   return fetch(
//     `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// export const getHotMovies = (page = 1) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// export const getTopRatedMovies = (page = 1) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error;
//     });
// };




// // 获取电影的演员和制作人员
// export const getMovieCredits = (movieId) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// export const getActorDetails = (actorId) => {
//   return fetch(
//     `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// export const getMovieVideos = (movieId) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((error) => {
//           throw new Error(error.status_message || "Something went wrong");
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       throw error;
//     });
// };
