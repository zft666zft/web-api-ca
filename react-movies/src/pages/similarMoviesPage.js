import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PageTemplate from '../components/templateMovieListPage';
import { getSimilarMovies } from '../api/tmdb-api';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import Pagination from "../components/pagination"; // 引入分页组件

const SimilarMoviesPage = () => {
  const { id } = useParams(); // 当前电影 ID
  const [currentPage, setCurrentPage] = useState(1); // 当前页码状态
  const maxPages = 500; // TMDB API 最大页数限制

  const { data, error, isLoading, isError } = useQuery(
    ['similarMovies', id, currentPage],
    () => getSimilarMovies(id, currentPage), // API 调用，传入页码
    {
      keepPreviousData: true, // 保留之前的数据
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = Math.min(data.total_pages, maxPages); // 防止总页数超出限制

  return (
    <>
      <PageTemplate
        title="Similar Movies"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchlistIcon movie={movie} />
          </>
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default SimilarMoviesPage;
