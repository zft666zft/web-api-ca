import React, { useState, useContext, useEffect } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";


function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState([0, 10]); // 评分区间
  const [releaseDateFilter, setReleaseDateFilter] = useState([2000, new Date().getFullYear()]); // 发布年份区间
  const [sortOption, setSortOption] = useState(""); // 添加排序选项


  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter[0] && m.vote_average <= ratingFilter[1];
    })
    .filter((m) => {
      const releaseYear = new Date(m.release_date).getFullYear();
      return releaseYear >= releaseDateFilter[0] && releaseYear <= releaseDateFilter[1];
    });

  // 根据排序选项对过滤后的电影列表进行排序
  displayedMovies = displayedMovies.sort((a, b) => {
    if (sortOption === "rating") return b.vote_average - a.vote_average;
    if (sortOption === "name") return a.title.localeCompare(b.title);
    if (sortOption === "releaseDate") return new Date(b.release_date) - new Date(a.release_date);
    return 0;
  });

  
  const handleChange = (type, value) => {
    switch (type) {
      case "name":
        setNameFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
        break;
      case "rating":
        setRatingFilter(value);
        break;
      case "releaseDate":
        setReleaseDateFilter(value);
        break;
      case "sort":
        setSortOption(value);
        break;
      default:
        break;
    }
  };

  

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            releaseDateFilter={releaseDateFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      
    </Grid>
  );
}

export default MovieListPageTemplate;
