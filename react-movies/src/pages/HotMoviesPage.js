import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getHotMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import Pagination from "../components/pagination";

const HotMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const maxPages = 500; 

  const { data, error, isLoading, isError } = useQuery(
    ["hotMovies", currentPage],
    () => getHotMovies(currentPage),
    {
      keepPreviousData: true, // 在加载新数据时保持旧数据
    }
  );

 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = Math.min(data.total_pages, maxPages); // 防止 total_pages 超出 API 限制

  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <PageTemplate
        title="Hot Movies"
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
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default HotMoviesPage;
