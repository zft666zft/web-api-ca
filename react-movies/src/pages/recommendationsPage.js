import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieRecommendations } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";

const RecommendationsPage = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = 500;

  const { data, error, isLoading, isError } = useQuery(
    ["recommendations", id, currentPage],
    () => getMovieRecommendations(id, currentPage),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = Math.min(data.total_pages, maxPages);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <PageTemplate
        title="Recommended Movies"
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

export default RecommendationsPage;
