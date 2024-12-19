# Assignment 1 - ReactJS app

**Name**: Futong Zhu  
**Student Number**: 20108799  

## Overview

This repository contains a ReactJS-based movie application that allows users to browse, filter, search, and manage their favorite movie lists and watchlists. The application leverages the TMDB API to fetch dynamic movie data, providing multiple views, detailed pages, and interactive features.

#### Features
1. **New Pages (Categorized by Endpoint Type)**:
   - **Static Endpoints**:
     - upcomingMoviesPage, trendingPage, HotMoviesPage, topRatedPage 
     - Each fetching data from TMDB's corresponding static endpoints to provide seamless user experiences.
   - **Parameterized Endpoints**: 
       - recommendationsPage,similarMoviesPage,movieCastPage,movieCreditsPage,movieVideoListPage
       - Each page dynamically fetches movie-specific data from TMDB's parameterized endpoints.
   - **Watchlist**:
     - Added a Watchlist page to save movies users plan to watch.
  
2. **Extensive Linking of Information**:
   - On the Cast or Crew pages, users can click on individual names to navigate to their detailed profiles.  
   - "View Movies" links enable quick access to the films that the person has participated in, enhancing the user experience.

3. **Interactive Favorites and Watchlist Icons**:
   - Clicking the icon once adds the movie to the respective page (favoriteMoviesPage or watchlistPage).
   - Clicking the icon again removes it from the page.

4. **Enhanced Filter Functionality**:
   - Added filtering options:
     - Rating and Release Year sliders.
     - A sorting dropdown for better movie exploration.

5. **Pagination Implementation**:
   - Added pagination to improve navigation:
     - The middle page number dynamically updates based on the total pages.
     - Users can input a specific page number to directly jump to that page.

6. **Efficient Caching**:
   - Integrated caching using `react-query` across all static and parameterized endpoints to minimize memory consumption and optimize app performance.


## Setup requirements

To run the app locally after cloning the repository, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/zft666zft/react-movie-labs.git
   cd react-movie-labs
   cd movies
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your TMDB API key in a `.env` file:
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Access the app at `http://localhost:3000`.

## API endpoints

Below are the TMDB endpoints used in the app in the order of  provided code:

+ **Discover movies**: `/discover/movie`  
  Fetches a list of movies with optional filters like language and sorting.

+ **Get movie details**: `/movie/:id`  
  Retrieves detailed information about a specific movie.

+ **Get genres**: `/genre/movie/list`  
  Provides a list of movie genres.

+ **Get movie images**: `/movie/:id/images`  
  Fetches images (posters, backdrops) for a specific movie.

+ **Get movie reviews**: `/movie/:id/reviews`  
  Retrieves reviews for a specific movie.

+ **Get upcoming movies**: `/movie/upcoming`  
  Fetches a list of upcoming movies.

+ **Get trending movies**: `/trending/movie/week`  
  Fetches a list of trending movies for the week.

+ **Get recommendations**: `/movie/:id/recommendations`  
  Provides recommended movies based on a specific movie.

+ **Get similar movies**: `/movie/:id/similar`  
  Retrieves movies similar to a specific movie.

+ **Get movie cast and crew**: `/movie/:id/credits`  
  Provides a list of cast and crew for a specific movie.

+ **Get actor movies**: `/person/:id/movie_credits`  
  Fetches a list of movies associated with a specific actor.

+ **Get hot movies**: `/movie/popular`  
  Retrieves a list of popular movies.

+ **Get top-rated movies**: `/movie/top_rated`  
  Fetches highly-rated movies.

+ **Get actor details**: `/person/:id`  
  Retrieves detailed information about a specific actor.

+ **Get movie videos**: `/movie/:id/videos`  
  Fetches trailers and other videos for a specific movie.



## Routing

Here is the list of supported routes and their associated pages:

+ `/` - Displays the home page with a list of movies.
+ `/movies/favorites` - Displays the user's favorite movies.
+ `/movies/watchlist` - Displays the user's watchlist.
+ `/movies/upcoming` - Displays a list of upcoming movies.
+ `/movies/trending` - Displays trending movies for the week.
+ `/movies/hot-movies` - Displays popular movies.
+ `/movies/top-rated` - Displays top-rated movies.
+ `/movies/:id` - Displays detailed information about a specific movie.
+ `/movies/:id/recommendations` - Displays movie recommendations.
+ `/movies/:id/similar` - Displays similar movies.
+ `/movies/:id/cast` - Displays the cast of the movie.
+ `/movies/:id/credits` - Displays detailed credits (cast and crew) for a specific movie.
+ `/movies/:id/videos` - Displays trailers and other videos for a specific movie.
+ `/reviews/form` - Allows users to write a review.
+ `/reviews/:id` - Allows users to view or edit an existing review.
+ `/actors/:id/movies` - Displays movies associated with a specific actor.
+ `/actors/:id/details` - Displays detailed information about a specific actor.


## Independent Learning (If Relevant)
1. Interactive functionality for Favorites and Watchlist icons:
   - Clicking the icon once adds the movie to the respective list; clicking again removes it.
2. Pagination implementation:
   - The page number in the middle dynamically updates with the total number of pages.
   - Users can directly input a page number to jump to the desired page. 

