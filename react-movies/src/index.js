import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingPage from './pages/trendingPage';
import RecommendationsPage from './pages/recommendationsPage';
import SimilarMoviesPage from './pages/similarMoviesPage';
import MovieCastPage from './pages/movieCastPage';
import ActorMoviesPage from './pages/actorMoviesPage';
import HotMoviesPage from './pages/HotMoviesPage';
import TopRatedPage from "./pages/topRatedPage";
import MovieCreditsPage from './pages/movieCreditsPage';
import ActorDetailsPage from './pages/ActorDetailsPage';
import MovieVideoPage from "./pages/movieVideoPage";
import MovieVideoListPage from "./pages/movieVideoListPage";
import WatchlistPage from "./pages/watchlistPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingPage />} />
            <Route path="/movie/:id/recommendations" element={<RecommendationsPage />} />
            <Route path="/movie/:id/similar" element={<SimilarMoviesPage />} />
            <Route path="/movie/:id/cast" element={<MovieCastPage />} />
            <Route path="/actor/:id/movies" element={<ActorMoviesPage />} />
            <Route path="/movies/hot-movies" element={<HotMoviesPage />} />
            <Route path="/movies/top-rated" element={<TopRatedPage />} />
            <Route path="/movie/:id/credits" element={<MovieCreditsPage />} />
            <Route path="/actor/:id/details" element={<ActorDetailsPage />} />
            <Route path="/movie/:id/video/:videoKey" element={<MovieVideoPage />} />
            <Route path="/movie/:id/videos" element={<MovieVideoListPage />} />
            <Route path="/movies/watchlist" element={<WatchlistPage />} />

          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);