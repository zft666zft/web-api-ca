import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination"; // 引入分页组件
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页状态
  const maxPages = 500; 

  const { data, error, isLoading, isError } = useQuery(
    ["discover", currentPage], // 使用当前页作为查询的一部分
    () => getMovies(currentPage), // 获取当前页的电影数据
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
  const totalPages = Math.min(data.total_pages, maxPages);

  // 处理页面更改
  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
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

export default HomePage;
