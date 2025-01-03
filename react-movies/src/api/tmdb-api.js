import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Fetch movies with pagination
export const getMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/movies?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch movies from backend');
    return response.json();
};

// Fetch specific movie details
export const getMovie = async (id) => {
  if (typeof id !== "string" && typeof id !== "number") {
      throw new Error(`Invalid ID type: ${typeof id}. Expected string or number.`);
  }

  const url = `${BASE_URL}/movies/tmdb/movie/${id}`;
  console.log(`Fetching movie details from: ${url}`);
  try {
      const response = await fetch(url);
      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch movie details from backend");
      }
      return await response.json();
  } catch (error) {
      console.error("Error fetching movie details:", error.message);
      throw error; 
  }
};



// Fetch genres
export const getGenres = async () => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/genres`);
    if (!response.ok) throw new Error('Failed to fetch genres from backend');
    return response.json();
};


// export const getMovieImages = async (id) => {
//     const response = await fetch(`${BASE_URL}/movies/tmdb/movie/${id}/images`);
//     if (!response.ok) throw new Error('Failed to fetch movie images from backend');
//     return response.json();
// };

// Fetch movie images
export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `${BASE_URL}/movies/tmdb/movie/${id}/images`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

// Fetch upcoming movies
export const getUpcomingMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/upcoming?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch upcoming movies from backend');
    return response.json();
};

// Fetch trending movies
export const getTrendingMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/trending?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch trending movies from backend');
    return response.json();
};

// Fetch hot movies
export const getHotMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/hot?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch hot movies from backend');
    return response.json();
};

// Fetch top-rated movies
export const getTopRatedMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movies/tmdb/top-rated?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch top-rated movies from backend');
    return response.json();
};

// Fetch movie recommendations from backend
export const getMovieRecommendations = async (movieId, page = 1) => {
  const response = await fetch(`${BASE_URL}/movies/tmdb/recommendations/${movieId}?page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch movie recommendations from backend');
  return response.json();
};

// Fetch similar movies from backend
export const getSimilarMovies = async (movieId, page = 1) => {
  const response = await fetch(`${BASE_URL}/movies/tmdb/similar/${movieId}?page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch similar movies from backend');
  return response.json();
};

// export const getMovieRecommendations = (movieId,page=1) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
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

// export const getSimilarMovies = (movieId,page=1) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
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



// Fetch movie reviews
// export const getMovieReviews = (movieId) => {
//   console.log('Fetching reviews for movie ID:', movieId);  // 确认传入的 ID
//   return axios.get(`${BASE_URL}/reviews/tmdb/movie/${movieId}`)
//       .then(response => {
//           console.log('API Response:', response.data);  // 查看 API 响应数据
//           return response.data;
//       })
//       .catch(error => {
//         const errorMsg = error.response ? error.response.data.message : error.message || "Something went wrong";
//         console.error('Error fetching movie reviews:', errorMsg);
//         throw new Error(errorMsg);
//     });
    
// };






  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
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

  
  // export const getMovie = (args) => {
  //   //console.log(args)
  //   const [, idPart] = args.queryKey;
  //   const { id } = idPart;
  //   return fetch(
  //     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  //   ).then((response) => {
  //     if (!response.ok) {
  //       return response.json().then((error) => {
  //         throw new Error(error.status_message || "Something went wrong");
  //       });
  //     }
  //     return response.json();
  //   })
  //   .catch((error) => {
  //     throw error
  //  });
  // };
  
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

//   export const getHotMovies = (page = 1) => {
//     return fetch(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
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
  
//   export const getTopRatedMovies = (page = 1) => {
//     return fetch(
//       `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
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


// Fetch movie cast from backend
export const getMovieCast = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movies/tmdb/cast/${movieId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie cast from backend');
  }
  return response.json();
};

// Fetch movie credits (cast and crew) from backend
export const getMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movies/tmdb/credits/${movieId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie credits from backend');
  }
  return response.json();
};

// Fetch movie videos from backend
export const getMovieVideos = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movies/tmdb/videos/${movieId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie videos from backend');
  }
  return response.json();
};





export const getActorMovies = (actorId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getActorDetails = (actorId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};



//user

//login
export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

//signup
export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};