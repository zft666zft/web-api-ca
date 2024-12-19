import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";

const WatchlistPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  // 使用 useQueries 获取每个电影的详细信息
  const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = watchlistMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  // 过滤出成功获取的电影数据，避免可能的 undefined 值
  const movies = watchlistMovieQueries
    .map((q) => q.data)
    .filter((data) => data !== undefined)
    .map((data) => {
      data.genre_ids = data.genres.map(g => g.id);
      return data;
    });

  return (
    <PageTemplate
      title="Watchlist"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromWatchlistIcon movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default WatchlistPage;
